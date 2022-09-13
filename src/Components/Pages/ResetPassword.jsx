import React, { useState } from 'react'
import { NavLink } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VisibilityOn from '@mui/icons-material/Visibility';

function ResetPassword() {
    const [type, setType] = useState(false)
    const [type2, setType2] = useState(false)

    const handleClickShowPassword = () => {
        setType(!type)
    };
    const handleClickShowPassword2 = () => {
        setType2(!type)
    };

    //For Login Auth
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    // const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // await login(email, password)
    }

    return (
        <form className='login' onSubmit={handleSubmit}>
            <div className='loginForm'>
                <div className='loginHeader'>
                    <h2>Reset Password</h2>
                    <p>Account Email: 1@s.com</p>
                </div>
                <div className='loginInputContainer'>
                    <div>
                        <h3>Password</h3>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            required
                            placeholder='Input New Password'
                            type={type ? "text" : "password"}
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}
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
                    <div>
                        <h3>Confirm Password</h3>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            required
                            placeholder='Confirm New Password'
                            type={type2 ? "text" : "password"}
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {type2 ? <VisibilityOn /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </div>
                </div>
                {/* {error && <div className="error">{error}</div>} */}
                {/* <button disabled={isLoading} className='loginButton'> LOGIN</button> */}
                <button className='loginButton'> RESET PASSWORD</button>
            </div>
        </form>
    )
}

export default ResetPassword
