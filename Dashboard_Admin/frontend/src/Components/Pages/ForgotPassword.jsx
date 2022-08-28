import React from 'react'
import { NavLink } from "react-router-dom";

function ForgotPassword() {
    return (
        <div className='login'>
            <div className='loginForm'>
                <div className='loginHeader'>
                    <h2>FORGOT PASSWORD?</h2>
                    <p>Enter your email to reset your password</p>
                </div>
                <div className='loginInputContainer'>
                    <div>
                        <h3>Email</h3>
                        <input type="email" placeholder='Input Email' />
                    </div>
                </div>
                <NavLink to="/login">
                    <div className='loginButton'>
                        SEND
                    </div>
                </NavLink>
                <div className='lowerActions'>
                    <NavLink to="/login">
                        <p>Back to Login</p>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
