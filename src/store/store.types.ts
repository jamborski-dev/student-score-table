import { Dispatch, SetStateAction } from "react"

export interface IStore {
  state: IStoreState
  actions: IStoreActions
}

export interface IStoreState {
  data: TStudentScore[]
  dataFiltered: TStudentScore[]
  classes: string[]
  isEdit: boolean
}

export interface IStoreActions {
  setData: Dispatch<SetStateAction<TStudentScore[]>>
  setDataFiltered: Dispatch<SetStateAction<TStudentScore[]>>
  addRecord: (record: TStudentScore) => void
  removeRecord: (_id: number) => void
  setEdit: Dispatch<SetStateAction<boolean>>
}

export type TStudentScore = {
  id: number
  name: string
  score: number
  class: string
}

export type TContextProps = {
  children?: React.ReactNode
}
