import { AnnouncementContext } from "../context/AnnouncementContext"
import { useContext } from "react"

export const useAnnouncementContext = () => {
  const context = useContext(AnnouncementContext)

  if(!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}