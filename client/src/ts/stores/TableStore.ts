import { makeAutoObservable, reaction, toJS } from "mobx";
import { TableInitStore } from "./TableInitStore";
import React from "react";
import { UserFunctionStore } from "./UserFunctionStore";

interface IExpDataCell {
  isValid: boolean,
  value: string | number,
}

interface IVarDataCell {
  isValid: boolean,
  value: string,
}

interface ITableClass {
  expData: IExpDataCell[][],
  varData: IVarDataCell[],
  tetaData: IExpDataCell[],
  isValid: boolean,
  handleExpDataCell(rowIndex: number, colIndex: number, e: React.ChangeEvent<HTMLInputElement>): void,
  handleVarDataCell(index: number, e: React.ChangeEvent<HTMLInputElement>): void,
  handleTetaDataCell(index: number, e: React.ChangeEvent<HTMLInputElement>): void,
}

class TableClass implements ITableClass {
  // так как мне не нужен массив из ссылок на один и тот же массив - приходится вот так
  expData: IExpDataCell[][] = Array.from({ length: TableInitStore.variables }, () =>
    Array.from({ length: TableInitStore.experiments }, () => ({ isValid: false, value: '' }))
  );
  varData: IVarDataCell[] = Array.from({ length: TableInitStore.variables }, () => ({ isValid: false, value: '' }));
  tetaData: IExpDataCell[] = Array.from({ length: TableInitStore.variables }, () => ({ isValid: false, value: '' }));

  constructor() {
    makeAutoObservable(this);

    // когда юзер меняет количество столбцов / строк - я хочу, чтобы данные, введенные ранее, сохранялись
    reaction (
      () => [TableInitStore.variables, TableInitStore.experiments],
      () => {
        let newData: IExpDataCell[][] = Array.from({ length: TableInitStore.variables }, () =>
          Array.from({ length: TableInitStore.experiments }, () => ({ isValid: false, value: '' }))
        );

        for (let i = 0; i < Math.min(this.expData.length, TableInitStore.variables); i++) {
          for (let j = 0; j < Math.min(this.expData[i]!.length, TableInitStore.experiments); j++) {
            newData[i]![j]! = this.expData[i]![j]!;
          }
        }

        this.expData = newData;

        if (TableInitStore.variables < this.varData.length) {
          this.varData.splice(TableInitStore.variables);
          this.tetaData.splice(TableInitStore.variables);
        } else {
          const newItems: IVarDataCell[] = Array.from({ length: TableInitStore.variables - this.varData.length }, () => ({ isValid: false, value: '' }));
          this.varData.push(...newItems);
          // из-за союзного типа не выйдет также просто запушить элементы, поэтому приходится переписывать массив
          const newTetaData: IExpDataCell[] = Array(TableInitStore.variables).fill('');
          for (let i = 0; i < this.tetaData.length; i++) {
            newTetaData[i] = this.tetaData[i] as IExpDataCell;
          }
          this.tetaData = newTetaData;
        }
        console.log('varData:', toJS(this.varData));
      }
    );
  }

  get isValid(): boolean {
    const isVarValid: boolean = is1dArrayValid(this.varData);
    const isTetaValid: boolean = is1dArrayValid(this.tetaData);
    const isExpValid: boolean = is2dArrayValid(this.expData);
    const result = isVarValid && isTetaValid && isExpValid;
    
    result ? console.log('Table is valid now') : console.log('Table is still invalid');

    return result;
  }

  handleExpDataCell = (rowIndex: number, colIndex: number, e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    if (value === '' || value === '-') {
      this.expData[rowIndex]![colIndex]!.value = value;
      this.expData[rowIndex]![colIndex]!.isValid = false;
    } else {
      this.expData[rowIndex]![colIndex]!.value = +value;
      this.expData[rowIndex]![colIndex]!.isValid = true;
    }
  }

  handleTetaDataCell = (index: number, e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    if (value === '') {
      this.tetaData[index]!.value = value;
      this.tetaData[index]!.isValid = false;
    } else {
      this.tetaData[index]!.value = +value;
      this.tetaData[index]!.isValid = +value > 0;
    }
  }

  handleVarDataCell = (index: number, e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (isValidVariableName(value)) {
      this.varData[index]!.value = value;
      this.varData[index]!.isValid = value !== '';
      UserFunctionStore.userInput.isValid = UserFunctionStore.checkUserInput(UserFunctionStore.userInput.input);
    }
  }
}

function isValidVariableName(name: string) {
  const regex = /^[a-zA-Z][a-zA-Z0-9]*$/;
  return regex.test(name) || name === '';
}

const TableStore = new TableClass();

export {
  TableStore
}

const is1dArrayValid = (arr: any[]): boolean => {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].isValid) {
      return false;
    }
  }

  return true;
}

const is2dArrayValid = (arr: any[][]): boolean => {
  
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0]!.length; j++) {
      if (!arr[i]![j]!.isValid) {
        return false;
      }
    }
  }

  return true;
}
