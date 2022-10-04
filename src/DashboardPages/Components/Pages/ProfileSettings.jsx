import React, { useState } from 'react'

import Modal from "../CommonComponents/Modal"

import Avatar from "../NewImageFiles/ProfileSetting/Avatar.svg"

//for password field
import IconButton from "@mui/material/IconButton";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VisibilityOn from '@mui/icons-material/Visibility';
import { TextField } from '@mui/material';

function ProfileSettings() {

    const user = JSON.parse(localStorage.getItem("user"));
    const [showModal, setShowModal] = useState(null);
    const [action, setAction] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    // for password field
    const [type1, setType1] = useState(false)
    const [type2, setType2] = useState(false)
    const [type3, setType3] = useState(false)

    // for change Password
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');

    // for change email
    const [currentEmail, setCurrentEmail] = useState('')
    const [newEmail, setNewEmail] = useState('')

    // handle change email
    const handleChangeEmailSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault()

        const changeEmail = { currentEmail, newEmail }

        const response = await fetch('https://drims-demo.herokuapp.com/api/account/change-email/' + user.id, {
            method: 'POST',
            body: JSON.stringify(changeEmail),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (response.ok) {
            setIsLoading(false)
            setShowModal(false)
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify({ ...user, email: json.email }))
            // toggleAddModal(false)
            // document.getElementById("topBlur").className = "topbar flex-row";
            // document.getElementById("sideBlur").className = "sidebar";
            // document.getElementById("contentBlur").className = "resident";
            // document.getElementById("headerBlur").className = "header";
            // toggleSnackbar(true)
        } else {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
    }

    // handle change password
    const handleChangePasswordSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault()

        const changePassword = { currentPassword, newPassword, confirmPassword }

        const response = await fetch('https://drims-demo.herokuapp.com/api/account/change-password/' + user.id, {
            method: 'POST',
            body: JSON.stringify(changePassword),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (response.ok) {
            setIsLoading(false)
            setShowModal(false)
            toggleAddModal(false)
            document.getElementById("topBlur").className = "topbar flex-row";
            document.getElementById("sideBlur").className = "sidebar";
            document.getElementById("profileHeaderBlur").className = "borderBottom2 topHeader";
            document.getElementById("profileContentBlur").classList.remove("blur");
            toggleSnackbar(true)
        } else {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
    }

    return (
        <div>
            <Modal
                shown={showModal}
                close={() => {
                    setShowModal(false);
                }}>
                <form onSubmit={action == "email" ? handleChangeEmailSubmit : handleChangePasswordSubmit}>
                    <div className="profileModals">
                        <h2 className="marginBottom">Change {action == "email" ? "Email" : "Password"}?</h2>
                        {action != "email" &&
                            <p style={{ fontSize: "14px", marginBottom: "24px", color: "#9C9C9C" }}>
                                Passwod must be at least 8 charactes with both uppercase and lowercase letters, numbers, and symbols. <br></br>
                                Allowed symbols: [ ! @ # $ % ^ & * - _ . ]
                            </p>
                        }
                        <div hidden={action == "email" ? true : false} className="password">
                            <div className='textfield'>
                                <h3>Current Password</h3>
                                <OutlinedInput
                                    error={emptyFields.includes('Current Password') ? true : false}
                                    placeholder='Input current password'
                                    type={type1 ? "text" : "password"}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setType1(!type1)}
                                            >
                                                {type1 ? <VisibilityOn /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
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
                            <div className='textfield'>
                                <h3>New Password</h3>
                                <OutlinedInput
                                    error={emptyFields.includes('New Password') ? true : false}
                                    placeholder='Input new password'
                                    type={type2 ? "text" : "password"}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setType2(!type2)}
                                            >
                                                {type2 ? <VisibilityOn /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </div>
                            <div className='textfield'>
                                <h3>Confirm Password</h3>
                                <OutlinedInput
                                    error={emptyFields.includes('Confirm Password') ? true : false}
                                    placeholder='Confirm new password'
                                    type={type3 ? "text" : "password"}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setType3(!type3)}
                                            >
                                                {type3 ? <VisibilityOn /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </div>
                        </div>
                        <div hidden={action == "email" ? false : true} className="email">
                            <h4>Current Email</h4>
                            <TextField
                                error={emptyFields.includes('Current Email') ? true : false}
                                type="text"
                                placeholder="Input Current Email"
                                value={currentEmail}
                                fullWidth
                                onChange={(e) => setCurrentEmail(e.target.value)}
                                sx={{
                                    backgroundColor: "white",
                                    "& .MuiOutlinedInput-root:hover": {
                                        "& > fieldset": {
                                            borderColor: "#7175F4"
                                        }
                                    }
                                }}
                            />
                            <h4>New Email</h4>
                            <TextField
                                error={emptyFields.includes('New Email') ? true : false}
                                fullWidth
                                type="text"
                                placeholder="Input New Email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
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
                        <div className="profileModalButtons">
                            <button
                                className="borderedButton"
                                type='button'
                                onClick={() => {
                                    setIsLoading(false)
                                    setShowModal(false)
                                    setError(null)
                                    setEmptyFields([])
                                    setCurrentEmail('')
                                    setNewEmail('')
                                    setCurrentPassword('')
                                    setNewPassword('')
                                    setConfirmPassword('')
                                    document.getElementById("topBlur").className = "topbar flex-row";
                                    document.getElementById("sideBlur").className = "sidebar";
                                    document.getElementById("profileHeaderBlur").className = "borderBottom2 topHeader";
                                    document.getElementById("profileContentBlur").classList.remove("blur");
                                }}>
                                Back
                            </button>
                            <button
                                className="solidButton buttonBlue"
                                typeof='submit'>
                                Submit
                            </button>
                        </div>
                        {error && <div className="divError" style={{ marginTop: "16px" }}>{error}</div>}
                    </div>
                </form>
            </Modal>

            <div className="borderBottom2 topHeader" id='profileHeaderBlur' >
                <h1>PROFILE SETTING</h1>
            </div>
            <div id='profileContentBlur' style={{ height: "75vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div className='profileContainer'>
                    <img src={Avatar} alt="" />
                    <div className='name'>
                        <h2>Admin</h2>
                    </div>
                    <div className='updateProfileButtons'>
                        <button onClick={() => {
                            setAction("email")
                            setShowModal(true)
                            document.getElementById("sideBlur").className += " blur";
                            document.getElementById("topBlur").className += " blur";
                            document.getElementById("profileHeaderBlur").className += " blur";
                            document.getElementById("profileContentBlur").className = " blur";
                        }}>
                            Change Email
                        </button>
                        <button onClick={() => {
                            setAction("password")
                            setShowModal(true)
                            document.getElementById("sideBlur").className += " blur";
                            document.getElementById("topBlur").className += " blur";
                            document.getElementById("profileHeaderBlur").className += " blur";
                            document.getElementById("profileContentBlur").className = " blur";
                        }}>
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSettings
