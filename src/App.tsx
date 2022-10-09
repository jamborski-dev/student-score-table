import "./style/global.scss"

import { Form } from "./components/Form/Form"
import { Filter } from "./components/Filter/Filter"
import { Table } from "./components/Table/Table"

function App() {
  return (
    <main>
      <Form />
      <Filter />
      <Table />
    </main>
  )
}

export default App
