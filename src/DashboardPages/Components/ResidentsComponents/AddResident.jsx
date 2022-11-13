import React, { useState, useEffect, useRef } from 'react'
import { Tabs, Autocomplete, TextField, Box, Tab, Radio, RadioGroup, FormControl, FormControlLabel, IconButton } from '@mui/material';
import Upload from "../NewImageFiles/Resident/UploadAvatar.svg"
import Avatar from "../NewImageFiles/Resident/Avatar.svg"
import Modal from "../CommonComponents/Modal"
//FOR SNACKBAR
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

//context
import { useResidentContext } from "../../hooks/userResidentContext"

function AddResident(props) {

    //context dispatch
    const { dispatch } = useResidentContext()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [emptyFields, setEmptyFields] = useState([])
    const [cancelModal, setCancelModal] = useState(false)
    const [changed, setChanged] = useState(false)

    const genderOptions = ['Male', 'Female'];
    const religionOptions = ['Catholic', 'Christian', 'Muslim', 'Other'];
    const civilStatusOptions = ['Married', 'Single', 'Divorced', 'Widowed', 'Separated', 'Live-in'];
    const educationAttainmentOptions = ['No Formal Education', 'Elementary', 'High School',
    "Bachelor's Degree", "Master's Degree", 'Doctorate or Higher'];
    const familyMember = ["Parent", "Spouse", "Child", "Sibling", "Grandparent", "Grandchild", "Other Relative"];
    const residentOccupation = ["Student", "Unemployed", "Employed", "Self-Employed"]
    const [value, setValue] = React.useState(0);

    function handleTabChange(event, value) {
        setValue(value);
    }

    const [relationship, setRelationship] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [suffix, setSuffix] = useState("")
    const [birthday, setBday] = useState('')
    const [birthplace, setBirthplace] = useState('')
    const [gender, setGender] = useState('')
    const [religion, setReligion] = useState('')
    const [email, setEmail] = useState('')
    const [contactNumber, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [civilStatus, setCivilStatus] = useState('')
    const [educationalAttainment, setEducationalAttainment] = useState('')
    const [occupation, setOccupation] = useState("")
    const [monthlyIncome, setMonthlyIncome] = useState('')
    const [sss, setSSS] = useState(false)
    const [gsis, setGSIS] = useState(false)
    const [pagibig, setPagibig] = useState(false)
    const [philhealth, setPhilhealth] = useState(false)

    const [snackbar, toggleSnackbar] = useState(false);

    const cancelForm = () => {
        props.setShown(false)
        setFirstName('')
        setLastName('')
        setMiddleName('')
        setSuffix("")
        setBday('')
        setBirthplace('')
        setGender('')
        setReligion('')
        setEmail('')
        setPhone('')
        setAddress('')
        setCivilStatus('')
        setEducationalAttainment('')
        setOccupation('')
        setMonthlyIncome('')
        setRelationship('')
        setSSS(false)
        setGSIS(false)
        setPagibig(false)
        setPhilhealth(false)
        setEmptyFields([])
        setError(null)
    }

    const handleFamilyHeadSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        const resident = {
            firstName, lastName, middleName, suffix, birthday, birthplace, gender, religion, email, contactNumber, address,
            civilStatus, educationalAttainment, occupation, monthlyIncome, membership: { pagibig, sss, gsis, philhealth }
        }

        const response = await fetch(process.env.REACT_APP_API_URL + '/residents/', {
            method: 'POST',
            body: JSON.stringify(resident),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setLoading(false)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setValue(0)
            setChanged(false)
            setError(null)
            setLoading(false)
            console.log('new Resident added:', json)
            dispatch({ type: 'CREATE_RESIDENT', payload: json })
            props.setShown(false)
            toggleSnackbar(true)
            setEmptyFields([])

            //Added a Member of the family
            fetch(process.env.REACT_APP_API_URL + '/activity/', {
                method: 'POST',
                body: JSON.stringify({ activity: "Added a head of the family: " + lastName + ", " + firstName }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

    }

    const handleFamilyMemberSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const resident = {
            firstName, lastName, middleName, suffix, birthday, birthplace, gender, religion, email, contactNumber, address,
            civilStatus, educationalAttainment, occupation, monthlyIncome, membership: { pagibig, sss, gsis, philhealth }, relationship
        }

        const response = await fetch(process.env.REACT_APP_API_URL + '/residents/add-member/' + props.headID, {
            method: 'POST',
            body: JSON.stringify(resident),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()
        if (response.ok) {
            setValue(0)
            toggleSnackbar(true)
            setError(null)
            setChanged(false)
            setLoading(false)
            props.setShown(false)
            console.log("resident added")
            dispatch({ type: 'CREATE_RESIDENT_MEMBER', payload: json })

            //Added a member of the family
            fetch(process.env.REACT_APP_API_URL + '/activity/', {
                method: 'POST',
                body: JSON.stringify({ activity: "Added a member of the family: " + lastName + ", " + firstName }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            setEmptyFields(json.emptyFields)
            setError(json.error)
            setLoading(false)
        }
    }
    const xButton = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => { changed ? setCancelModal(true) : cancelForm() }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    const action = (
        <React.Fragment>
            {/* <Button size="small" onClick={() => { toggleSnackbar(false) }}>
                <p style={{ color: "white", margin: 0 }}>View</p>
            </Button> */}
            <IconButton
                size="medium"
                aria-label="close"
                color="inherit"
                onClick={() => { toggleSnackbar(false) }}
            >
                <CloseIcon fontSize="medium" />
            </IconButton>
        </React.Fragment>
    );

    

    const re = new RegExp('^[0-9]*$')
    const ref = useRef();
    useEffect(() => {
        const scrollToTop = () => {
            ref.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
        props.shown && scrollToTop()
    }, [value])

    return (
        <div>
            <Snackbar
                open={snackbar}
                onClose={() => { 
                    toggleSnackbar(false) 
                    cancelForm()
                    }}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={2000}
                message={`${lastName}, ${firstName} has been added!`}
                ContentProps={{
                    sx: {
                        background: "#35CA3B",
                        width: 560,
                        ml: 30,
                        mt: 10
                    }
                }}
                action={action}
            />

            {props.shown ? (
                <div className="modal-backdrop">
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
                                    You have added information that haven’t been saved yet. Do you still want to quit?
                                </p>
                            </div>
                            <div className="rightAlign ModalButtons">
                                <button
                                    className="solidButton buttonRed"
                                    onClick={() => {
                                        setCancelModal(false)
                                        cancelForm()
                                        setChanged(false)
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
                    <form onSubmit={props.action == "addMember" ? handleFamilyMemberSubmit : handleFamilyHeadSubmit}>
                        <div className="addResidentModals modal-content">
                            <div className='modalHeader'>
                                <h2>{props.action == "addMember" ? "Add Family Member" : "Add Head of the Family"}</h2>
                                {xButton}
                            </div>
                            <div>
                                <div className="flex-column center">
                                    <div className='profileAvatar' style={{ marginBottom: "24px", marginTop: "24px" }}>
                                        <img src={Avatar} alt="" />
                                    </div>
                                </div>

                                <Box sx={{ width: '100%', height: '348px', mb: 4, borderBottom: 1, borderColor: '#9C9C9C' }}>
                                    <Box sx={{ borderBottom: 1, borderColor: '#9C9C9C' }}>
                                        <Tabs value={value} onChange={handleTabChange}>
                                            <Tab label="Personal Information" />
                                            <Tab label="Background Information" />
                                            {props.action == "addMember" && <Tab label="Family Information" />}
                                        </Tabs>
                                    </Box>
                                    <Box sx={{ height: '250px', overflow: 'auto', padding: "24px 0" }} ref={ref}>
                                        {value == 0 && (
                                            <div className="flex-column tab">
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Last Name<span style={{color: "#e7195a"}}>*</span></h4>
                                                        <TextField
                                                            error={emptyFields.includes('Last Name') ? true : false}
                                                            id={'outlined-error'}
                                                            placeholder='Input last name'
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
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>First Name<span style={{color: "#e7195a"}}>*</span></h4>
                                                        <TextField
                                                            error={emptyFields.includes('First Name') ? true : false}
                                                            id={'outlined-error'}
                                                            placeholder='Input first name'
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
                                                    </div>
                                                </div>
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Middle Name<span style={{color: "#e7195a"}}>*</span></h4>
                                                        <TextField
                                                            error={emptyFields.includes('Middle Name') ? true : false}
                                                            id={'outlined-error'}
                                                            placeholder='Input middle name'
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
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Suffix (If Applicable)</h4>
                                                        <TextField
                                                            placeholder='Input suffix'
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
                                                    </div>
                                                </div>
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Birthday<span style={{color: "#e7195a"}}>*</span></h4>
                                                        <TextField

                                                            error={emptyFields.includes('Birthday') ? true : false}
                                                            id="date"
                                                            type="date"
                                                            value={birthday}
                                                            inputProps={{
                                                                max: new Date().toISOString().slice(0, 10)
                                                            }}
                                                            placeholder="Choose Birthday"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
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
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Birth Place<span style={{color: "#e7195a"}}>*</span></h4>
                                                        <TextField
                                                            error={emptyFields.includes('Birthplace') ? true : false}
                                                            id={'outlined-error'}
                                                            placeholder='Input birth place'
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
                                                    </div>
                                                </div>
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Gender<span style={{color: "#e7195a"}}>*</span></h4>
                                                        <Autocomplete
                                                            id={'outlined-error'}
                                                            options={genderOptions}
                                                            renderInput={
                                                                (params) => <TextField {...params}
                                                                    placeholder="Choose Gender"
                                                                    error={emptyFields.includes('Gender') ? true : false}
                                                                    id={'outlined-error'}
                                                                />
                                                            }
                                                            value={gender}
                                                            onChange={(event, e) => {
                                                                setGender(e)
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
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Religion</h4>
                                                        <Autocomplete
                                                            disablePortal
                                                            options={religionOptions}
                                                            renderInput={(params) => <TextField {...params} placeholder="Choose Religion" />}
                                                            value={religion}
                                                            onChange={(event, e) => {
                                                                setReligion(e)
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
                                                    </div>
                                                </div>
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Email Address</h4>
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
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Contact Number</h4>
                                                        <TextField
                                                            placeholder="Input Contact Number"
                                                            value={contactNumber}
                                                            onChange={(e) => {
                                                                if (re.test(e.target.value)) {
                                                                    setPhone(e.target.value)
                                                                    setChanged(true)
                                                                }
                                                            }}
                                                            sx={{
                                                                "& .MuiOutlinedInput-root:hover": {
                                                                    "& > fieldset": {
                                                                        borderColor: "#7175F4"
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <h4>Address<span style={{color: "#e7195a"}}>*</span></h4>
                                                <TextField
                                                    error={emptyFields.includes('Address') ? true : false}
                                                    id={'outlined-error'}
                                                    placeholder='Input address'
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
                                            </div>
                                        )}
                                        {value == 1 && (
                                            <div className="flex-column tab">
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Civil Status</h4>
                                                        <Autocomplete
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            options={civilStatusOptions}
                                                            renderInput={(params) => <TextField {...params} placeholder="Choose Civil Status" />}
                                                            value={civilStatus}
                                                            onChange={(event, e) => {
                                                                setCivilStatus(e)
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
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Educational Attainment</h4>
                                                        <Autocomplete
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            options={educationAttainmentOptions}
                                                            value={educationalAttainment}
                                                            renderInput={(params) => <TextField {...params} placeholder="Choose Educational Background" />}
                                                            onChange={(event, e) => {
                                                                setEducationalAttainment(e)
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
                                                    </div>
                                                </div>
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Occupation</h4>
                                                        <Autocomplete
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            options={residentOccupation}
                                                            value={occupation}
                                                            renderInput={(params) => <TextField {...params} placeholder="Choose Occupation" />}
                                                            onChange={(event, e) => {
                                                                setOccupation(e)
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
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Monthly Income</h4>
                                                        <TextField
                                                            placeholder="Input monthly income"
                                                            value={monthlyIncome}
                                                            onChange={(e) => {
                                                                if (re.test(e.target.value)) {
                                                                    setMonthlyIncome(e.target.value)
                                                                    setChanged(true)
                                                                }
                                                            }}
                                                            sx={{
                                                                "& .MuiOutlinedInput-root:hover": {
                                                                    "& > fieldset": {
                                                                        borderColor: "#7175F4"
                                                                    }
                                                                }
                                                            }}
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
                                                                onChange={(e) => {
                                                                    setSSS(e.target.value)
                                                                    setChanged(true)
                                                                }}
                                                            >
                                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                                <FormControlLabel value="false" control={<Radio />} label="No" />
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
                                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                                <FormControlLabel value="false" control={<Radio />} label="No" />
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
                                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                                <FormControlLabel value="false" control={<Radio />} label="No" />
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
                                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                                <FormControlLabel value="false" control={<Radio />} label="No" />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {value == 2 && props.action == "addMember" && (
                                            <div className="flex-column tab">
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Relationship<span style={{color: "#e7195a"}}>*</span></h4>
                                                        <Autocomplete
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            options={familyMember}
                                                            value={relationship}
                                                            renderInput={(params) => <TextField {...params}
                                                                error={emptyFields.includes('Family Relationship') ? true : false}
                                                                placeholder="Choose relationship to the head of the family" />}
                                                            onChange={(event, e) => {
                                                                setRelationship(e)
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
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Box>
                                </Box>
                            </div>
                            <div className='bottomPartModal'>
                                <div className="rightAlign ModalButtons">
                                    {value == 2 && props.action == "addMember" && (
                                        <button
                                            disabled={loading}
                                            type="submit"
                                            className="solidButton buttonBlue">
                                            Add
                                        </button>
                                    )}
                                    {value != 2 && props.action == "addMember" && (
                                        <button
                                            type='button'
                                            className="solidButton buttonBlue"
                                            onClick={() => {
                                                setValue(value + 1)
                                            }}>
                                            Next
                                        </button>
                                    )}
                                    {value == 1 && props.action != "addMember" && (
                                        <button
                                            disabled={loading}
                                            type="submit"
                                            className="solidButton buttonBlue">
                                            Add
                                        </button>
                                    )}
                                    {value != 1 && props.action != "addMember" && (
                                        <button
                                            type='button'
                                            className="solidButton buttonBlue"
                                            onClick={() => {
                                                setValue(value + 1)
                                            }}>
                                            Next
                                        </button>
                                    )}
                                    {value != 0 && (
                                        <button
                                            disabled={loading}
                                            type='button'
                                            className="borderedButton"
                                            onClick={() => {
                                                setValue(value - 1)
                                            }}>
                                            Back
                                        </button>
                                    )}
                                    {value == 0 && (
                                        <button
                                            disabled={loading}
                                            type="reset"
                                            className="borderedButton"
                                            onClick={() => {
                                                changed ? setCancelModal(true) : cancelForm()
                                            }}>
                                            Cancel
                                        </button>
                                    )}
                                </div>
                                {error && <div className="divError">{error}</div>}
                            </div>
                        </div>
                    </form>
                </div>
            ) : null
            }
        </div>
    )
}

export default AddResident
