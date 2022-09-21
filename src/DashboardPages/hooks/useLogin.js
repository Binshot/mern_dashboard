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
      
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({ type: 'LOGIN', payload: json })

      // update loading state
      setIsLoading(false)
    }
  }

  return { login, isLoading, error, emptyFields }
} 