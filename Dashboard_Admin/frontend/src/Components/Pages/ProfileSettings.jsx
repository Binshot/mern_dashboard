import { display, positions } from '@mui/system'
import React, { useState } from 'react'

import Avatar from "../NewImageFiles/ProfileSetting/Avatar.svg"

function ProfileSettings() {
    return (
        <div>
            <div className="borderBottom2 topHeader">
                <h1>PROFILE SETTING</h1>
            </div>
            <div style={{height:"75vh", display:"flex", flexDirection: "column", justifyContent: "center"}}>
                <div className='profileContainer'>
                    <img src={Avatar} alt="" />
                    <div className='name'>
                        <h2>Admin</h2>
                        <p>admin@gmail.com</p>
                    </div>
                    <div className='updateProfileButtons'>
                        <button>
                            Change Email
                        </button>
                        <button>
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSettings
