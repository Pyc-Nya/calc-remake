import { makeAutoObservable } from "mobx";
import React from "react";

interface ITableInitClass {
  variables: number,
  experiments: number,
  handleVarInput(e: React.ChangeEvent<HTMLInputElement>): void,
  handleExpInput(e: React.ChangeEvent<HTMLInputElement>): void,
}

class TableInitClass implements ITableInitClass {
  variables: number = 3;
  experiments: number = 3;

  constructor() {
    makeAutoObservable(this);
  }

  handleVarInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.variables = Math.max(parseInt(e.target.value, 10), 1);
  }
  
  handleExpInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.experiments = Math.max(parseInt(e.target.value, 10), 2);
  }
}

const TableInitStore = new TableInitClass();

export {
  TableInitStore
}
