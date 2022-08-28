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
function AddResident(props) {

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

    //Resident data input
    let id = props.length + 1
    const [lastName, setLastName] = useState('')
    const [role, setRole] = useState('')
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [suffix, setSuffix] = useState('')
    const [birthday, setBday] = useState('')
    const [birthPlace, setBirthplace] = useState('')
    const [gender, setGender] = useState('')
    const [religion, setReligion] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [civilStatus, setCivilStatus] = useState('')
    const [educationAttainment, setEducationalAttainment] = useState('')
    const [occupation, setOccupation] = useState('')
    const [monthlyIncome, setMonthlyIncome] = useState('')
    const [sss, setSSS] = useState('')
    const [gsis, setGSIS] = useState('')
    const [pagibig, setPagibig] = useState('')
    const [philhealth, setPhilhealth] = useState('')
    const [snackbar, toggleSnackbar] = useState(false);
    
    const handleSubmit = () => {
        const name = { lastName, firstName, middleName }
        const govermentMemberships = { sss, gsis, pagibig, philhealth }
        const res = { id, role, civilStatus, name, birthday, gender, birthPlace, religion, address, email, phone, educationAttainment, occupation, monthlyIncome, govermentMemberships }

        props.setShown(false)
        toggleSnackbar(true)
        document.getElementById("topBlur").className = "topbar flex-row";
        document.getElementById("sideBlur").className = "sidebar";
        document.getElementById("ResidentcontentBlur").className = "resident";
        document.getElementById("headerBlur").className = "header";
        setValue(0)
        
        props.action !== "addMember" && props.resident(res)
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
                    <form onSubmit={handleSubmit}>
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
                                                            sx={{ width: 338 }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            value={birthday}
                                                            onChange={(e) => setBday(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Birth Place</h4>
                                                        <input
                                                            type="text"
                                                            required
                                                            placeholder="Input Birth Place"
                                                            value={birthPlace}
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
                                                            renderInput={(params) => <TextField {...params} placeholder="Choose Gender" required />}
                                                            onChange={(event, e) => setGender(e)}
                                                        />
                                                    </div>
                                                    <div className="flex-column inputs">
                                                        <h4>Religion</h4>
                                                        <Autocomplete
                                                            style={{ width: "99%" }}
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            options={religionOptions}
                                                            sx={{ width: '100%' }}
                                                            renderInput={(params) => <TextField {...params} placeholder="Choose Religion" required />}
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
                                                            value={phone}
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
                                                                onChange={(e) => setSSS(e.target.value)}
                                                            >
                                                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                                <FormControlLabel value="No" control={<Radio />} label="No" />
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
                                                                onChange={(e) => setGSIS(e.target.value)}
                                                            >
                                                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                                <FormControlLabel value="No" control={<Radio />} label="No" />
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
                                                                onChange={(e) => setPagibig(e.target.value)}
                                                            >
                                                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                                <FormControlLabel value="No" control={<Radio />} label="No" />
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
                                                                onChange={(e) => setPhilhealth(e.target.value)}
                                                            >
                                                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                                <FormControlLabel value="No" control={<Radio />} label="No" />
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
                                <button
                                    type="reset"
                                    className="borderedButton"
                                    onClick={() => {
                                        props.setShown(false)
                                        document.getElementById("topBlur").className = "topbar flex-row";
                                        document.getElementById("sideBlur").className = "sidebar";
                                        document.getElementById("ResidentcontentBlur").className = "resident";
                                        document.getElementById("headerBlur").className = "header";
                                    }}>
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="solidButton buttonBlue">
                                    Add
                                </button>
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
