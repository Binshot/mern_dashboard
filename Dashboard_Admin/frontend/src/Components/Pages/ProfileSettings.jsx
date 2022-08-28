import React, { useState } from 'react'
import { NavLink } from "react-router-dom";

import Avatar from "../NewImageFiles/ProfileSetting/Avatar.svg"
import Upload from "../NewImageFiles/ProfileSetting/uploadAvatar.svg"

import IconButton from "@mui/material/IconButton";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VisibilityOn from '@mui/icons-material/Visibility';

function ProfileSettings() {
    const [type, setType] = useState(false)

    const handleClickShowPassword = () => {
        setType(!type)
    };
    return (
        <div>
            <div className="borderBottom2 topHeader">
                <h1>PROFILE SETTING</h1>
            </div>
            <div className='profileContainer'>
                <div className='profileAvatar'>
                    <img src={Avatar} alt="" />
                    <div className='uploadAvatar' style={{cursor: "pointer"}}>
                        <label>
                            <img src={Upload} alt="" style={{cursor: "pointer"}}/>
                            <input type="file" />
                        </label>
                    </div>
                </div>
                <div className='name'>
                    <h2>Dave Devon</h2>
                    <p>Admin</p>
                </div>
                <div className='profileDetails'>
                    <div>
                        <h3>Last Name</h3>
                        <input type="text" defaultValue="Devon" />
                    </div>
                    <div>
                        <h3>Email</h3>
                        <input type="email" defaultValue="davedevon@gmail.com" />
                    </div>
                    <div>
                        <h3>Password</h3>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={type ? "text" : "password"}
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
                        <h3>First Name</h3>
                        <input type="text" defaultValue="Dave" />
                    </div>
                    <div>
                        <h3>Username</h3>
                        <input type="text" defaultValue="davedevon" />
                    </div>
                    <div>
                        <h3>Confirm Password</h3>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={type ? "text" : "password"}
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
            </div>
            <div className='profileButtons flex-row'>
                <NavLink to="/admin" style={{ textDecoration: "none" }}>
                    <div className='cancel' style={{ cursor: "pointer" }}>
                        Cancel
                    </div>
                </NavLink>
                <NavLink to="/admin" style={{ textDecoration: "none" }}>
                    <div className='update' style={{ cursor: "pointer" }}>
                        Update
                    </div>
                </NavLink>

            </div>
        </div>
    )
}

export default ProfileSettings
