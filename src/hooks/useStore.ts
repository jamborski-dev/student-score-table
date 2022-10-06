import { useContext } from "react"
import { Store } from "../store/store"

export const useStore = () => useContext(Store)
