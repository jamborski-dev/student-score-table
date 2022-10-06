import { createContext, useState, Dispatch, SetStateAction } from "react"

interface IStore {
  state: IStoreState
  actions: IStoreActions
}

interface IStoreState {
  data: TStudentScore[]
}

interface IStoreActions {
  setData: Dispatch<SetStateAction<TStudentScore[]>>
}

type TStudentScore = {
  id: Number
  name: String
  score: Number
  class: String
}

type TContextProps = {
  children?: React.ReactNode
}

export const Store = createContext<IStore>({
  state: {
    data: []
  },
  actions: {
    setData: () => {}
  }
})

export const StoreProvider = ({ children }: TContextProps) => {
  const [data, setData] = useState<TStudentScore[]>([])

  const contextObject = {
    state: {
      data
    },
    actions: {
      setData
    }
  }

  return <Store.Provider value={contextObject}>{children}</Store.Provider>
}
