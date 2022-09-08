import React, { useState } from 'react'
import { NavLink } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VisibilityOn from '@mui/icons-material/Visibility';

import { useLogin } from "../../hooks/useLogin"

function Login() {
    const [type, setType] = useState(false)

    const handleClickShowPassword = () => {
        setType(!type)
    };

    //For Login Auth
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      console.log(email, password)
      await login(email, password)
    }
  
    return (
        <form className='login' onSubmit={handleSubmit}>
            <div className='loginForm'>
                <div className='loginHeader'>
                    <h2>LOGIN</h2>
                    <p>Enter your details to login to your account</p>
                </div>
                <div className='loginInputContainer'>
                    <div>
                        <h3>Email</h3>
                        <input type="email" placeholder='Input Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <h3>Password</h3>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={type ? "text" : "password"}
                            value={password} 
                            onChange={(e)=>setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {type ? <VisibilityOn /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </div>
                </div>
                {/* <NavLink to="/admin">
                    <div className='loginButton'>
                        LOGIN
                    </div>
                </NavLink> */}
                <button disabled={isLoading}>Log in</button>
                <div className='lowerActions'>
                    <NavLink to="/forgot_password">
                        <p>Forgot Password?</p>
                    </NavLink>
                </div>
            </div>
        </form>
    )
}

export default Login
