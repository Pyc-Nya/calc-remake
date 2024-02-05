import { makeAutoObservable, reaction } from "mobx";
import React from "react";
import { TableStore } from "./TableStore";
import { parse, MathNode, SymbolNode, evaluate, derivative } from 'mathjs';

interface IUserInput {
  input: string,
  isValid: boolean,
}

interface IUserFunctionClass {
  userInput: IUserInput,
  derivatives: string[],
  isValid: boolean,
  handleUserInput(e: React.ChangeEvent<HTMLInputElement>): void,
  checkUserInput(expression: string): boolean,
  evaluateUserInput(variableValues: { [key: string]: number }): number | null,
}

class UserFunctionClass implements IUserFunctionClass {
  userInput: IUserInput = {
    input: '',
    isValid: false,
  };

  constructor() {
    makeAutoObservable(this);

    // если юзер поменяет сами переменные или изменит их количество - должен быть апдейт валидности формулы
    reaction(
      () => [TableStore.varData.length, TableStore.varData],
      () => {
        this.userInput.isValid = this.checkUserInput(this.userInput.input);
        console.log('updated isValid in reaction:', this.userInput.isValid);
      }
    );
  }

  get derivatives(): string[] {
    if (!this.userInput.isValid) {
      return [];
    }

    try {
      return Array.from(TableStore.varData).map(variable => 
        derivative(this.userInput.input, variable.value).toString()
      );
    } catch (error) {
      console.log("Ошибка при вычислении производных");
      return [];
    }
  }

  get isValid(): boolean {
    return this.derivatives.length > 0 && this.userInput.isValid;
  }

  handleUserInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    this.userInput.input = value;
    this.userInput.isValid = this.checkUserInput(value);
  }

  checkUserInput = (expression: string): boolean => {
    let isValid = true;

    // разбивает выражение на древо и по каждому элементу идет проверка - я смотрю, если он является символом, а не
    // арифметической операцией или взятием функции, то я проверяю, есть ли такой символ в моих переменных
    try { 
        parse(expression).traverse(function (node: MathNode) {
          if (node.type === "SymbolNode" && !TableStore.varData.some(item => item.value === (node as SymbolNode).name)) {
            isValid = false;
          }
        });
    } catch (error) {
        isValid = false;
    }
    
    console.log('updated isValid:', isValid);

    return isValid && this.userInput.input !== '';
  }

  evaluateUserInput = (variableValues: { [key: string]: number }): number | null => {
    if (this.userInput.isValid) {
      try {
        return evaluate(this.userInput.input, variableValues);
    } catch (error) {
        console.error("Ошибка при вычислении выражения: ", error);
        return null;
    }
    } else {
      return null
    }
  }
}

const UserFunctionStore = new UserFunctionClass();

export {
  UserFunctionStore,
}