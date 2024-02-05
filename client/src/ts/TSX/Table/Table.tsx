import InputsTable from "./ExpTable";
import TetaTable from "./TetaTable";
import VarTable from "./VarTable";

function Table() {

  return (
    <div className="table-container">
      <VarTable />
      <InputsTable />
      <TetaTable />
    </div>
  )
}

export default Table;