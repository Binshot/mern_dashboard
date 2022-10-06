import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Tabs } from '@mui/material';
import Upload from "../../NewImageFiles/Resident/UploadAvatar.svg"
import Avatar from "../../NewImageFiles/Resident/Avatar.svg"
import ViewFamily from "../ViewFamilyInformation"

//FOR SNACKBAR
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

import format from 'date-fns/format';

function UpdateResident(props) {
    // for tabs
    const [value, setValue] = useState(0);
    function handleTabChange(event, value) {
        setValue(value);
    }

    const xButton = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                    props.setShown(false)
                }}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )
    return (
        <div>
            {props.shown ? (
                <div className="modal-backdrop">
                    <div className="residentModals modal-content">
                        <div className='modalHeader'>
                            <h2 className="marginBottom"> View Head of the Family</h2>
                            {xButton}
                        </div>
                        <div>
                            <div className="flex-column center">
                                <div className='profileAvatar' style={{ marginBottom: "24px" }}>
                                    <img src={Avatar} alt="" />
                                </div>
                                <h4>{props.resident.lastName}, {props.resident.firstName} {props.resident.middleName}</h4>
                                <p>Head of the Family</p>
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
                                                        value={props.resident.lastName}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="flex-column inputs">
                                                    <h4>First Name</h4><input
                                                        value={props.resident.firstName}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex-row space-between">
                                                <div className="flex-column inputs">
                                                    <h4>Middle Name</h4><input
                                                        value={props.resident.middleName}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="flex-column inputs">
                                                    <h4>Suffix (If Applicable)</h4>
                                                    <input
                                                        value={props.resident.suffix}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex-row space-between">
                                                <div className="flex-column inputs">
                                                    <h4>Birthday</h4>
                                                    <input
                                                        value={format(new Date(props.resident.birthday), "MMMM dd, yyyy")}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="flex-column inputs">
                                                    <h4>Birth Place</h4>
                                                    <input
                                                        value={props.resident.birthPlace}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex-row space-between">
                                                <div className="flex-column inputs">
                                                    <h4>Gender</h4>
                                                    <input
                                                        value={props.resident.gender}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="flex-column inputs">
                                                    <h4>Religion</h4>

                                                    <input
                                                        value={props.resident.religion}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex-row space-between">
                                                <div className="flex-column inputs">
                                                    <h4>Email Address</h4>

                                                    <input
                                                        value={props.resident.email}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="flex-column inputs">
                                                    <h4>Contact Number</h4>

                                                    <input
                                                        value={props.resident.contactNumber}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <h4>Address</h4>
                                            <input
                                                value={props.resident.address}
                                                disabled
                                                style={{ width: "95%" }}
                                            />
                                        </div>
                                    )}
                                    {value === 1 && (
                                        <div className="flex-column tab">
                                            <div className="flex-row space-between">
                                                <div className="flex-column inputs">
                                                    <h4>Civil Status</h4>
                                                    <input
                                                        value={props.resident.civilStatus}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="flex-column inputs">
                                                    <h4>Educational Attainment</h4>
                                                    <input
                                                        value={props.resident.educationalAttainment}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex-row space-between">
                                                <div className="flex-column inputs">
                                                    <h4>Occupation</h4>
                                                    <input
                                                        value={props.resident.occupation}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="flex-column inputs">
                                                    <h4>Monthly Income</h4>
                                                    <input
                                                        value={props.resident.monthlyIncome}
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
                                                            value={props.resident.membership.sss}
                                                            onChange={(e) => setSSS(e.target.value)}
                                                        >
                                                            <FormControlLabel value="true" control={<Radio />} label="Yes" disabled />
                                                            <FormControlLabel value="false" control={<Radio />} label="No" disabled />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </div>
                                                <div className="flex-column inputs">
                                                    <h4>Member of Government Service <br /> Insurance System (GSIS)</h4>
                                                    <FormControl>
                                                        <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                            name="radio-buttons-group"
                                                            value={props.resident.membership.gsis}
                                                            onChange={(e) => setGSIS(e.target.value)}
                                                        >
                                                            <FormControlLabel value="true" control={<Radio />} label="Yes" disabled />
                                                            <FormControlLabel value="false" control={<Radio />} label="No" disabled />
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
                                                            value={props.resident.membership.pagibig}
                                                            onChange={(e) => setPagibig(e.target.value)}
                                                        >
                                                            <FormControlLabel value="true" control={<Radio />} label="Yes" disabled />
                                                            <FormControlLabel value="false" control={<Radio />} label="No" disabled />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </div>
                                                <div className="flex-column inputs">
                                                    <h4> Member of PhilHealth?</h4>
                                                    <FormControl>
                                                        <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                            name="radio-buttons-group"
                                                            value={props.resident.membership.philhealth}
                                                            onChange={(e) => setPhilhealth(e.target.value)}
                                                        >
                                                            <FormControlLabel value="true" control={<Radio />} label="Yes" disabled />
                                                            <FormControlLabel value="false" control={<Radio />} label="No" disabled />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {value === 2 && (
                                        <div className="flex-column tab">
                                            <ViewFamily
                                                list={props.allResidents.filter(head => head.headOfFamily_id == props.resident._id)}
                                                familyHead={props.resident}
                                            />
                                        </div>
                                    )}
                                </Box>
                            </Box>
                        </div>
                        <div className="rightAlign ModalButtons">
                            <button
                                type="button"
                                className="borderedButton"
                                onClick={() => {
                                    props.setShown(false)
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
