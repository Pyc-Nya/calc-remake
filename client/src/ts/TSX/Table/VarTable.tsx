import { observer } from "mobx-react"
import { TableInitStore } from "../../stores/TableInitStore"
import { TableStore } from "../../stores/TableStore";

function VarTable() {
  const rows = [];
  for (let i = 0; i < TableInitStore.variables; i++) {
    rows.push(
      <tr key={i} className="var-table__tr tr">
        <td className="var-table__td td">
          <input 
            type="text" 
            className="table-input var-table__input"
            placeholder="var"
            value={TableStore.varData[i]!.value}
            onChange={(e) => TableStore.handleVarDataCell(i, e)} />
        </td>
      </tr>
    )
  }

  return (
    <table className="var-table table">
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

export default observer(VarTable)