import React, { createContext, useReducer } from 'react'

export const MessageContext = createContext()

export const messagesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE_COUNT':
      return {
        messages: action.payload
      }
    case 'SUBTRACT_MESSAGE_COUNT':
      return {
        messages: state.messages - 1
      }
    default:
      return state
  }
}

export const MessageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messagesReducer, {
    messages: null
  })

  return (
    <MessageContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MessageContext.Provider>
  )
}