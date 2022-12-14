import React, { createContext, useReducer } from 'react'

export const ResidentContext = createContext()

export const residentsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RESIDENT':
      return {
        residents: action.payload.sort((a, b) => {
          const name1 = a.lastName + " " + a.firstName
          const name2 = b.lastName + " " + b.firstName

          return name1.localeCompare(name2)})
      }
    case 'CREATE_RESIDENT':
      return {
        residents: [action.payload, ...state.residents]
      }
    case 'DELETE_RESIDENT':
      return {
        residents: state.residents.filter(w => w._id !== action.payload.resident._id)
      }
    case 'UPDATE_RESIDENT':
      return {
        residents: state.residents.map((res) => (res._id === action.payload._id) ? action.payload : res)
      }
    case 'CREATE_RESIDENT_MEMBER':
      return {
        residents: [action.payload.resident, ...state.residents].map((res) => (res._id === action.payload.updateHead._id) ? action.payload.updateHead : res)
      }
    case 'DELETE_RESIDENT_MEMBER':
      return {
        // residents: state.residents.map((res) => (res._id === action.payload.updatedHead._id) ? action.payload.updatedHead : res),
        residents: state.residents.filter(w => w._id !== action.payload.resident._id).map((res) => (res._id === action.payload.updatedHead._id)
          ? action.payload.updatedHead
          : res)
      }
    case 'UPDATE_RESIDENT_MEMBER':
      return {
        residents: state.residents.map((res) => (res._id === action.payload.updatedHead._id)
          ? action.payload.updatedHead
          : (res._id === action.payload.resident._id)
            ? action.payload.resident
            : res)
        // residents: state.residents.map((res) => (res._id === action.payload.resident._id) ? action.payload.resident : res),
      }
    case 'NEW_FAMILY_HEAD':
      return {
        residents: state.residents.map((res) => (res._id === action.payload.oldHead)
          ? { ...res, isHeadOfFamily: false }
          : (res._id === action.payload.newHead._id
            ? action.payload.newHead
            : res)
        )
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