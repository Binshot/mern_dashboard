import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom"

import IconButton from "@mui/material/IconButton";
import InputAdornment from '@mui/material/InputAdornment';
import { TextField } from "@mui/material";

import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VisibilityOn from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import useTitle from "../../hooks/useTitle"
function ResetPassword() {
    useTitle("DRIMS | Reset Password")
    const params = useParams();
    let navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(false);
    const [resetSuccessful, setResetSuccessful] = useState(false)
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [emptyFields, setEmptyFields] = useState([])
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
                const timer = setTimeout(() => navigate("/"), 5000);
                return () => clearTimeout(timer);
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
        setType2(!type2)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

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
                setResetSuccessful(true);
                console.log(json);
                setIsLoading(false);
            } else {
                setError(json.error);
                setEmptyFields(json.emptyFields)
                setIsLoading(false);
                console.log(json.error);
                setResetSuccessful(false);
            }

        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <div className="dashboardLogin">
            {!resetSuccessful ?
                (
                    isVerified ?
                        (
                            <form onSubmit={handleSubmit}>
                                <div className='loginForm'>
                                    <div className='loginHeader'>
                                        <h2>Reset Password</h2>
                                        <p>Account Email: 1@s.com</p>
                                        <p style={{ fontSize: "14px", margin: "16px", color: "#9C9C9C" }}>
                                            Passwod must be at least 8 charactes with both uppercase and lowercase letters, numbers, and symbols. <br></br>
                                            Allowed symbols: [ ! @ # $ % ^ & * - _ . ]
                                        </p>
                                    </div>
                                    <div className='loginInputContainer'>
                                        <div>
                                            <h3>New Password</h3>
                                            <div className='loginPassword'>
                                                <TextField
                                                    fullWidth
                                                    variant="standard"
                                                    placeholder='Input New Password'
                                                    type={type ? "text" : "password"}
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    InputProps={{
                                                        disableUnderline: true,
                                                    }}
                                                    sx={{
                                                        "& .MuiOutlinedInput-root": {
                                                            "& > fieldset": {
                                                                border: 0
                                                            }
                                                        }
                                                    }}
                                                />
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                    >
                                                        {type ? <VisibilityOn /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            </div>
                                        </div>
                                        <div>
                                            <h3>Confirm New Password</h3>
                                            <div className='loginPassword'>
                                                <TextField
                                                    fullWidth
                                                    variant="standard"
                                                    placeholder='Confirm New Password'
                                                    type={type2 ? "text" : "password"}
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    InputProps={{
                                                        disableUnderline: true,
                                                    }}
                                                    sx={{
                                                        "& .MuiOutlinedInput-root": {
                                                            "& > fieldset": {
                                                                border: 0
                                                            }
                                                        }
                                                    }}
                                                />
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword2}
                                                    >
                                                        {type2 ? <VisibilityOn /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            </div>
                                        </div>
                                    </div>
                                    <button className='loginButton' type="submit" disabled={isLoading}> RESET PASSWORD</button>
                                    {/* {isLoading && <div className="divLoading">Loading....</div>} */}
                                    {error && <div className="divError" style={{ marginTop: "16px" }}>{error}</div>}
                                </div>
                            </form>
                        ) : (
                            <h3 style={{color: "white"}}>Reset Password Link is not valid. You will be redirected to the Login page shortly...</h3>
                        )
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
                            <h2 style={{ marginBottom: '8px', textAlign: "center" }}>
                                Your password has been
                                reset successfully!</h2>
                            <p>You can now Log In with your new password.</p>
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

export default ResetPassword
