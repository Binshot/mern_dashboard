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
import Upload from "../NewImageFiles/Resident/UploadAvatar.svg"
import Avatar from "../NewImageFiles/Resident/Avatar.svg"
import ViewFamily from "./ViewFamilyInformation"

//FOR SNACKBAR
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

function UpdateResident(props) {
    let residentData = props.resident

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

    //FOR SNACKBAR
    const [snackbar, toggleSnackbar] = useState(false);
    const action = (
        <React.Fragment>
            <Button size="small"
                onClick={() => {
                    toggleSnackbar(false)
                }}>
                <p style={{ color: "white", margin: 0 }}>Undo</p>
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                    toggleSnackbar(false)
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    //Resident data input
    const [lastName, setLastName] = useState(residentData.name.lastName)
    const [firstName, setFirstName] = useState(residentData.name.firstName)
    const [middleName, setMiddleName] = useState(residentData.name.middleName)
    const [role, setRole] = useState(residentData.role)
    const [suffix, setSuffix] = useState(residentData.suffix)
    const [birthday, setBday] = useState(residentData.birthday)
    const [birthPlace, setBirthplace] = useState(residentData.birthPlace)
    const [gender, setGender] = useState(residentData.gender)
    const [religion, setReligion] = useState(residentData.religion)
    const [email, setEmail] = useState(residentData.email)
    const [phone, setPhone] = useState(residentData.phone)
    const [address, setAddress] = useState(residentData.address)
    const [civilStatus, setCivilStatus] = useState('residentData.')
    const [educationalAttainment, setEducationalAttainment] = useState(residentData.educationalAttainment)
    const [occupation, setOccupation] = useState(residentData.occupation)
    const [monthlyIncome, setMonthlyIncome] = useState(residentData.monthlyIncome)
    const [sss, setSSS] = useState(residentData.govermentMemberships.sss)
    const [gsis, setGSIS] = useState(residentData.govermentMemberships.gsis)
    const [pagibig, setPagibig] = useState(residentData.govermentMemberships.pagibig)
    const [philhealth, setPhilhealth] = useState(residentData.govermentMemberships.philHealth)

    const handleSubmit = () => {
        props.setShown(false)
        props.snackbar(true)
        toggleSnackbar(true)
        document.getElementById("topBlur").className = "topbar flex-row";
        document.getElementById("sideBlur").className = "sidebar";
        document.getElementById("ResidentcontentBlur").className = "resident";
        document.getElementById("headerBlur").className = "header";
        setValue(0)
        props.returnID(null)

        residentData.name.lastName = lastName
        residentData.name.firstName = firstName
        residentData.name.middleName = middleName
        residentData.role = role
        residentData.suffix = suffix
        residentData.birthday = birthday
        residentData.birthPlace = birthPlace
        residentData.gender = gender
        residentData.religion = religion
        residentData.email = email
        residentData.phone = phone
        residentData.address = address
        residentData.civilStatus = civilStatus
        residentData.educationalAttainment = educationalAttainment
        residentData.occupation = occupation
        residentData.monthlyIncome = monthlyIncome
        residentData.govermentMemberships.sss = sss
        residentData.govermentMemberships.gsis = gsis
        residentData.govermentMemberships.pagibig = pagibig
        residentData.govermentMemberships.philHealth = philhealth

    }

    let setSelectedGender = genderOptions.findIndex(sex => sex === residentData.gender)
    let setSelectedReligion = religionOptions.findIndex(rel => rel === residentData.religion)
    let setSelectedStatus = civilStatusOptions.findIndex(stat => stat === residentData.civilStatus)
    let setSelectedEducation = educationAttainment.findIndex(educ => educ === residentData.educationAttainment)
    let setSelectedRole = familyMember.findIndex(role => role === residentData.role)

    return (
        <div>

            {props.shown ? (
                <div className="modal-backdrop">

                    <form onSubmit={handleSubmit}>
                        <div className="residentModals modal-content">
                            <h2 className="marginBottom">{props.action === "view" ? "View Head of the Family" : "Update Head of the Family"} </h2>
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
                                    <h4>{lastName}, {firstName} {middleName}</h4>
                                    <p>{residentData.role}</p>
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
                                                            required
                                                            placeholder="Input last Name"
                                                            value={lastName}
                                                            onChange={(e) => setLastName(e.target.value)}
                                                            disabled={props.action === "view" ? true : false}
                                                        />
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>First Name</h4>
                                                        <input
                                                            type="text"
                                                            required
                                                            placeholder="Input First Name"
                                                            value={firstName}
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
                                                            required
                                                            value={middleName}
                                                            onChange={(e) => setMiddleName(e.target.value)}
                                                            disabled={props.action === "view" ? true : false}
                                                        />
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Suffix (If Applicable)</h4>
                                                        <input
                                                            type="text"
                                                            placeholder="Input Suffix"
                                                            value={suffix}
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
                                                                required
                                                                value={birthday}
                                                                disabled
                                                            /> :
                                                            <TextField
                                                                id="date"
                                                                type="date"
                                                                placeholder="Choose Birthday"
                                                                sx={{ width: 338 }}
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                value={birthday}
                                                                onChange={(e) => setBday(e.target.value)}
                                                                required
                                                            />
                                                        }
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Birth Place</h4>
                                                        <input
                                                            type="text"
                                                            required
                                                            placeholder="Input Birth Place"
                                                            value={birthPlace}
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
                                                                required
                                                                value={gender}
                                                                disabled
                                                            /> :
                                                            <Autocomplete
                                                                style={{ width: "99%" }}
                                                                disablePortal
                                                                id="combo-box-demo"
                                                                value={genderOptions[setSelectedGender]}
                                                                options={genderOptions}
                                                                sx={{ width: '100%' }}
                                                                renderInput={(params) => <TextField {...params} />}
                                                                onChange={(e, newValue) => setGender(newValue)}
                                                                required
                                                            />
                                                        }
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Religion</h4>
                                                        {props.action === "view" ?
                                                            <input
                                                                type="text"
                                                                required
                                                                value={religion}
                                                                disabled
                                                            /> :
                                                            <Autocomplete
                                                                style={{ width: "99%" }}
                                                                disablePortal
                                                                id="combo-box-demo"
                                                                value={religionOptions[setSelectedReligion]}
                                                                options={religionOptions}
                                                                sx={{ width: '100%' }}
                                                                renderInput={(params) => <TextField {...params} placeholder="Choose Religion" />}
                                                                onChange={(e, newValue) => setReligion(newValue)}
                                                                required
                                                            />
                                                        }
                                                    </div>
                                                </div>
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Email Address</h4>
                                                        <input
                                                            type="text"
                                                            required
                                                            placeholder="Input Email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            disabled={props.action === "view" ? true : false}
                                                        />
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Contact Number</h4>
                                                        <input
                                                            type="text"
                                                            required
                                                            placeholder="Input Contact Number"
                                                            value={phone}
                                                            onChange={(e) => setPhone(e.target.value)}
                                                            disabled={props.action === "view" ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                                <h4>Address</h4>
                                                <input
                                                    style={{ width: "95%" }}
                                                    type="text"
                                                    required
                                                    placeholder="Input Address"
                                                    value={address}
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
                                                                required
                                                                value="civilStatus"
                                                                disabled
                                                            /> :
                                                            <Autocomplete
                                                                style={{ width: "99%" }}
                                                                disablePortal
                                                                id="combo-box-demo"
                                                                value={civilStatusOptions[setSelectedStatus]}
                                                                options={civilStatusOptions}
                                                                sx={{ width: '100%' }}
                                                                renderInput={(params) => <TextField {...params} placeholder="Choose Civil Status" />}
                                                                onChange={(e, newValue) => setCivilStatus(newValue)}
                                                                required
                                                            />
                                                        }
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Educational Attainment</h4>
                                                        {props.action === "view" ?
                                                            <input
                                                                type="text"
                                                                required
                                                                value={educationAttainment}
                                                                disabled
                                                            /> :
                                                            <Autocomplete
                                                                style={{ width: "99%" }}
                                                                disablePortal
                                                                id="combo-box-demo"
                                                                value={educationAttainment[setSelectedEducation]}
                                                                options={educationAttainment}
                                                                sx={{ width: '100%' }}
                                                                renderInput={(params) => <TextField {...params} placeholder="Choose Educational Background" />}
                                                                onChange={(e, newValue) => setEducationalAttainment(newValue)}
                                                                required
                                                            />
                                                        }
                                                    </div>
                                                </div>
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Occupation</h4>
                                                        <input
                                                            type="text"
                                                            required
                                                            placeholder="Input Last Name"
                                                            value={occupation}
                                                            onChange={(e) => setOccupation(e.target.value)}
                                                            disabled={props.action === "view" ? true : false}
                                                        />
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Monthly Income</h4>
                                                        <input
                                                            type="text"
                                                            required
                                                            placeholder="Input First Name"
                                                            value={monthlyIncome}
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
                                                                value={sss}
                                                                onChange={(e) => setSSS(e.target.value)}
                                                                required
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
                                                                value={gsis}
                                                                onChange={(e) => setGSIS(e.target.value)}
                                                                required
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
                                                                value={pagibig}
                                                                onChange={(e) => setPagibig(e.target.value)}
                                                                required
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
                                                                value={philhealth}
                                                                onChange={(e) => setPhilhealth(e.target.value)}
                                                                required
                                                            >
                                                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" disabled={props.action === "view" ? true : false} />
                                                                <FormControlLabel value="No" control={<Radio />} label="No" disabled={props.action === "view" ? true : false} />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {value === 2 && (
                                            <div className="flex-column tab">
                                                {props.action === "view" ?
                                                    <ViewFamily list={residentData} /> :
                                                    <div className="flex-row space-between">
                                                        <div className="flex-column inputs">
                                                            <h4>Family Member</h4>
                                                            <Autocomplete
                                                                style={{ width: "99%" }}
                                                                disablePortal
                                                                id="combo-box-demo"
                                                                value={familyMember[setSelectedRole]}
                                                                options={familyMember}
                                                                sx={{ width: '100%' }}
                                                                renderInput={(params) => <TextField {...params} placeholder="Choose Kind of Family Member" />}
                                                                onChange={(e, newValue) => setRole(newValue)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                }
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
                                        document.getElementById("topBlur").className = "topbar flex-row";
                                        document.getElementById("sideBlur").className = "sidebar";
                                        document.getElementById("ResidentcontentBlur").className = "resident";
                                        document.getElementById("headerBlur").className = "header";
                                        setValue(0)
                                        props.returnID(null)
                                        toggleSnackbar(true)
                                    }}>
                                    {props.action === "view" ? "Exit" : "Cancel"}

                                </button>
                                {props.action !== "view" && (
                                    <button
                                        type="submit"
                                        className="solidButton buttonBlue">
                                        Update
                                    </button>
                                )}

                            </div>
                        </div>
                    </form>
                </div>
            ) : null}
        </div>
    )
}

export default UpdateResident
