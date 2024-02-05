import TableInit from "./TableInit";
import Table from "./Table/Table";
import UserFunction from "./UserFunction";

function Pages() {

  return (
    <div className="container">
      <div className="calc">
        <TableInit />
        <Table />
        <UserFunction />
      </div>
    </div>
  )
}

export default Pages;