import { TextField } from '@mui/material';
import React, { useState } from 'react'
import { NavLink } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';

function ForgotPassword() {

    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/account/forgot-password/', {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const json = await response.json();

            if (response.ok) {
                setIsLoading(false);
                setEmailSent(true)
            } else {
                setError(json.error);
                setIsLoading(false);
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='dashboardLogin'>
            {!emailSent ?
                (
                    <form onSubmit={handleSubmit}>
                        <div className='loginForm'>
                            <div className='loginHeader'>
                                <h2>FORGOT PASSWORD?</h2>
                                <p>Enter your email to reset your password</p>
                            </div>
                            <div className='loginInputContainer'>
                                <div>
                                    <h3>Email</h3>
                                    <TextField
                                        error={error}
                                        fullWidth
                                        type="email"
                                        placeholder='Input Email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        sx={{
                                            backgroundColor: "white",
                                            "& .MuiOutlinedInput-root:hover": {
                                                "& > fieldset": {
                                                    borderColor: "#7175F4"
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            {error && <div className="divError" style={{ marginBottom: "16px" }}>{error}</div>}
                            <div className='loginButtons'>
                                <button className='loginButton' type='submit' disabled={isLoading}>
                                    SEND
                                </button>
                                <NavLink to='/login' className='forgotPassword'>
                                    Back to Login
                                </NavLink>
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className='loginForm'>
                        <div className='loginHeader' style={{ marginBottom: '24px' }}>
                            <div className='sentIcon'>
                                <CheckIcon
                                    sx={{
                                        color: '#35CA3B',
                                        fontSize: 33
                                    }}
                                />
                            </div>
                            <h2 style={{ marginBottom: '8px' }}>Reset password link sent</h2>
                            <p>Please follow the password reset instruction that
                                we sent to your email.</p>
                        </div>
                        <div className='loginButtons'>
                            <NavLink to='/login' className='loginButton'>
                                Back to Login
                            </NavLink>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ForgotPassword
