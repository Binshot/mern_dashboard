import React, { useState } from 'react'
import { NavLink, Navigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VisibilityOn from '@mui/icons-material/Visibility';

import { useLogin } from "../../hooks/useLogin"
import { TextField } from '@mui/material';

function Login() {
    const [type, setType] = useState(false)

    const handleClickShowPassword = () => {
        setType(!type)
    };

    //For Login Auth
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading, emptyFields } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <form className='dashboardLogin' onSubmit={handleSubmit}>
            <div className='loginForm'>
                <div className='loginHeader'>
                    <h2>Welcome Back!</h2>
                    <p>Enter your details to login to your account</p>
                </div>
                <div className='loginInputContainer'>
                    <h3>Email</h3>
                    <TextField
                        error={emptyFields.includes('Email') ? true : false}
                        id={'outlined-error'}
                        placeholder='Input Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root:hover": {
                                "& > fieldset": {
                                    borderColor: "#7175F4"
                                }
                            }
                        }}
                    />
                    <h3>Password</h3>
                    <OutlinedInput
                        error={emptyFields.includes('Password') ? true : false}
                        id="outlined-adornment-password"
                        placeholder='Input Password'
                        type={type ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        sx={{
                            "& .MuiOutlinedInput-root:hover": {
                                "& > fieldset": {
                                    borderColor: "#7175F4"
                                }
                            }
                        }}
                    />
                </div>
                {error && <div className="divError loginError">{error}</div>}
                <button disabled={isLoading} className='loginButton'> LOGIN</button>
                <div className='lowerActions'>
                    <NavLink to="/forgot_password" >
                        <p>Forgot Password?</p>
                    </NavLink>
                </div>
            </div>
        </form>
    )
}

export default Login
