import React, { createContext, useReducer } from 'react'

export const ActivityLogsContext = createContext()

export const activityLogsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVITY':
      return {
        activity: action.payload
      }
    case 'CREATE_ACTIVITY':
      return {
        activity: [action.payload, ...state.activity]
      }
    default:
      return state
  }
}

export const ActivityLogsContextProvider = ({ children }) => {
  const [state, activityDispatch] = useReducer(activityLogsReducer, {
    activity: null
  })

  return (
    <ActivityLogsContext.Provider value={{ ...state, activityDispatch }}>
      {children}
    </ActivityLogsContext.Provider>
  )
}