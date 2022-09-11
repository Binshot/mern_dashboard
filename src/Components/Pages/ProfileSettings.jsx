import React, { useState } from 'react'

import Modal from "../CommonComponents/Modal"
import TextField from "@mui/material/TextField";

import Avatar from "../NewImageFiles/ProfileSetting/Avatar.svg"

function ProfileSettings() {
    const [showModal, setShowModal] = useState(null);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [action, setAction] = useState(null);
    return (
        <div>
            <Modal
                shown={showModal}
                close={() => {
                    setShowModal(false);
                }}>
                <div className="profileModals">
                    <h2 className="marginBottom">Change {action === "email" ? "Email" : "Password"}?</h2>
                    <div className="flex-column addAnnouncement">
                        <div hidden={action === "email" ? true : false}>
                            <h4>Current Password</h4>
                            <TextField
                                id="outlined-multiline-static"
                                placeholder="Input Current Password"
                                defaultValue={title}
                                fullWidth
                                type={"password"}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div hidden={action === "email" ? true : false}>
                            <h4>New Password</h4>
                            <TextField
                                id="outlined-multiline-static"
                                placeholder="Input New Password"
                                defaultValue={description}                            
                                fullWidth
                                type={"password"}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div hidden={action === "email" ? true : false}>
                            <h4>Confirm Password</h4>
                            <TextField
                                id="outlined-multiline-static"
                                placeholder="Confirm Password"
                                type={"password"}
                                defaultValue={description}
                                fullWidth
                                inputProps={{
                                    maxLength: 400
                                }}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div hidden={action === "email" ? false : true}>
                            <h4>New Email</h4>
                            <TextField
                                id="outlined-multiline-static"
                                placeholder="Input Description"
                                defaultValue={description}
                                fullWidth
                                inputProps={{
                                    maxLength: 400
                                }}
                                
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="profileModalButtons">
                        <button
                            className="borderedButton"
                            onClick={() => {
                                setShowModal(false)
                                // document.getElementById("topBlur").className = "topbar flex-row";
                                // document.getElementById("sideBlur").className = "sidebar";
                                // document.getElementById("contentBlur").className = "resident";
                                // document.getElementById("headerBlur").className = "header";
                            }}>
                            Back
                        </button>
                        <button
                            className="solidButton buttonBlue"
                            // hidden={action === "view" ? "hidden" : ""}
                            onClick={() => {
                                setShowModal(false)
                                // document.getElementById("topBlur").className = "topbar flex-row";
                                // document.getElementById("sideBlur").className = "sidebar";
                                // document.getElementById("contentBlur").className = "resident";
                                // document.getElementById("headerBlur").className = "header";
                                // handleUpdate()
                                // toggleSnackbar(true)
                            }}>
                            Submit
                        </button>
                    </div>
                </div>
            </Modal>

            <div className="borderBottom2 topHeader">
                <h1>PROFILE SETTING</h1>
            </div>
            <div style={{ height: "75vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div className='profileContainer'>
                    <img src={Avatar} alt="" />
                    <div className='name'>
                        <h2>Admin</h2>
                        <p>admin@gmail.com</p>
                    </div>
                    <div className='updateProfileButtons'>
                        <button onClick={() => {
                            setAction("email")
                            setShowModal(true)
                        }}>
                            Change Email
                        </button>
                        <button onClick={() => {
                            setAction("password")
                            setShowModal(true)
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
