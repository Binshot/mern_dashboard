import React, { useState } from 'react'
import { NavLink } from "react-router-dom";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setIsSuccess(false);

        try {
            const response = await fetch('https://drims-demo.herokuapp.com/api/account/forgot-password/', {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const json = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                console.log(json);
                setIsLoading(false);
            } else {
                setError(json);
                setIsLoading(false);
                console.log(json);
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='login'>
            <form onSubmit={handleSubmit}>
                <div className='loginForm'>
                    <div className='loginHeader'>
                        <h2>FORGOT PASSWORD?</h2>
                        <p>Enter your email to reset your password</p>
                    </div>
                    <div className='loginInputContainer'>
                        <div>
                            <h3>Email</h3>
                            <input
                                type="email"
                                placeholder='Input Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <button className='loginButton' type='submit'>
                        SEND
                    </button>

                    {/* <div className='lowerActions'>
                        <NavLink to="/login">
                            <p>Back to Login</p>
                        </NavLink>
                    </div> */}
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword
