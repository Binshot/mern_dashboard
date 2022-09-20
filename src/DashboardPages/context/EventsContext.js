import React, { createContext, useReducer } from 'react'

export const EventContext = createContext()

export const eventsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EVENT':
      return {
        events: action.payload
      }
    case 'CREATE_EVENT':
      return {
        events: [action.payload, ...state.events]
      }
    case 'DELETE_EVENT':
      return {
        events: state.events.filter(w => w._id !== action.payload._id)
      }
    case 'UPDATE_EVENT':
      return {
        events: state.events.map((announcement) => (announcement._id === action.payload._id) ? action.payload : announcement)
      }
    default:
      return state
  }
}

export const EventContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventsReducer, {
    events: null
  })

  return (
    <EventContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EventContext.Provider>
  )
}