import { observer } from "mobx-react"
import { TableInitStore } from "../../stores/TableInitStore"
import { TableStore } from "../../stores/TableStore";

function TetaTable() {
  const rows = [];
  for (let i = 0; i < TableInitStore.variables; i++) {
    rows.push(
      <tr key={i} className="teta-table__tr tr">
        <td className="teta-table__td td">
          <input 
            type="number" 
            step={0.00001}
            className="table-input teta-table__input"
            placeholder="teta"
            value={TableStore.tetaData[i]!.value}
            onChange={(e) => TableStore.handleTetaDataCell(i, e)} />
        </td>
      </tr>
    )
  }

  return (
    <table className="teta-table table">
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

export default observer(TetaTable)