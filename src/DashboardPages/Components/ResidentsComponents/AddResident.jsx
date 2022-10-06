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
import Modal from "../CommonComponents/Modal"
//FOR SNACKBAR
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
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
    const civilStatusOptions = ['Married', 'Single', 'Divorced', 'Widowed'];
    const educationAttainmentOptions = ['No Formal Education', 'Elementary', 'High School',
        'General Education Development', 'Vocational Qualificiation', 'Bachelor’s Degree',
        'Master’s Degree', 'Doctorate or Higher'];
    const familyMember = ["Husband", "Wife", "Daughter", "Son"];

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
    const [occupation, setOccupation] = useState('')
    const [monthlyIncome, setMonthlyIncome] = useState('')
    const [sss, setSSS] = useState(false)
    const [gsis, setGSIS] = useState(false)
    const [pagibig, setPagibig] = useState(false)
    const [philhealth, setPhilhealth] = useState(false)

    const [snackbar, toggleSnackbar] = useState(false);

    const handleFamilyHeadSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        const resident = {
            firstName, lastName, middleName, suffix, birthday, birthplace, gender, religion, email, contactNumber, address,
            civilStatus, educationalAttainment, occupation, monthlyIncome, membership: { pagibig, sss, gsis, philhealth }
        }

        const response = await fetch('https://drims-demo.herokuapp.com/api/residents/', {
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
            setChanged(false)
            setError(null)
            setLoading(false)
            console.log('new Resident added:', json)
            dispatch({ type: 'CREATE_RESIDENT', payload: json })
            props.setShown(false)
            toggleSnackbar(true)

            //Added a Head of the family
            const activity = "Added a member of the family: " + lastName + ", " + firstName
            const content = { activity }
            fetch('https://drims-demo.herokuapp.com/api/activity/', {
                method: 'POST',
                body: JSON.stringify(content),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

    }

    const handleFamilyMemberSubmit = async (e) => {
        e.preventDefault()

        const resident = {
            firstName, lastName, middleName, suffix, birthday, birthplace, gender, religion, email, contactNumber, address,
            civilStatus, educationalAttainment, occupation, monthlyIncome, membership: { pagibig, sss, gsis, philhealth }, relationship
        }

        const response = await fetch('https://drims-demo.herokuapp.com/api/residents/add-member/' + props.headID, {
            method: 'POST',
            body: JSON.stringify(resident),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        console.log(json)
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setError(null)
            setChanged(false)
            console.log('new Resident added:', json)
            dispatch({ type: 'CREATE_RESIDENT_MEMBER', payload: json })

            props.setShown(false)
            toggleSnackbar(true)

            //Added a member of the family
            const activity = "Added a member of the family: " + lastName + ", " + firstName
            const content = { activity }
            fetch('https://drims-demo.herokuapp.com/api/activity/', {
                method: 'POST',
                body: JSON.stringify(content),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
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

    const cancelForm = () => {
        props.setShown(false)
        setFirstName('')
        setLastName('')
        setMiddleName('')
        setSuffix("")
        setBday('')
        setBirthplace('')
        setGender(null)
        setReligion(null)
        setEmail('')
        setPhone('')
        setAddress('')
        setCivilStatus(null)
        setEducationalAttainment(null)
        setOccupation('')
        setMonthlyIncome('')
        setSSS('')
        setGSIS('')
        setPagibig('')
        setPhilhealth('')
        setEmptyFields([])
        setError(null)
    }

    return (
        <div>
            <Snackbar
                open={snackbar}
                onClose={() => { toggleSnackbar(false) }}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={5000}
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
                                    <Box sx={{ height: '250px', overflow: 'auto', padding: "24px 0" }}>
                                        {value == 0 && (
                                            <div className="flex-column tab">
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Last Name</h4>
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
                                                        <h4>First Name</h4>
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
                                                        <h4>Middle Name</h4>
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
                                                        <h4>Birthday</h4>
                                                        <TextField
                                                            required
                                                            error={emptyFields.includes('Birthday') ? true : false}
                                                            id="date"
                                                            type="date"
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
                                                        <h4>Birth Place</h4>
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
                                                        <h4>Gender</h4>
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
                                                    </div>
                                                </div>
                                                <h4>Address</h4>
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
                                                            style={{ width: "99%" }}
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            options={civilStatusOptions}
                                                            renderInput={(params) => <TextField {...params} placeholder="Choose Civil Status" required />}
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
                                                            style={{ width: "99%" }}
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            options={educationAttainmentOptions}
                                                            value={educationalAttainment}
                                                            renderInput={(params) => <TextField {...params} placeholder="Choose Educational Background" required />}
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
                                                        <TextField
                                                            placeholder="Input occupation"
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
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Monthly Income</h4>
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
                                                    </div>
                                                </div>
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Member of  Social Security <br /> System (SSS)</h4>
                                                        <FormControl>
                                                            <RadioGroup
                                                                aria-labelledby="demo-radio-buttons-group-label"
                                                                name="radio-buttons-group"
                                                                required
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
                                                                required
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
                                                                required
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
                                                                required
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
                                                        <h4>Relationship</h4>
                                                        <Autocomplete
                                                            style={{ width: "99%" }}
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            options={familyMember}
                                                            renderInput={(params) => <TextField {...params} placeholder="Choose relationship to the head of the family" />}
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
                                    {value == 2 && (
                                        <button
                                            disabled={loading}
                                            type="submit"
                                            className="solidButton buttonBlue">
                                            Add
                                        </button>
                                    )}
                                    {value !== 2 && (
                                        <button
                                            type='button'
                                            className="solidButton buttonBlue"
                                            onClick={() => {
                                                setValue(value + 1)
                                            }}>
                                            Next
                                        </button>
                                    )}
                                    {value !== 0 && (
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
