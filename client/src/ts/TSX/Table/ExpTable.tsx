import { observer } from "mobx-react";
import { TableInitStore } from "../../stores/TableInitStore";
import ExpTableRow from "./ExpTableRow";

function ExpTable() {
  const rows: JSX.Element[] = [];
  for (let i = 0; i < TableInitStore.variables; i++) {
    rows.push(
      <ExpTableRow key={i} rowIndex={i} />
    )
  }

  return (
    <table className="inputs-table table">
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

export default observer(ExpTable);