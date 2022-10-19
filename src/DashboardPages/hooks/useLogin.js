import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const [emptyFields, setEmptyFields] = useState([])

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('https://drims-demo.herokuapp.com/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, accountType: "ADMIN" })
    })

    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
      json.error === "Please fill up fields" ? setEmptyFields(json.emptyFields) : setEmptyFields(oldArray => [...oldArray, "newElement"])
      
      fetch('https://drims-demo.herokuapp.com/api/activity/', {
        method: 'POST',
        body: JSON.stringify({ activity: "Admin failed to log in" }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({ type: 'LOGIN', payload: json })

      // update loading state
      setIsLoading(false)

      // add activity logs
      // const activity = "Admin logged in" 
      // const content = {activity}
      fetch('https://drims-demo.herokuapp.com/api/activity/', {
        method: 'POST',
        body: JSON.stringify({ activity: "Admin logged in" }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }

  return { login, isLoading, error, emptyFields }
} 