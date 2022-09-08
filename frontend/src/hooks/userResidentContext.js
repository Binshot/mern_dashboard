import { ResidentContext } from "../context/ResidentContext"
import { useContext } from "react"

export const useResidentContext = () => {
  const context = useContext(ResidentContext)

  if(!context) {
    throw Error('useResidentContext must be used inside an ResidentContextProvider')
  }

  return context
}