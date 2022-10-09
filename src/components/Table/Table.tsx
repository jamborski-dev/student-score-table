import { useEffect } from "react"
import { useStore } from "../../hooks/useStore"
import { useDataSort } from "../../hooks/useDataSort"
import { formatScoreCell } from "../../utils/helpers"

import { GrEdit } from "react-icons/gr"
import { TbTrashOff } from "react-icons/tb"
import { CgSortAz, CgSortZa } from "react-icons/cg"

export const Table = () => {
  const {
    state: { dataFiltered },
    actions: { removeRecord }
  } = useStore()

  const {
    state: { dataSorted, sortColumn, sortDirection },
    actions: { setDataSorted, setSortDirection, setSortColumn },
    types: { ESortDirections }
  } = useDataSort(dataFiltered)

  useEffect(() => {
    setDataSorted(dataFiltered)
  }, [dataFiltered.length])

  /* useEffect(() => {
    console.group("Sort test")
    console.log("sorted", dataSorted)
    console.log("dir", sortDirection)
    console.log("column", sortColumn)
    console.log("filtered", dataFiltered)
    console.groupEnd()
  }, [dataSorted, dataFiltered, sortColumn, sortDirection]) */

  if (!dataFiltered.length) return <div className="table-notice">Oops, no data found...</div>

  const columns = [
    {
      label: "Student Name",
      key: "name",
      align: "start",
      filter: true
    },
    {
      label: "Score",
      key: "score",
      align: "start",
      filter: true
    },
    {
      label: "Class",
      key: "class",
      align: "start",
      filter: true
    },
    {
      label: "Row Actions",
      key: "actions",
      align: "end",
      filter: false
    }
  ]

  // TODO: implement edit record
  const handleEdit = (_id: number) => {
    // Set global edit flag
    // Set 'Add new record' text to 'Edit Rrcord'
    // Reinitialize form with object where id === _id
  }

  const handleRemove = (_id: number) => {
    // TODO: create Toast component for design consistency
    if (!window.confirm(`Are you sure you want to delete this record?`)) return
    removeRecord(_id)
  }

  const handleSortToggle = (key: string) => {
    setSortColumn(key)

    if (sortColumn === key) {
      if (sortDirection === ESortDirections.ASCD) {
        setSortDirection(ESortDirections.DESC)
      } else {
        setSortDirection(ESortDirections.ASCD)
      }
    }
  }

  const renderFilterHandle = (key: string) => {
    if (sortDirection === ESortDirections.DESC && key === sortColumn) {
      return <CgSortZa className="icon" />
    }

    return <CgSortAz className="icon" />
  }

  const renderLabels = () =>
    columns.map((column, i) => {
      return (
        <td key={i} className={`col-align--${column.align}`}>
          <div
            // TODO: conditional onClick and class to remove pointer event if no filter enabled
            onClick={() => handleSortToggle(column.key)}
            className={`table__label ${column.key === sortColumn ? "-active" : ""}`}
          >
            {column.label}
            {column.filter && renderFilterHandle(column.key)}
          </div>
        </td>
      )
    })

  const renderRows = () =>
    dataSorted.map((row, i) => {
      return (
        <tr key={i}>
          <td>{row.name}</td>
          <td className={`score ${formatScoreCell(row.score)}`}>
            {/* FIX: Numebr type must be parsed to a string or it will throw component error */}
            {`${row.score}`}
          </td>
          <td>{row.class}</td>
          <td className="table__btns col-align--end">
            <div className="btn-group">
              <button
                data-tooltip="Feature temporarily disabled"
                className="btn show-tooltip"
                type="button"
                onClick={() => handleEdit(row.id)}
                disabled
              >
                <GrEdit className="force-stroke" />
              </button>
              <button
                className="btn -warning show-tooltip"
                data-tooltip="Remove record"
                type="button"
                onClick={() => handleRemove(row.id)}
              >
                <TbTrashOff />
              </button>
            </div>
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
