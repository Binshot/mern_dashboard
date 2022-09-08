import React, { useState } from 'react'
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Tabs } from '@mui/material';
import Avatar from "../../../../NewImageFiles/Resident/Avatar.svg"
import ViewFamily from "./ViewFamilyInformation"

import residentData from "../../../../dummyDB/Residents.jsx"

function UpdateResident(props) {

    const [value, setValue] = React.useState(0);

    function handleTabChange(event, value) {
        setValue(value);
    }
    return (
        <div>
            {props.shown ? (
                <div className="modal-backdrop">
                    <div className="residentModals modal-content">
                        <h2 className="marginBottom">View Head of the Family</h2>
                        <div>
                            <div className="flex-column center">
                                <div className='profileAvatar' style={{ marginBottom: "24px" }}>
                                    <img src={Avatar} alt="" />
                                </div>
                                <h4>Duckmanton, Daryl</h4>
                                <p>Father</p>
                            </div>

                            <Box sx={{ width: '100%', height: '348px', mb: 4, borderBottom: 1, borderColor: '#9C9C9C' }}>
                                <Box sx={{ borderBottom: 1, borderColor: '#9C9C9C' }}>
                                    <Tabs value={value} onChange={handleTabChange}>
                                        <Tab label="Personal Information" />
                                        <Tab label="Background Information" />
                                        <Tab label="Family Information" />
                                    </Tabs>
                                </Box>
                                <Box sx={{ height: '250px', overflow: 'auto', padding: "24px 0" }}>
                                    {value === 0 && (
                                        <div className="flex-column tab">
                                            <div className="flex-row space-between">
                                                <div className="flex-column inputs">
                                                    <h4>Last Name</h4>
                                                    <input
                                                        type="text"
                                                        defaultValue="Duckmanton"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="flex-column inputs">
                                                    <h4>First Name</h4>
                                                    <input
                                                        type="text"
                                                        defaultValue="Daryl"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex-row space-between">
                                                <div className="flex-column inputs">
                                                    <h4>Middle Name</h4>
                                                    <input
                                                        type="text"
                                                        defaultValue="Hamilton"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="flex-column inputs">
                                                    <h4>Suffix (If Applicable)</h4>
                                                    <input
                                                        type="text"
                                                        defaultValue="Input Suffix"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex-row space-between">
                                                <div className="flex-column inputs">
                                                    <h4>Birthday</h4>
                                                    <input
                                                        type="text"
                                                        defaultValue="January 20, 1980"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="flex-column inputs">
                                                    <h4>Birth Place</h4>
                                                    <input
                                                        type="text"
                                                        defaultValue="Manila"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex-row space-between">
                                                <div className="flex-column inputs">
                                                    <h4>Gender</h4>
                                                    <input
                                                        type="text"
                                                        defaultValue="Male"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="flex-column inputs">
                                                    <h4>Religion</h4>
                                                    <input
                                                        type="text"
                                                        defaultValue="Catholic"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex-row space-between">
                                                <div className="flex-column inputs">
                                                    <h4>Email Address</h4>
                                                    <input
                                                        type="text"
                                                        defaultValue="daryl@mclaughlin.biz"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="flex-column inputs">
                                                    <h4>Contact Number</h4>
                                                    <input
                                                        type="text"
                                                        value='09327854981'
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <h4>Address</h4>
                                            <input
                                                style={{ width: "95%" }}
                                                type="text"
                                                defaultValue="66 Washington Street Greenhills West 1500, San Juan City, Metro Manila, NCR"
                                                disabled
                                            />
                                        </div>
                                    )}
                                    {value === 1 && (
                                        <div className="flex-column tab">
                                            <div className="flex-row space-between">
                                                <div className="flex-column inputs">
                                                    <h4>Civil Status</h4>
                                                    <input
                                                        type="text"
                                                        defaultValue="civilStatus"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="flex-column inputs">
                                                    <h4>Educational Attainment</h4>
                                                    <input
                                                        type="text"
                                                        defaultValue="College Undergraduate"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex-row space-between">
                                                <div className="flex-column inputs">
                                                    <h4>Occupation</h4>
                                                    <input
                                                        type="text"
                                                        defaultValue="Input Last Name"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="flex-column inputs">
                                                    <h4>Monthly Income</h4>
                                                    <input
                                                        type="text"

                                                        defaultValue="Input First Name"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex-row space-between">
                                                <div className="flex-column inputs">
                                                    <h4>Member of  Social Security <br /> System (SSS)</h4>
                                                    <FormControl>
                                                        <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                            name="radio-buttons-group"
                                                            value={"Yes"}
                                                        >
                                                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" disabled />
                                                            <FormControlLabel value="No" control={<Radio />} label="No" disabled />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </div>
                                                <div className="flex-column inputs">
                                                    <h4>Member of Government Service <br /> Insurance System (GSIS)</h4>
                                                    <FormControl>
                                                        <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                            name="radio-buttons-group"
                                                            value={"Yes"}

                                                        >
                                                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" disabled />
                                                            <FormControlLabel value="No" control={<Radio />} label="No" disabled />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </div>
                                            </div>
                                            <div className="flex-row space-between">
                                                <div className="flex-column inputs">
                                                    <h4>Member of Pagtutulungan sa <br /> Kinabukasan (Pag-IBIG)</h4>
                                                    <FormControl>
                                                        <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                            name="radio-buttons-group"
                                                            value={"Yes"}

                                                        >
                                                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" disabled />
                                                            <FormControlLabel value="No" control={<Radio />} label="No" disabled />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </div>
                                                <div className="flex-column inputs">
                                                    <h4> Member of PhilHealth?</h4>
                                                    <FormControl>
                                                        <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                            name="radio-buttons-group"
                                                            value={"Yes"}
                                                        >
                                                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" disabled />
                                                            <FormControlLabel value="No" control={<Radio />} label="No" disabled />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {value === 2 && (
                                        <div className="flex-column tab">
                                            <ViewFamily list={residentData[0]} />
                                        </div>
                                    )}
                                </Box>
                            </Box>
                        </div>
                        <div className="rightAlign ModalButtons">
                            <button
                                className="borderedButton"
                                onClick={() => {
                                    props.setShown(false)
                                    document.getElementById("topBlur").className = "topbar flex-row";
                                    document.getElementById("sideBlur").className = "sidebar";
                                    document.getElementById("chat-container").className = "shell";
                                    setValue(0)
                                }}>
                                Exit
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default UpdateResident
