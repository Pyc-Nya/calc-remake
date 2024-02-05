// import { TableStore } from "./TableStore"
// import { TableInitStore } from "./TableInitStore"
// import { UserFunctionStore } from "./UserFunctionStore";

// const student = {
//   2: 12.7,
//   3: 4.3,
//   4: 3.2,
//   5: 2.8, 
//   6: 2.6,
//   7: 2.5,
//   8: 2.4,
//   9: 2.3,
//   10: 2.3,
//   100: 2.0,
// }

// interface ISeializedExpData {
//   [key: string]: number,
// }

// interface ICalculateClass {
//   serialize(): ISeializedExpData[],
//   results: number[] | null,
//   averageResult: number | null,
//   Sx: number | null,
//   deltaX: number | null,
//   sumsOfAbsOfDiffs: number | null,
//   sumOfDiffsSums: number | null,
//   deltaAverageX: number | null,
// }

// class CalculateClass implements ICalculateClass {

//   constructor () {}

//   serialize(): ISeializedExpData[] {
//     const result: ISeializedExpData[] = [];

//     for (let j = 0; j < TableInitStore.experiments; j++) {
//       const obj: ISeializedExpData = {};
//       for (let i = 0; i < TableInitStore.variables; i++) {
//         const value = TableStore.expData[i]![j]!.value as number;
//         obj[TableStore.varData[i]!.value] = value;
//       }
//       result.push(obj);
//     }

//     return result;
//   }
  
//   get results(): number[] | null {
//     const serialized: ISeializedExpData[] = this.serialize();
//     const result: number[] = [];

//     for (let j = 0; j < TableInitStore.experiments; j++) {
//       const value: number | null = UserFunctionStore.evaluateUserInput(serialized[j]!);
//       if (value) {
//         result.push(value);
//       }
//     }

//     return result.length > 0 ? result : null;
//   }

//   get averageResult(): number | null {
//     if (this.results) {
//       return this.results.reduce((a, v) => a + v, 0) / TableInitStore.variables;
//     } else {
//       return null
//     }
//   }

//   get Sx(): number | null {
//     if (this.averageResult) {
//       let sigma: number = 0;
//       const average: number = this.averageResult;
//       const results = this.results as number[];
      
//       for (let j = 0; j < TableInitStore.experiments; j++) {
//         sigma += (results[j]! - average)**2;
//       }

//       return (
//         (sigma / (TableInitStore.experiments * (TableInitStore.experiments - 1)))**0.5
//       );
//     } else {
//       return null
//     }
//   }

//   get sumsOfAbsOfDiffs(): number | null {

//   }
// }



// export {

// }