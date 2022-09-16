import { ActivityLogsContext } from "../context/ActivityLogsContext"
import { useContext } from "react"

export const useActivityLogsContext = () => {
  const context = useContext(ActivityLogsContext)

  if(!context) {
    throw Error('useActivityLogsContext must be used inside an ActivityLogsContextProvider')
  }

  return context
}