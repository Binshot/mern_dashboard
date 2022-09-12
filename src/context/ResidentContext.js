import React, { createContext, useReducer } from 'react'

export const ResidentContext = createContext()

export const residentsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RESIDENT':
      return {
        residents: action.payload
      }
    case 'CREATE_RESIDENT':
      return {
        residents: [action.payload, ...state.residents]
      }
    case 'DELETE_RESIDENT':
      console.log(state.residents.filter(w => w._id !== action.payload._id))
      return {
        residents: state.residents.filter(w => w._id !== action.payload._id)
      }
    case 'UPDATE_RESIDENT':
      return {
        residents: state.residents.map((res) => (res._id === action.payload._id) ? action.payload : res)
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