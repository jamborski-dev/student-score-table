import { MouseEventHandler } from "react"
import { useStore } from "../../hooks/useStore"

export const Table = () => {
  const {
    state: { data }
  } = useStore()

  if (!data.length) return <div className="notice -error">There is no data to be displayed.</div>

  const COLUMNS = ["Student Name", "Score", "Class", ""]

  const handleRemove = (_id: Number) => {}

  const renderLabels = () => COLUMNS.map((label, i) => <td key={i}>{label}</td>)

  const renderRows = () =>
    data.map((row, i) => {
      return (
        <tr key={i}>
          <td>{row.name}</td>
          <td>{`${row.score}`}</td> {/* Parse Numebr type to string */}
          <td>{row.class}</td>
          <td>
            <button type="button" onClick={() => handleRemove(row.id)}>
              Remove
            </button>
          </td>
        </tr>
      )
    })

  return (
    <table className="table">
      <thead className="table__head">
        <tr>{renderLabels()}</tr>
      </thead>
      <tbody className="table__body">{renderRows()}</tbody>
    </table>
  )
}

/* Columns: Student name, Score, Class, Tools */
