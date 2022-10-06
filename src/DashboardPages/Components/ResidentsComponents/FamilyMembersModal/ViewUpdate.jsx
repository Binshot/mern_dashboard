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
import Modal from '../../CommonComponents/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import format from 'date-fns/format';

import { useResidentContext } from "../../../hooks/userResidentContext"

function ViewUpdate(props) {
    const { dispatch } = useResidentContext()

    const [loading, setLoading] = useState(false)

    const genderOptions = ['Male', 'Female'];
    const religionOptions = ['Catholic', 'Christian', 'Muslim', 'Other'];
    const civilStatusOptions = ['Married', 'Single', 'Divorced', 'Widowed'];
    const educationAttainment = ['No Formal Education', 'Elementary', 'High School',
        'General Education Development', 'Vocational Qualificiation', 'Bachelor’s Degree',
        'Master’s Degree', 'Doctorate or Higher'];
    const familyMember = ['Father', 'Mother', 'Husband', 'Wife', 'Son', 'Daughter',];

    const [value, setValue] = React.useState(0);

    function handleTabChange(event, value) {
        setValue(value);
    }
    //Resident data input
    const [lastName, setLastName] = useState(props.resident.lastName)
    const [firstName, setFirstName] = useState(props.resident.firstName)
    const [middleName, setMiddleName] = useState(props.resident.middleName)
    const [relationship, setRelationship] = useState(props.relation)
    const [suffix, setSuffix] = useState(props.resident.suffix)
    const [bday, setBday] = useState(props.resident.birthday)
    const [birthplace, setBirthplace] = useState(props.resident.birthplace)
    const [gender, setGender] = useState(props.resident.gender)
    const [religion, setReligion] = useState(props.resident.religion)
    const [email, setEmail] = useState(props.resident.email)
    const [phone, setPhone] = useState(props.resident.contactNumber)
    const [address, setAddress] = useState(props.resident.address)
    const [civilStatus, setCivilStatus] = useState(props.resident.civilStatus)
    const [educationalAttainment, setEducationalAttainment] = useState(props.resident.educationalAttainment)
    const [occupation, setOccupation] = useState(props.resident.occupation)
    const [monthlyIncome, setMonthlyIncome] = useState(props.resident.monthlyIncome)
    const [sss, setSSS] = useState(props.resident.membership.sss)
    const [gsis, setGSIS] = useState(props.resident.membership.gsis)
    const [pagibig, setPagibig] = useState(props.resident.membership.pagibig)
    const [philhealth, setPhilhealth] = useState(props.resident.membership.philhealth)
    const [cancelModal, setCancelModal] = useState(false)
    const [changed, setChanged] = useState(false)

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        const response = await fetch('https://drims-demo.herokuapp.com/api/residents/'
            + props.resident._id, {
            method: 'PATCH',
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                middleName: middleName,
                suffix: suffix,
                birthday: bday,
                birthplace: birthplace,
                gender: gender,
                religion: religion,
                email: email,
                contactNumber: phone,
                address: address,
                civilStatus: civilStatus,
                educationalAttainment: educationalAttainment,
                occupation: occupation,
                monthlyIncome: monthlyIncome,
                membership: {
                    pagibig: pagibig,
                    sss: sss,
                    gsis: gsis,
                    philhealth: philhealth
                },
                relationship: relationship
            }),
            headers: {
                'Content-Type': 'application/json'
            }

        })

        const json = await response.json()

        if (response.ok) {
            setLoading(false)
            dispatch({ type: 'UPDATE_RESIDENT_MEMBER', payload: json })
            props.setShown(false)
            props.snackbar(true)
            props.name(lastName + ", " + firstName)
            setValue(0)

            // update family member
            const activity = "Updated a resident: " + props.lastName + ", " + props.firstName
            const content = { activity }
            fetch('https://drims-demo.herokuapp.com/api/activity/', {
                method: 'POST',
                body: JSON.stringify(content),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            setLoading(false)
        }
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
            {/* cancel modal */}
            <Modal
                shown={cancelModal}
                close={() => {
                    setCancelModal(false)
                }}>
                <div className="deleteModals">
                    <div className='modalHeader'>
                        <h2>Cancel Changes?</h2>
                        {xButton}
                    </div>
                    <div>
                        <p>
                            You have made changes that haven’t been saved yet. Do you still want to quit?
                        </p>
                    </div>
                    <div className="rightAlign ModalButtons">
                        <button
                            className="solidButton buttonRed"
                            onClick={() => {
                                setCancelModal(false)
                                props.setShown(false)
                                // cancelForm()
                            }}>
                            Yes
                        </button>
                        <button
                            className="borderedButton"
                            onClick={() => setCancelModal(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
            <form onSubmit={handleSubmit}>
                <div className="residentModals modal-content">
                    <div className='modalHeader'>
                        <h2 className="marginBottom">{props.action === "view" ? "View Family Member" : "Update Family Member"} </h2>
                        {xButton}
                    </div>
                    <div>
                        <div className="flex-column center">
                            <div className='profileAvatar' style={{ marginBottom: "24px" }}>
                                <img src={Avatar} alt="" />
                            </div>
                            <h4>{lastName}, {firstName} </h4>
                            <p>{relationship}</p>
                        </div>

                        <Box sx={{ width: '100%', height: '338px', mb: 2, borderBottom: 1, borderColor: '#9C9C9C' }}>
                            <Box sx={{ borderBottom: 1, borderColor: '#9C9C9C' }}>
                                <Tabs value={value} onChange={handleTabChange}>
                                    <Tab label="Personal Information" />
                                    <Tab label="Background Information" />
                                    <Tab label="Family Information" />
                                </Tabs>
                            </Box>
                            <Box sx={{ height: '240px', overflow: 'auto', padding: "24px 0" }}>
                                {value === 0 && (
                                    <div className="flex-column tab">
                                        <div className="flex-row space-between">
                                            <div className="flex-column inputs">
                                                <h4>Last Name</h4>
                                                {props.action === "view" ?
                                                    <input
                                                        value={lastName}
                                                        disabled
                                                    /> :
                                                    <TextField
                                                        name='lastName'
                                                        value={lastName}
                                                        onChange={(e) => {
                                                            setLastName(e.target.value)
                                                            setChanged(true)
                                                        }}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root:hover": {
                                                                "& > fieldset": {
                                                                    borderColor: "#7175F4"
                                                                }
                                                            }
                                                        }}
                                                    />
                                                }
                                            </div>
                                            <div className="flex-column inputs">
                                                <h4>First Name</h4>
                                                {props.action === "view" ?
                                                    <input
                                                        value={firstName}
                                                        disabled
                                                    /> :
                                                    <TextField
                                                        value={firstName}
                                                        onChange={(e) => {
                                                            setFirstName(e.target.value)
                                                            setChanged(true)
                                                        }}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root:hover": {
                                                                "& > fieldset": {
                                                                    borderColor: "#7175F4"
                                                                }
                                                            }
                                                        }}
                                                    />
                                                }
                                            </div>
                                        </div>
                                        <div className="flex-row space-between">
                                            <div className="flex-column inputs">
                                                <h4>Middle Name</h4>
                                                {props.action === "view" ?
                                                    <input
                                                        value={middleName}
                                                        disabled
                                                    /> :
                                                    <TextField
                                                        value={middleName}
                                                        onChange={(e) => {
                                                            setMiddleName(e.target.value)
                                                            setChanged(true)
                                                        }}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root:hover": {
                                                                "& > fieldset": {
                                                                    borderColor: "#7175F4"
                                                                }
                                                            }
                                                        }}
                                                    />
                                                }
                                            </div>
                                            <div className="flex-column inputs">
                                                <h4>Suffix (If Applicable)</h4>
                                                {props.action === "view" ?
                                                    <input
                                                        value={suffix}
                                                        disabled
                                                    /> :
                                                    <TextField
                                                        placeholder="Input Suffix"
                                                        value={suffix}
                                                        onChange={(e) => {
                                                            setSuffix(e.target.value)
                                                            setChanged(true)
                                                        }}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root:hover": {
                                                                "& > fieldset": {
                                                                    borderColor: "#7175F4"
                                                                }
                                                            }
                                                        }}
                                                    />
                                                }
                                            </div>
                                        </div>
                                        <div className="flex-row space-between">
                                            <div className="flex-column inputs">
                                                <h4>Birthday</h4>
                                                {props.action === "view" ?
                                                    <input
                                                        value={format(new Date(bday), "MMMM dd, yyyy")}
                                                        disabled
                                                    /> :
                                                    <TextField
                                                        id="date"
                                                        type="date"
                                                        value={bday}
                                                        onChange={(e) => {
                                                            setBday(e.target.value)
                                                            setChanged(true)
                                                        }}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root:hover": {
                                                                "& > fieldset": {
                                                                    borderColor: "#7175F4"
                                                                }
                                                            }
                                                        }}
                                                    />
                                                }
                                            </div>
                                            <div className="flex-column inputs">
                                                <h4>Birth Place</h4>
                                                {props.action === "view" ?
                                                    <input
                                                        value={birthplace}
                                                        disabled
                                                    /> :
                                                    <TextField
                                                        value={birthplace}
                                                        onChange={(e) => {
                                                            setBirthplace(e.target.value)
                                                            setChanged(true)
                                                        }}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root:hover": {
                                                                "& > fieldset": {
                                                                    borderColor: "#7175F4"
                                                                }
                                                            }
                                                        }}
                                                    />
                                                }
                                            </div>
                                        </div>
                                        <div className="flex-row space-between">
                                            <div className="flex-column inputs">
                                                <h4>Gender</h4>
                                                {props.action === "view" ?
                                                    <input
                                                        value={gender}
                                                        disabled
                                                    /> :
                                                    <Autocomplete
                                                        style={{ width: "99%" }}
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        value={gender}
                                                        options={genderOptions}
                                                        renderInput={(params) => <TextField {...params} />}
                                                        onChange={(e, newValue) => {
                                                            setGender(newValue)
                                                            setChanged(true)
                                                        }}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root:hover": {
                                                                "& > fieldset": {
                                                                    borderColor: "#7175F4"
                                                                }
                                                            }
                                                        }}
                                                    />
                                                }
                                            </div>
                                            <div className="flex-column inputs">
                                                <h4>Religion</h4>
                                                {props.action === "view" ?
                                                    <input
                                                        value={religion}
                                                        disabled
                                                    /> :
                                                    <Autocomplete
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        value={religion}
                                                        options={religionOptions}
                                                        renderInput={(params) => <TextField {...params} placeholder="Choose Religion" />}
                                                        onChange={(e, newValue) => {
                                                            setReligion(newValue)
                                                            setChanged(true)
                                                        }}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root:hover": {
                                                                "& > fieldset": {
                                                                    borderColor: "#7175F4"
                                                                }
                                                            }
                                                        }}
                                                    />
                                                }
                                            </div>
                                        </div>
                                        <div className="flex-row space-between">
                                            <div className="flex-column inputs">
                                                <h4>Email Address</h4>
                                                {props.action === "view" ?
                                                    <input
                                                        value={email}
                                                        disabled
                                                    /> :
                                                    <TextField
                                                        placeholder="Input Email"
                                                        value={email}
                                                        onChange={(e) => {
                                                            setEmail(e.target.value)
                                                            setChanged(true)
                                                        }}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root:hover": {
                                                                "& > fieldset": {
                                                                    borderColor: "#7175F4"
                                                                }
                                                            }
                                                        }}
                                                    />
                                                }
                                            </div>
                                            <div className="flex-column inputs">
                                                <h4>Contact Number</h4>
                                                {props.action === "view" ?
                                                    <input
                                                        value={phone}
                                                        disabled
                                                    /> :
                                                    <TextField
                                                        value={phone}
                                                        onChange={(e) => {
                                                            setPhone(e.target.value)
                                                            setChanged(true)
                                                        }}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root:hover": {
                                                                "& > fieldset": {
                                                                    borderColor: "#7175F4"
                                                                }
                                                            }
                                                        }}
                                                    />
                                                }
                                            </div>
                                        </div>
                                        <h4>Address</h4>
                                        {props.action === "view" ?
                                            <input
                                                value={firstName}
                                                disabled
                                                style={{ width: "95%" }}
                                            /> :
                                            <TextField
                                                value={address}
                                                onChange={(e) => {
                                                    setAddress(e.target.value)
                                                    setChanged(true)
                                                }}
                                                sx={{
                                                    "& .MuiOutlinedInput-root:hover": {
                                                        "& > fieldset": {
                                                            borderColor: "#7175F4"
                                                        }
                                                    }
                                                }}
                                            />
                                        }
                                    </div>
                                )}
                                {value === 1 && (
                                    <div className="flex-column tab">
                                        <div className="flex-row space-between">
                                            <div className="flex-column inputs">
                                                <h4>Civil Status</h4>
                                                {props.action === "view" ?
                                                    <input
                                                        value={civilStatus}
                                                        disabled
                                                    /> :
                                                    <Autocomplete
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        value={civilStatus}
                                                        options={civilStatusOptions}
                                                        renderInput={(params) => <TextField {...params} placeholder="Choose Civil Status" />}
                                                        onChange={(e, newValue) => {
                                                            setCivilStatus(newValue)
                                                            setChanged(true)
                                                        }}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root:hover": {
                                                                "& > fieldset": {
                                                                    borderColor: "#7175F4"
                                                                }
                                                            }
                                                        }}
                                                    />
                                                }
                                            </div>
                                            <div className="flex-column inputs">
                                                <h4>Educational Attainment</h4>
                                                {props.action === "view" ?
                                                    <input
                                                        value={educationalAttainment}
                                                        disabled
                                                    /> :
                                                    <Autocomplete
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        value={educationalAttainment}
                                                        options={educationAttainment}
                                                        renderInput={(params) => <TextField {...params} />}
                                                        onChange={(e, newValue) => {
                                                            setEducationalAttainment(newValue)
                                                            setChanged(true)
                                                        }}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root:hover": {
                                                                "& > fieldset": {
                                                                    borderColor: "#7175F4"
                                                                }
                                                            }
                                                        }}
                                                    />
                                                }
                                            </div>
                                        </div>
                                        <div className="flex-row space-between">
                                            <div className="flex-column inputs">
                                                <h4>Occupation</h4>
                                                {props.action === "view" ?
                                                    <input
                                                        value={occupation}
                                                        disabled
                                                    /> :
                                                    <TextField
                                                        placeholder="Input Occupation"
                                                        value={occupation}
                                                        onChange={(e) => {
                                                            setOccupation(e.target.value)
                                                            setChanged(true)
                                                        }}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root:hover": {
                                                                "& > fieldset": {
                                                                    borderColor: "#7175F4"
                                                                }
                                                            }
                                                        }}
                                                    />
                                                }
                                            </div>
                                            <div className="flex-column inputs">
                                                <h4>Monthly Income</h4>
                                                {props.action === "view" ?
                                                    <input
                                                        value={monthlyIncome}
                                                        disabled
                                                    /> :
                                                    <TextField
                                                        placeholder="Input monthly income"
                                                        value={monthlyIncome}
                                                        onChange={(e) => {
                                                            setMonthlyIncome(e.target.value)
                                                            setChanged(true)
                                                        }}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root:hover": {
                                                                "& > fieldset": {
                                                                    borderColor: "#7175F4"
                                                                }
                                                            }
                                                        }}
                                                    />
                                                }
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
                                                        onChange={(e) => {
                                                            setSSS(e.target.value)
                                                            setChanged(true)
                                                        }}
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
                                                        value={gsis}
                                                        onChange={(e) => {
                                                            setGSIS(e.target.value)
                                                            setChanged(true)
                                                        }}
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
                                                        value={pagibig}
                                                        onChange={(e) => {
                                                            setPagibig(e.target.value)
                                                            setChanged(true)
                                                        }}
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
                                                        value={philhealth}
                                                        onChange={(e) => {
                                                            setPhilhealth(e.target.value)
                                                            setChanged(true)
                                                        }}
                                                    >
                                                        <FormControlLabel value="true" control={<Radio />} label="Yes" disabled={props.action === "view" ? true : false} />
                                                        <FormControlLabel value="false" control={<Radio />} label="No" disabled={props.action === "view" ? true : false} />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {value === 2 && (
                                    <div className="flex-column tab">
                                        <div className="flex-row space-between">
                                            <div className="flex-column inputs">
                                                <h4>Relationship to the Head of the Family </h4>
                                                {props.action === "view" ?
                                                    <input
                                                        value={relationship}
                                                        disabled
                                                    /> :
                                                    <Autocomplete
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        value={relationship}
                                                        options={familyMember}
                                                        renderInput={(params) => <TextField {...params} placeholder="Choose Kind of Family Member" />}
                                                        onChange={(e, newValue) => {
                                                            setRelationship(newValue)
                                                            setChanged(true)
                                                        }}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root:hover": {
                                                                "& > fieldset": {
                                                                    borderColor: "#7175F4"
                                                                }
                                                            }
                                                        }}
                                                    />
                                                }
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
                                disabled={loading}
                                type='submit'
                                className="solidButton buttonBlue">
                                Update
                            </button>
                        )}
                        <button
                            type="button"
                            disabled={loading}
                            className="borderedButton"
                            onClick={() => {
                                changed ? setCancelModal(true) : props.setShown(false)
                                setValue(0)
                            }}>
                            {props.action === "view" ? "Exit" : "Cancel"}

                        </button>
                    </div>
                </div>
            </form>
        </div>
    ) : null;
}

export default ViewUpdate
