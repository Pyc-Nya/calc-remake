import { UserFunctionStore } from "../stores/UserFunctionStore";
import { observer } from "mobx-react";
import { InlineMath } from 'react-katex';
import { TableStore } from "../stores/TableStore";

function UserFunction() {
  console.log('UserFunctionStore.userInput.isValid', UserFunctionStore.userInput.isValid)

  return (
    <div className="user-function">
      <input 
        type="text" 
        className="user-function__input"
        placeholder="f(x)"
        value={UserFunctionStore.userInput.input}
        onChange={UserFunctionStore.handleUserInput} />
      <div className="formula">
        <InlineMath>
          {UserFunctionStore.userInput.isValid ? UserFunctionStore.userInput.input : `invalid formula`}
        </InlineMath> {/* alt 255 */}
      </div>
      <div className="derivatives">
        {UserFunctionStore.derivatives.map((e: string, i: number) => <div key={i} style={{fontSize: '14px'}}><InlineMath>{e}</InlineMath></div>)}
      </div>
      <div className="">
        table valid: {TableStore.isValid ? 'true' : 'false'}
      </div>
    </div>
  )
}

export default observer(UserFunction)