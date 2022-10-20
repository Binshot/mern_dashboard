import React, { createContext, useReducer } from 'react'

export const OrganizationContext = createContext()

export const organizationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_OFFICIAL':
      return {
        organizations: action.payload
      }
    case 'CREATE_OFFICIAL':
      return {
        organizations: [action.payload, ...state.organizations].sort((a, b) => a.positionIndex - b.positionIndex)
      }
    case 'DELETE_OFFICIAL':
      return {
        organizations: state.organizations.filter(w => w._id !== action.payload._id)
      }
    case 'UPDATE_OFFICIAL':
      return {
        organizations: state.organizations.map((member) => (member._id === action.payload.json._id)
          ? { ...member, position: action.payload.json.position, positionIndex: action.payload.sortPosition }
          : member
        ).sort((a, b) => a.positionIndex - b.positionIndex)
      }
    default:
      return state
  }
}

export const OrganizationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(organizationReducer, {
    organizations: null
  })

  return (
    <OrganizationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </OrganizationContext.Provider>
  )
}