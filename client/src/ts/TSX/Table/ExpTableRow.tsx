import { observer } from "mobx-react";
import { TableInitStore } from "../../stores/TableInitStore";
import { TableStore } from "../../stores/TableStore";

function ExpTableRow({rowIndex}: {rowIndex: number}) {
  const cells: JSX.Element[] = [];
  for (let j = 0; j < TableInitStore.experiments; j++) {
    cells.push(
      <td key={`${rowIndex} ${j}`} className="exp-table__td td">
        <input 
          type="number" 
          step={0.00001}
          className="exp-table__input table-input"
          placeholder="0"
          value={TableStore.expData[rowIndex]![j]!.value}
          onChange={(e) => TableStore.handleExpDataCell(rowIndex, j, e)} />
      </td>
    )
  }

  return (
    <tr className="exp-table__tr tr">
      {cells}
    </tr>
  )
}

export default observer(ExpTableRow);