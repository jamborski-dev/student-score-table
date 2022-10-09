import { createContext, useState, useEffect } from "react"
import { IStore, TContextProps, TStudentScore } from "./store.types"
import JSONData from "../data/mock-data.json"

export const Store = createContext<IStore>({
  state: {
    data: [],
    dataFiltered: [],
    classes: ["A", "B", "C", "D"],
    isEdit: false
  },
  actions: {
    setData: () => {},
    setDataFiltered: () => {},
    addRecord: () => {},
    removeRecord: () => {},
    setEdit: () => {}
  }
})

export const StoreProvider = ({ children }: TContextProps) => {
  const [data, setData] = useState<TStudentScore[]>([])
  const [dataFiltered, setDataFiltered] = useState<TStudentScore[]>([])
  const [isEdit, setEdit] = useState<boolean>(false)

  // could possilby be kept in a constant.. leave as state if want to add extra classes via UI
  const [classes] = useState<string[]>(["A", "B", "C", "D"])

  useEffect(() => {
    setData(JSONData)
  }, [])

  useEffect(() => {
    setDataFiltered(data)
  }, [data])

  useEffect(() => {
    if (!data) return
    setDataFiltered(data.sort((a, b) => a.name.localeCompare(b.name)))
  }, [data, dataFiltered])

  const addRecord = (record: TStudentScore) => setData(prev => [...prev, record])
  const removeRecord = (_id: number) => setData(prev => prev.filter(item => item.id !== _id))

  const contextObject = {
    state: {
      data,
      dataFiltered,
      classes,
      isEdit
    },
    actions: {
      setData,
      setDataFiltered,
      addRecord,
      removeRecord,
      setEdit
    }
  }

  return <Store.Provider value={contextObject}>{children}</Store.Provider>
}
