import React, { useState } from "react"
import Modal from "../CommonComponents/Modal"
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';

import Print from "../NewImageFiles/Topbar/Print.svg"
import Avatar from "../NewImageFiles/Resident/Avatar.svg"
import AddIcon from "../NewImageFiles/ActionButton/Plus.svg"

//FOR SNACKBAR
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

function Header(props) {
    const [AddmodalShown, toggleAddModal] = useState(false);
    const officialList = props.list
    const [resid, setId] = useState(0)

    const [flag, setFlag] = useState(false)
    const positionOptions = ['Chairman', 'Chairperson', 'Kagawad', 'SB Member', 'Member'];
    const membername = [];
    if (officialList) {
        officialList.map((props) => {
            membername.push(
                { label: props.name.firstName, id: props.id }
            )
        })
    }

    //FOR SNACKBAR
    const [snackbar, toggleSnackbar] = useState(false);
    const action = (
        <React.Fragment>
            {/* <Button size="small" onClick={() => { toggleSnackbar(false) }}>
                <p style={{ color: "white", margin: 0 }}>View</p>
            </Button> */}
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

    //form
    const id = props.length + 1
    const [name, setName] = useState(null)
    const [birthday, setBirthday] = useState(null)
    const [age, setAge] = useState(null)
    const [number, setNumber] = useState(null)
    const [typeOfMember, setTypeOfMember] = useState(null)
    const [address, setAddress] = useState(null)
    const [email, setEmail] = useState(null)

    const onchange = (e) => {
        setName(officialList[e - 1].name.firstName + " " + officialList[e].name.lastName)
        setBirthday(officialList[e - 1].birthday)
        setAge(32)
        setNumber(officialList[e - 1].phone)
        setAddress(officialList[e - 1].address)
        setEmail(officialList[e - 1].email)
    }
    const handleSubmit = () => {
        const avatar = "defaultAvatar"
        const officialMember = { id, avatar, name, birthday, age, number, typeOfMember, address, email }

        setId(0)
        toggleAddModal(false)
        document.getElementById("topBlur").className = "topbar flex-row";
        document.getElementById("sideBlur").className = "sidebar";
        document.getElementById("contentBlur").className = "flex-row";
        document.getElementById("headerBlur").className = "header";
        toggleSnackbar(true)
        setFlag(false)

        props.getSelectedRes(officialMember)
        //insert data to json file
        // fetch('http://localhost:8000/MembersData/', {
        //     method: 'POST',
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(officialMember)
        // }).then(() => {
        //     console.log('new official added');
        //     window.location.reload(false);
        // })
    }

    return (
        <div>
            <Modal
                shown={AddmodalShown}
                close={() => {
                    toggleAddModal(false);
                }}>
                <form onSubmit={handleSubmit}>
                    <div className="Editmodal officalModal">
                        <h2 className="marginBottom">Add Official</h2>
                        <div className="flex-row addOfficial space-between">
                            <div className="selects">
                                <h4>Resident's Name</h4>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={membername}
                                    getOptionLabel={(option) => option.label}
                                    sx={{ width: '100%' }}
                                    renderInput={(params) => <TextField {...params} required placeholder="Choose Resident" />}
                                    onChange={(event, newValue) => {
                                        setId(newValue.id)
                                        setFlag(true)
                                        onchange(newValue.id)
                                    }}
                                />
                                <h4>Position</h4>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={positionOptions}
                                    sx={{ width: '100%' }}
                                    renderInput={(params) => <TextField {...params} required placeholder="Choose Position" />}
                                    onChange={(event, newValue) => {
                                        setTypeOfMember(newValue)
                                    }}
                                />
                            </div>

                            <div className="addOfficialDetails">
                                <div className="modalheader">
                                    <label className='label'>Detailed Information</label><br />
                                </div>
                                <div className="details">
                                    <div className="addOfficialDetailsHeader">
                                        <img src={Avatar} alt="" className="modalAvatar" />
                                        <h3>{flag ? officialList[resid].name.firstName : "No resident have been displayed. Please select or type a resident"}</h3>
                                    </div>
                                    <div className=" topAlign">
                                        <div className="flex-row marginBottom marginTop">
                                            <h3>Details</h3>
                                        </div>
                                        <div className="flex-row borderBottom1 paddingBottom">
                                            <h4 style={{ width: "30%", textAlign: "left" }}>Birthday:</h4>
                                            <p style={{ textAlign: "left" }}>{flag ? officialList[resid].birthday : "N/A"}</p>
                                        </div>
                                        <div className="flex-row borderBottom1 marginTop paddingBottom">
                                            <h4 style={{ width: "30%", textAlign: "left" }}>Address:</h4>
                                            <p style={{ width: "70%", textAlign: "left" }}>{flag ? officialList[resid].address : "N/A"}</p>
                                        </div>
                                        <div className="flex-row borderBottom1 marginTop paddingBottom">
                                            <h4 style={{ width: "30%", textAlign: "left" }}>Email:</h4>
                                            <p style={{ textAlign: "left" }}>{flag ? officialList[resid].email : "N/A"}</p>
                                        </div>
                                        <div className="flex-row marginTop paddingBottom">
                                            <h4 style={{ width: "30%", textAlign: "left" }}>Phone No.:</h4>
                                            <p style={{ textAlign: "left" }}>{flag ? officialList[resid].phone : "N/A"}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="ModalButtons">
                            <button
                                type="submit"
                                className="solidButton buttonBlue">
                                Add
                            </button>
                            <button
                                type="reset"
                                className="borderedButton"
                                onClick={() => {
                                    toggleAddModal(false)
                                    setId(0)
                                    document.getElementById("topBlur").className = "topbar flex-row";
                                    document.getElementById("sideBlur").className = "sidebar";
                                    document.getElementById("contentBlur").className = "flex-row";
                                    document.getElementById("headerBlur").className = "header";
                                    setFlag(false)
                                }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>

            </Modal>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackbar}
                onClose={() => { toggleSnackbar(false) }}
                autoHideDuration={5000}
                message={`${name} has been added!`}
                action={action}
                ContentProps={{
                    sx: {
                        background: "#35CA3B",
                        width: 560,
                        ml: 30,
                        mt: 10
                    }
                }}
            />
            <div id='headerBlur' className='header'>
                <div className="flex-row borderBottom2 topHeader">
                    <h1>ORGANIZATION</h1>
                </div>
                <div className="flex-row headerActions bottomHeader">
                    <div style={{ flexGrow: "9" }}>
                        <TextField
                            placeholder="Search for Name, Position, Email..."
                            sx={{ backgroundColor: "white" }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                    <div className="flex-row center"
                        onClick={() => {
                            toggleAddModal(true)
                            document.getElementById("sideBlur").className += " blur";
                            document.getElementById("topBlur").className += " blur";
                            document.getElementById("headerBlur").className += " blur";
                            document.getElementById("contentBlur").className += " blur";
                        }}>
                        <img src={Print} alt="" className="export" style={{ cursor: "pointer" }} />
                        <div className="solidButton add buttonBlue">
                            <img src={AddIcon} alt="" />
                            <p>Add Official</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
