import { createContext, useReducer } from 'react'

export const ResidentContext = createContext()

export const residentsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RESIDENT':
      return {
        residents: action.payload
      }
    case 'CREATE_RESIDENT':
      return {
        residents: [action.payload, ...state.events]
      }
    case 'DELETE_RESIDENT':
      return {
        residents: state.events.filter(w => w._id !== action.payload._id)
      }
    case 'UPDATE_RESIDENT':
      return {
        residents: state.events.map((announcement) => (announcement._id === action.payload._id) ? action.payload : announcement)
      }
    default:
      return state
  }
}

export const ResidentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(residentsReducer, {
    residents: null
  })

  return (
    <ResidentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ResidentContext.Provider>
  )
}