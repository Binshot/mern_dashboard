import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    
    fetch(process.env.REACT_APP_API_URL + '/activity/', {
      method: 'POST',
      body: JSON.stringify({activity: "Admin logged out"}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return { logout }
}