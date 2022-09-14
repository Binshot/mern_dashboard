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
import Upload from "../../NewImageFiles/Resident/UploadAvatar.svg"
import Avatar from "../../NewImageFiles/Resident/Avatar.svg"

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import format from 'date-fns/format';

function ViewUpdate(props) {
    const genderOptions = ['Male', 'Female', 'Other'];
    const religionOptions = ['Catholic', 'Christian', 'Muslim', 'Other'];
    const civilStatusOptions = ['Married', 'Single', 'Divorced', 'Widowed'];
    const educationAttainment = ['No Formal Education', 'Elementary', 'High School',
        'General Education Development', 'Vocational Qualificiation', 'Bachelor’s Degree',
        'Master’s Degree', 'Doctorate or Higher'];
    const familyMember = ['Father', 'Mother'];

    const [value, setValue] = React.useState(0);

    function handleTabChange(event, value) {
        setValue(value);
    }
    //Resident data input
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [role, setRole] = useState('')
    const [suffix, setSuffix] = useState('')
    const [bday, setBday] = useState('')
    const [birthplace, setBirthplace] = useState('')
    const [gender, setGender] = useState('')
    const [religion, setReligion] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [civilStatus, setCivilStatus] = useState('props.resident.')
    const [educationalAttainment, setEducationalAttainment] = useState('')
    const [occupation, setOccupation] = useState('')
    const [monthlyIncome, setMonthlyIncome] = useState('')
    const [sss, setSSS] = useState('')
    const [gsis, setGSIS] = useState('')
    const [pagibig, setPagibig] = useState('')
    const [philhealth, setPhilhealtg] = useState('')

    const handleSubmit = () => {
        props.setShown(false)
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
    return props.shown ? (
        <div className="FamModal">
            {/* <form onSubmit={handleSubmit}> */}
            <div className="residentModals modal-content">
                <div className='modalHeader'>
                    <h2 className="marginBottom">{props.action === "view" ? "View Family Member" : "Update Family Member"} </h2>
                    {xButton}
                </div>
                <div>
                    <div className="flex-column center">
                        <div className='profileAvatar' style={{ marginBottom: "24px" }}>
                            <img src={Avatar} alt="" />
                            {props.action !== "view" && (
                                <div className='uploadAvatar'>
                                    <label>
                                        <img src={Upload} alt="" style={{ cursor: "pointer" }} />
                                        <input type="file" />
                                    </label>
                                </div>
                            )}

                        </div>
                        <h4>{props.resident.lastName}, {props.resident.firstName} </h4>
                        <p>{props.relation}</p>
                    </div>

                    <Box sx={{ width: '100%', height: '338px', mb: 2, borderBottom: 1, borderColor: '#9C9C9C' }}>
                        <Box sx={{ borderBottom: 1, borderColor: '#9C9C9C' }}>
                            <Tabs value={value} onChange={handleTabChange}>
                                <Tab label="Personal Information" />
                                <Tab label="Background Information" />
                            </Tabs>
                        </Box>
                        <Box sx={{ height: '240px', overflow: 'auto', padding: "24px 0" }}>
                            {value === 0 && (
                                <div className="flex-column tab">
                                    <div className="flex-row space-between">
                                        <div className="flex-column inputs">
                                            <h4>Last Name</h4>
                                            <input
                                                type="text"
                                                defaultValue={props.resident.lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                disabled={props.action === "view" ? true : false}
                                            />
                                        </div>
                                        <div className="flex-column inputs">
                                            <h4>First Name</h4>
                                            <input
                                                type="text"
                                                defaultValue={props.resident.firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                disabled={props.action === "view" ? true : false}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-row space-between">
                                        <div className="flex-column inputs">
                                            <h4>Middle Name</h4>
                                            <input
                                                type="text"
                                                defaultValue={props.resident.middleName}
                                                onChange={(e) => setMiddleName(e.target.value)}
                                                disabled={props.action === "view" ? true : false}
                                            />
                                        </div>
                                        <div className="flex-column inputs">
                                            <h4>Suffix (If Applicable)</h4>
                                            <input
                                                type="text"
                                                defaultValue={props.resident.suffix}
                                                onChange={(e) => setSuffix(e.target.value)}
                                                disabled={props.action === "view" ? true : false}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-row space-between">
                                        <div className="flex-column inputs">
                                            <h4>Birthday</h4>
                                            {props.action === "view" ?
                                                <input
                                                    type="text"
                                                    defaultValue={format(new Date(props.resident.birthday), "MMMM dd, yyyy")}
                                                    disabled
                                                /> :
                                                <TextField
                                                    id="date"
                                                    type="date"
                                                    sx={{ width: 338 }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    defaultValue={props.resident.birthday}
                                                    onChange={(e) => setBday(e.target.value)}
                                                />
                                            }
                                        </div>
                                        <div className="flex-column inputs">
                                            <h4>Birth Place</h4>
                                            <input
                                                type="text"
                                                defaultValue={props.resident.birthplace}
                                                onChange={(e) => setBirthplace(e.target.value)}
                                                disabled={props.action === "view" ? true : false}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-row space-between">
                                        <div className="flex-column inputs">
                                            <h4>Gender</h4>
                                            {props.action === "view" ?
                                                <input
                                                    type="text"
                                                    defaultValue={props.resident.gender}
                                                    disabled
                                                /> :
                                                <Autocomplete
                                                    style={{ width: "99%" }}
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    defaultValue={props.resident.gender}
                                                    options={genderOptions}
                                                    sx={{ width: '100%' }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            }
                                        </div>
                                        <div className="flex-column inputs">
                                            <h4>Religion</h4>
                                            {props.action === "view" ?
                                                <input
                                                    type="text"
                                                    defaultValue={props.resident.religion}
                                                    disabled
                                                /> :
                                                <Autocomplete
                                                    style={{ width: "99%" }}
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    defaultValue={props.resident.religion}
                                                    options={religionOptions}
                                                    sx={{ width: '100%' }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            }
                                        </div>
                                    </div>
                                    <div className="flex-row space-between">
                                        <div className="flex-column inputs">
                                            <h4>Email Address</h4>
                                            <input
                                                type="text"
                                                defaultValue={props.resident.email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                disabled={props.action === "view" ? true : false}
                                            />
                                        </div>
                                        <div className="flex-column inputs">
                                            <h4>Contact Number</h4>
                                            <input
                                                type="text"
                                                defaultValue={props.resident.contactNumber}
                                                onChange={(e) => setPhone(e.target.value)}
                                                disabled={props.action === "view" ? true : false}
                                            />
                                        </div>
                                    </div>
                                    <h4>Address</h4>
                                    <input
                                        style={{ width: "95%" }}
                                        type="text"
                                        defaultValue={props.resident.address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        disabled={props.action === "view" ? true : false}
                                    />
                                </div>
                            )}
                            {value === 1 && (
                                <div className="flex-column tab">
                                    <div className="flex-row space-between">
                                        <div className="flex-column inputs">
                                            <h4>Civil Status</h4>
                                            {props.action === "view" ?
                                                <input
                                                    type="text"
                                                    defaultValue={props.resident.civilStatus}
                                                    disabled
                                                /> :
                                                <Autocomplete
                                                    style={{ width: "99%" }}
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    defaultValue={props.resident.civilStatus}
                                                    options={civilStatusOptions}
                                                    sx={{ width: '100%' }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            }
                                        </div>
                                        <div className="flex-column inputs">
                                            <h4>Educational Attainment</h4>
                                            {props.action === "view" ?
                                                <input
                                                    type="text"
                                                    defaultValue={props.resident.educationalAttainment}
                                                    disabled
                                                /> :
                                                <Autocomplete
                                                    style={{ width: "99%" }}
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    defaultValue={props.resident.educationalAttainment}
                                                    options={educationAttainment}
                                                    sx={{ width: '100%' }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            }
                                        </div>
                                    </div>
                                    <div className="flex-row space-between">
                                        <div className="flex-column inputs">
                                            <h4>Occupation</h4>
                                            <input
                                                type="text"
                                                defaultValue={props.resident.occupation}
                                                onChange={(e) => setOccupation(e.target.value)}
                                                disabled={props.action === "view" ? true : false}
                                            />
                                        </div>
                                        <div className="flex-column inputs">
                                            <h4>Monthly Income</h4>
                                            <input
                                                type="text"
                                                defaultValue={props.resident.monthlyIncome}
                                                onChange={(e) => setMonthlyIncome(e.target.value)}
                                                disabled={props.action === "view" ? true : false}
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
                                                    defaultValue={props.resident.membership.sss}
                                                >
                                                    <FormControlLabel value="true" control={<Radio />} label="Yes" disabled={props.action === "view" ? true : false} />
                                                    <FormControlLabel value="false" control={<Radio />} label="No" disabled={props.action === "view" ? true : false} />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                        <div className="flex-column inputs">
                                            <h4>Member of Government Service <br /> Insurance System (GSIS)</h4>
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    name="radio-buttons-group"
                                                    defaultValue={props.resident.membership.gsis}
                                                >
                                                    <FormControlLabel value="true" control={<Radio />} label="Yes" disabled={props.action === "view" ? true : false} />
                                                    <FormControlLabel value="false" control={<Radio />} label="No" disabled={props.action === "view" ? true : false} />
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
                                                    defaultValue={props.resident.membership.pagibig}
                                                >
                                                    <FormControlLabel value="true" control={<Radio />} label="Yes" disabled={props.action === "view" ? true : false} />
                                                    <FormControlLabel value="false" control={<Radio />} label="No" disabled={props.action === "view" ? true : false} />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                        <div className="flex-column inputs">
                                            <h4> Member of PhilHealth?</h4>
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    name="radio-buttons-group"
                                                    defaultValue={props.resident.membership.philhealth}
                                                >
                                                    <FormControlLabel value="true" control={<Radio />} label="Yes" disabled={props.action === "view" ? true : false} />
                                                    <FormControlLabel value="false" control={<Radio />} label="No" disabled={props.action === "view" ? true : false} />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Box>
                    </Box>
                </div>
                <div className="rightAlign ModalButtons">
                    {props.action !== "view" && (
                        <button
                            // type="submit"
                            className="solidButton buttonBlue"
                            onClick={() => {
                                props.setShown(false)
                                // document.getElementById("topBlur").className = "topbar flex-row";
                                // document.getElementById("sideBlur").className = "sidebar";
                                // document.getElementById("ResidentcontentBlur").className = "resident";
                                // document.getElementById("headerBlur").className = "header";
                                setValue(0)
                            }}>
                            Update
                        </button>
                    )}
                    <button
                        type="reset"
                        className="borderedButton"
                        onClick={() => {
                            props.setShown(false)
                            // document.getElementById("topBlur").className = "topbar flex-row";
                            // document.getElementById("sideBlur").className = "sidebar";
                            // document.getElementById("ResidentcontentBlur").className = "resident";
                            // document.getElementById("headerBlur").className = "header";
                            setValue(0)
                        }}>
                        {props.action === "view" ? "Exit" : "Cancel"}

                    </button>
                </div>
            </div>
            {/* </form> */}
        </div>
    ) : null;
}

export default ViewUpdate
