import React, { createContext, useReducer } from 'react'

export const AnnouncementContext = createContext()

export const announcementsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ANNOUNCEMENT':
      return {
        announcements: action.payload
      }
    case 'CREATE_ANNOUNCEMENT':
      return {
        announcements: [action.payload, ...state.announcements]
      }
    case 'DELETE_ANNOUNCEMENT':
      console.log(state.announcements.filter(w => w._id !== action.payload._id))
      return {
        announcements: state.announcements.filter(w => w._id !== action.payload._id)
      }
    case 'UPDATE_ANNOUNCEMENT':
      return {
        announcements: state.announcements.map((announcement) => (announcement._id === action.payload._id) ? action.payload : announcement)
      }
    default:
      return state
  }
}

export const AnnouncementContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(announcementsReducer, {
    announcements: null
  })

  return (
    <AnnouncementContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AnnouncementContext.Provider>
  )
}