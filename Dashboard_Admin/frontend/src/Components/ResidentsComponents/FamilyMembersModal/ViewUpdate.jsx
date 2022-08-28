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

function ViewUpdate(props) {
    // console.log(props.resident[props.id])
    let residentData = props.resident
    // console.log(residentData)
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
    const [civilStatus, setCivilStatus] = useState('residentData.')
    const [educationalAttainment, setEducationalAttainment] = useState('')
    const [occupation, setOccupation] = useState('')
    const [monthlyIncome, setMonthlyIncome] = useState('')
    const [sss, setSSS] = useState('')
    const [gsis, setGSIS] = useState('')
    const [pagibig, setPagibig] = useState('')
    const [philhealth, setPhilhealtg] = useState('')

    const handleSubmit = () => {
        // const date = { startDate, endDate }
        // const time = { startTime, endTime }
        // const event = { title, description, tag, location, date, time }
        // console.log(event)

        props.setShown(false)
        // document.getElementById("topBlur").className = "topbar flex-row";
        // document.getElementById("sideBlur").className = "sidebar";
        // document.getElementById("ResidentcontentBlur").className = "resident";
        // document.getElementById("headerBlur").className = "header";
        // setValue(0)

        //insert data to json file
        // fetch('http://localhost:8003/Events', {
        //     method: 'POST',
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(event)
        // }).then(() => {
        //     toggleSnackbar(true)
        //     console.log('new announcement added');
        //     window.location.reload(false);
        // })
    }

    let setSelectedGender = genderOptions.findIndex(sex => sex === residentData.gender)
    let setSelectedReligion = religionOptions.findIndex(rel => rel === residentData.religion)
    let setSelectedStatus = civilStatusOptions.findIndex(stat => stat === residentData.civilStatus)
    let setSelectedEducation = educationAttainment.findIndex(educ => educ === residentData.educationAttainment)
    let setSelectedRole = familyMember.findIndex(role => role === residentData.role)

    return props.shown ? (
        <div className="FamModal">
            {/* <form onSubmit={handleSubmit}> */}
            <div className="residentModals modal-content">
                <h2 className="marginBottom">{props.action === "view" ? "View Family Member" : "Update Family Member"} </h2>
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
                        <h4>Name</h4>
                        <p>Family Role</p>
                    </div>

                    <Box sx={{ width: '100%', height: '350px', mb: 2, borderBottom: 1, borderColor: '#9C9C9C' }}>
                        <Box sx={{ borderBottom: 1, borderColor: '#9C9C9C' }}>
                            <Tabs value={value} onChange={handleTabChange}>
                                <Tab label="Personal Information" />
                                <Tab label="Background Information" />
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
                                                // defaultValue={residentData.name.lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                disabled={props.action === "view" ? true : false}
                                            />
                                        </div>
                                        <div className="flex-column inputs">
                                            <h4>First Name</h4>
                                            <input
                                                type="text"
                                                // defaultValue={residentData.name.firstName}
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
                                                // defaultValue={residentData.name.middleName}
                                                onChange={(e) => setMiddleName(e.target.value)}
                                                disabled={props.action === "view" ? true : false}
                                            />
                                        </div>
                                        <div className="flex-column inputs">
                                            <h4>Suffix (If Applicable)</h4>
                                            <input
                                                type="text"
                                                // defaultValue={suffix}
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
                                                    // defaultValue={residentData.birthday}
                                                    disabled
                                                /> :
                                                <TextField
                                                    id="date"
                                                    type="date"
                                                    sx={{ width: 338 }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    // defaultValue={residentData.birthday}
                                                    onChange={(e) => setBday(e.target.value)}
                                                />
                                            }
                                        </div>
                                        <div className="flex-column inputs">
                                            <h4>Birth Place</h4>
                                            <input
                                                type="text"
                                                // defaultValue={residentData.birthPlace}
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
                                                    // defaultValue={residentData.gender}
                                                    disabled
                                                /> :
                                                <Autocomplete
                                                    style={{ width: "99%" }}
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    // defaultValue={genderOptions[setSelectedGender]}
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
                                                    // defaultValue={residentData.religion}
                                                    disabled
                                                /> :
                                                <Autocomplete
                                                    style={{ width: "99%" }}
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    // defaultValue={religionOptions[setSelectedReligion]}
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
                                                // defaultValue={residentData.email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                disabled={props.action === "view" ? true : false}
                                            />
                                        </div>
                                        <div className="flex-column inputs">
                                            <h4>Contact Number</h4>
                                            <input
                                                type="text"
                                                // defaultValue={residentData.phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                disabled={props.action === "view" ? true : false}
                                            />
                                        </div>
                                    </div>
                                    <h4>Address</h4>
                                    <input
                                        style={{ width: "95%" }}
                                        type="text"
                                        // defaultValue={residentData.address}
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
                                                    // defaultValue="civilStatus"
                                                    disabled
                                                /> :
                                                <Autocomplete
                                                    style={{ width: "99%" }}
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    // defaultValue={civilStatusOptions[setSelectedStatus]}
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
                                                    // defaultValue={residentData.educationAttainment}
                                                    disabled
                                                /> :
                                                <Autocomplete
                                                    style={{ width: "99%" }}
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    // defaultValue={educationAttainment[setSelectedEducation]}
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
                                                // defaultValue={residentData.occupation}
                                                onChange={(e) => setOccupation(e.target.value)}
                                                disabled={props.action === "view" ? true : false}
                                            />
                                        </div>
                                        <div className="flex-column inputs">
                                            <h4>Monthly Income</h4>
                                            <input
                                                type="text"
                                                // defaultValue={residentData.monthlyIncome}
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
                                                // defaultValue={residentData.govermentMemberships.sss}
                                                >
                                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" disabled={props.action === "view" ? true : false} />
                                                    <FormControlLabel value="No" control={<Radio />} label="No" disabled={props.action === "view" ? true : false} />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                        <div className="flex-column inputs">
                                            <h4>Member of Government Service <br /> Insurance System (GSIS)</h4>
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    name="radio-buttons-group"
                                                // defaultValue={residentData.govermentMemberships.gsis}
                                                >
                                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" disabled={props.action === "view" ? true : false} />
                                                    <FormControlLabel value="No" control={<Radio />} label="No" disabled={props.action === "view" ? true : false} />
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
                                                // defaultValue={residentData.govermentMemberships.pagibig}
                                                >
                                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" disabled={props.action === "view" ? true : false} />
                                                    <FormControlLabel value="No" control={<Radio />} label="No" disabled={props.action === "view" ? true : false} />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                        <div className="flex-column inputs">
                                            <h4> Member of PhilHealth?</h4>
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    name="radio-buttons-group"
                                                // defaultValue={residentData.govermentMemberships.philHealth}
                                                >
                                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" disabled={props.action === "view" ? true : false} />
                                                    <FormControlLabel value="No" control={<Radio />} label="No" disabled={props.action === "view" ? true : false} />
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

                </div>
            </div>
            {/* </form> */}
        </div>
    ) : null;
}

export default ViewUpdate
