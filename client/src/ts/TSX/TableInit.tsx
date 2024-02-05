import { observer } from "mobx-react";
import { TableInitStore } from "../stores/TableInitStore";

function TableInit() {
  
  return (
    <div className="calc__inputs">
      <div className="calc__input-description">
        Количество переменных:
      </div>
      <input 
        type="number" 
        className="calc__input" 
        value={TableInitStore.variables}
        onChange={TableInitStore.handleVarInput} />
      <div className="calc__input-description">
        Количество экспериментов:
      </div>
      <input 
        type="number" 
        className="calc__input" 
        value={TableInitStore.experiments}
        onChange={TableInitStore.handleExpInput} />
    </div>
  )
}

export default observer(TableInit)