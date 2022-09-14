import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"

import IconButton from "@mui/material/IconButton";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VisibilityOn from '@mui/icons-material/Visibility';

function ResetPassword() {
    const params = useParams();
    let navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [emptyFields, setEmptyFields] = useState([])
    const [isSuccess, setIsSuccess] = useState(false);
    const url = `https://drims-demo.herokuapp.com/api/account/reset-password/${params.id}/${params.token}`;

    useEffect(() => {
        const verifyLink = async () => {
            const response = await fetch(url);
            const json = await response.json();

            if (response.ok) {
                setIsVerified(true);
                console.log(json);
            } else {
                setIsVerified(false);
                console.log(json);
                // const timer = setTimeout(() => navigate("/"), 8000);
                // return () => clearTimeout(timer);
            }
        }

        verifyLink();
    }, [params, url, navigate]);

    const [type, setType] = useState(false)
    const [type2, setType2] = useState(false)

    const handleClickShowPassword = () => {
        setType(!type)
    };
    const handleClickShowPassword2 = () => {
        setType2(!type)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch(`https://drims-demo.herokuapp.com/api/account/reset-password/${params.id}/${params.token}`, {
                method: 'POST',
                body: JSON.stringify({ newPassword, confirmPassword }),
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
                setEmptyFields(json.emptyFields)
                setIsLoading(false);
                console.log(json);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className='login' onSubmit={handleSubmit}>
            {isVerified &&
                <div className='loginForm'>

                    <div className='loginHeader'>
                        <h2>Reset Password</h2>
                        <p>Account Email: 1@s.com</p>
                    </div>
                    <div className='loginInputContainer'>
                        <div>
                            <h3>Password</h3>
                            <OutlinedInput
                                className={emptyFields.includes('New Password') ? 'error' : ''}
                                id="outlined-adornment-password"
                                placeholder='Input New Password'
                                type={type ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
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
                                className={emptyFields.includes('Confirm Password') ? 'error' : ''}
                                id="outlined-adornment-password"
                                placeholder='Confirm New Password'
                                type={type2 ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword2}
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
                    {isLoading && <div className="divLoading">Loading....</div>}
                    {error && <div className="divError">{error.error}</div>}
                </div>
            }
            {!isVerified &&
                <h3>Reset Password Link is not valid. You will be redirected to the Login page shortly...</h3>
            }
        </form>
    )
}

export default ResetPassword
