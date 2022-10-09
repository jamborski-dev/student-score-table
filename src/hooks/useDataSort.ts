import { useEffect, useState } from "react"
import { TStudentScore } from "../store/store.types"

export const useDataSort = (initialData: TStudentScore[]) => {
  enum ESortDirections {
    ASCD = "ASCD",
    DESC = "DESC"
  }

  const [sortDirection, setSortDirection] = useState<ESortDirections>(ESortDirections.ASCD)
  const [sortColumn, setSortColumn] = useState<string>("name")
  const [dataSorted, setDataSorted] = useState<TStudentScore[]>(initialData)

  useEffect(() => {
    // FIXME: stale state - 1st click into different sort handle removes current sorting - rendered state is not its true value, but 1 step behind
    // possible solution - move sort logic into data context OR use state manager, zustand maybe?

    if (sortDirection === ESortDirections.ASCD) {
      setDataSorted(prev =>
        prev.sort((a: any, b: any) => {
          if (typeof a[sortColumn] === "string") {
            return a[sortColumn].localeCompare(b[sortColumn])
          } else {
            return a[sortColumn] - b[sortColumn]
          }
        })
      )
    }

    if (sortDirection === ESortDirections.DESC) {
      setDataSorted(prev =>
        prev.sort((a: any, b: any) => {
          if (typeof b[sortColumn] === "string") {
            return b[sortColumn].localeCompare(a[sortColumn])
          } else {
            return b[sortColumn] - a[sortColumn]
          }
        })
      )
    }
    // eslint-disable-next-line
  }, [sortColumn, sortDirection])

  return {
    state: { dataSorted, sortColumn, sortDirection },
    actions: { setDataSorted, setSortDirection, setSortColumn },
    types: { ESortDirections }
  }
}
