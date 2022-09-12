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
//FOR SNACKBAR
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

//context
import { useResidentContext } from "../../hooks/userResidentContext"

function AddResident(props) {

    //context dispatch
    const { dispatch } = useResidentContext()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const genderOptions = ['Male', 'Female', 'Other'];
    const religionOptions = ['Catholic', 'Christian', 'Muslim', 'Other'];
    const civilStatusOptions = ['Married', 'Single', 'Divorced', 'Widowed'];
    const educationAttainmentOptions = ['No Formal Education', 'Elementary', 'High School',
        'General Education Development', 'Vocational Qualificiation', 'Bachelor’s Degree',
        'Master’s Degree', 'Doctorate or Higher'];
    const familyMember = ['Father', 'Mother'];

    const [value, setValue] = React.useState(0);

    function handleTabChange(event, value) {
        setValue(value);
    }

    const [role, setRole] = useState('')
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [middleName, setMiddleName] = useState(null)
    const [suffix, setSuffix] = useState("")
    const [birthday, setBday] = useState(null)
    const [birthplace, setBirthplace] = useState(null)
    const [gender, setGender] = useState(null)
    const [religion, setReligion] = useState(null)
    const [email, setEmail] = useState(null)
    const [contactNumber, setPhone] = useState(null)
    const [address, setAddress] = useState(null)
    const [civilStatus, setCivilStatus] = useState(null)
    const [educationalAttainment, setEducationalAttainment] = useState(null)
    const [occupation, setOccupation] = useState(null)
    const [monthlyIncome, setMonthlyIncome] = useState(null)
    const [sss, setSSS] = useState(null)
    const [gsis, setGSIS] = useState(null)
    const [pagibig, setPagibig] = useState(null)
    const [philhealth, setPhilhealth] = useState(null)

    const [snackbar, toggleSnackbar] = useState(false);

    const handleFamilyHeadSubmit = async (e) => {
        setLoading(true)
        console.log("Head Family")
        e.preventDefault()

        const resident = {
            firstName, lastName, middleName, suffix, birthday, birthplace, gender, religion, email, contactNumber, address,
            civilStatus, educationalAttainment, occupation, monthlyIncome, membership: { pagibig, sss, gsis, philhealth }
        }

        console.log(resident)

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
        }
        if (response.ok) {
            setError(null)
            setLoading(false)
            console.log('new Resident added:', json)
            dispatch({ type: 'CREATE_RESIDENT', payload: json })
            props.setShown(false)
            toggleSnackbar(true)
            document.getElementById("topBlur").className = "topbar flex-row";
            document.getElementById("sideBlur").className = "sidebar";
            document.getElementById("ResidentcontentBlur").className = "resident";
            document.getElementById("headerBlur").className = "header";
        }

    }

    const handleFamilyMemberSubmit = async (e) => {
        e.preventDefault()

        const resident = {
            firstName, lastName, middleName, suffix, birthday, birthplace, gender, religion, email, contactNumber, address,
            civilStatus, educationalAttainment, occupation, monthlyIncome, membership: { pagibig, sss, gsis, philhealth }
        }

        props.setShown(false)
        toggleSnackbar(true)
        document.getElementById("topBlur").className = "topbar flex-row";
        document.getElementById("sideBlur").className = "sidebar";
        document.getElementById("ResidentcontentBlur").className = "resident";
        document.getElementById("headerBlur").className = "header";

        // const response = await fetch('https://drims-demo.herokuapp.com/api/residents/', {
        //     method: 'POST',
        //     body: JSON.stringify(resident),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })

        // const json = await response.json()

        // if (!response.ok) {
        //     setError(json.error)
        // }
        // if (response.ok) {
        //     setError(null)
        //     console.log('new Resident added:', json)
        //     dispatch({ type: 'CREATE_RESIDENT', payload: json })
        // }

    }
    const action = (
        <React.Fragment>
            <Button size="small" onClick={() => { toggleSnackbar(false) }}>
                <p style={{ color: "white", margin: 0 }}>View</p>
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => { toggleSnackbar(false) }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const cancelForm = () => {
        props.setShown(false)
        document.getElementById("topBlur").className = "topbar flex-row";
        document.getElementById("sideBlur").className = "sidebar";
        document.getElementById("ResidentcontentBlur").className = "resident";
        document.getElementById("headerBlur").className = "header";
        setFirstName(null)
        setLastName(null)
        setMiddleName(null)
        setSuffix("")
        setBday(null)
        setBirthplace(null)
        setGender(null)
        setReligion(null)
        setEmail(null)
        setPhone(null)
        setAddress(null)
        setCivilStatus(null)
        setEducationalAttainment(null)
        setOccupation(null)
        setMonthlyIncome(null)
        setSSS(null)
        setGSIS(null)
        setPagibig(null)
        setPhilhealth(null)
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
                    <form onSubmit={props.action === "addMember" ? handleFamilyMemberSubmit : handleFamilyHeadSubmit} on>
                        <div className="addResidentModals modal-content">
                            <h2 className="marginBottom">{props.action === "addMember" ? "Add Family Member" : "Add Head of the Family"}</h2>
                            <div>
                                <div className="flex-column center">
                                    <div className='profileAvatar' style={{ marginBottom: "24px" }}>
                                        <img src={Avatar} alt="" />
                                        <div className='uploadAvatar'>
                                            <label>
                                                <img src={Upload} alt="" style={{ cursor: "pointer" }} />
                                                <input type="file" />
                                            </label>
                                        </div>
                                    </div>

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
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Middle Name</h4>
                                                        <input
                                                            type="text"
                                                            required
                                                            placeholder="Input Middle Name"
                                                            value={middleName}
                                                            onChange={(e) => setMiddleName(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Suffix (If Applicable)</h4>
                                                        <input
                                                            type="text"
                                                            required
                                                            placeholder="Input Suffix"
                                                            value={suffix}
                                                            onChange={(e) => setSuffix(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Birthday</h4>
                                                        <TextField
                                                            required
                                                            id="date"
                                                            type="date"
                                                            placeholder="Choose Birthday"
                                                            sx={{ width: 343 }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            value={birthday}//format this
                                                            onChange={(e) => setBday(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Birth Place</h4>
                                                        <input
                                                            type="text"
                                                            required
                                                            placeholder="Input Birth Place"
                                                            value={birthplace}
                                                            onChange={(e) => setBirthplace(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Gender</h4>
                                                        <Autocomplete
                                                            style={{ width: "99%" }}
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            options={genderOptions}
                                                            sx={{ width: '100%' }}
                                                            renderInput={(params) => <TextField {...params} placeholder="Choose Gender" />}
                                                            value={gender}
                                                            onChange={(event, e) => setGender(e)}
                                                        />
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Religion</h4>
                                                        <Autocomplete
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            options={religionOptions}
                                                            sx={{ width: "99%" }}
                                                            renderInput={(params) => <TextField {...params} placeholder="Choose Religion" />}
                                                            value={religion}
                                                            onChange={(event, e) => setReligion(e)}
                                                        />
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
                                                        />
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Contact Number</h4>
                                                        <input
                                                            type="text"
                                                            required
                                                            placeholder="Input Contact Number"
                                                            value={contactNumber}
                                                            onChange={(e) => setPhone(e.target.value)}
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
                                                />
                                            </div>
                                        )}
                                        {value === 1 && (
                                            <div className="flex-column tab">
                                                <div className="flex-row space-between">
                                                    <div className="flex-column inputs">
                                                        <h4>Civil Status</h4>
                                                        <Autocomplete
                                                            style={{ width: "99%" }}
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            options={civilStatusOptions}
                                                            sx={{ width: '100%' }}
                                                            renderInput={(params) => <TextField {...params} placeholder="Choose Civil Status" required />}
                                                            value={civilStatus}
                                                            onChange={(event, e) => setCivilStatus(e)}
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
                                                            sx={{ width: '100%' }}
                                                            renderInput={(params) => <TextField {...params} placeholder="Choose Educational Background" required />}
                                                            onChange={(event, e) => setEducationalAttainment(e)}
                                                        />
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
                                                                onChange={(e) => setSSS(e.target.value)}
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
                                                                onChange={(e) => setGSIS(e.target.value)}
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
                                                                onChange={(e) => setPagibig(e.target.value)}
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
                                                                onChange={(e) => setPhilhealth(e.target.value)}
                                                            >
                                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                                <FormControlLabel value="false" control={<Radio />} label="No" />
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
                                                        <h4>Family Member</h4>
                                                        <Autocomplete
                                                            style={{ width: "99%" }}
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            options={familyMember}
                                                            sx={{ width: '100%' }}
                                                            renderInput={(params) => <TextField {...params} placeholder="Choose Kind of Family Member" required />}
                                                            onChange={(event, e) => setRole(e)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Box>
                                </Box>
                            </div>
                            <div className="rightAlign ModalButtons">
                                {value === 2 ?
                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className="solidButton buttonBlue">
                                        Add
                                    </button> :
                                    <button
                                        disabled={loading}
                                        type='button'
                                        className="solidButton buttonBlue"
                                        onClick={() => {
                                            setValue(value + 1)
                                        }}>
                                        Next
                                    </button>
                                }
                                {value === 0 ?
                                    <button
                                        disabled={loading}
                                        type="reset"
                                        className="borderedButton"
                                        onClick={() => {
                                            cancelForm()
                                        }}>
                                        Cancel
                                    </button> :
                                    <button
                                        disabled={loading}
                                        type='button'
                                        className="borderedButton"
                                        onClick={() => {
                                            setValue(value - 1)
                                        }}>
                                        Back
                                    </button>
                                }
                                {error && <div className="error">{error}</div>}

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
