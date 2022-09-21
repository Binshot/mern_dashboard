import React, { useState, useEffect } from "react"
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

import { useOrganizationContext } from "../../hooks/useOrganizationContext"
import { format } from "date-fns";

function Header() {
    //context dispatch
    const { dispatch } = useOrganizationContext()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [AddmodalShown, toggleAddModal] = useState(false);

    const [officialList, setOfficialList] = useState(null)
    const [selectedResident, setSelectedResident] = useState(null)
    const [position, setPosition] = useState(null)
    const [name, setName] = useState('')

    useEffect(() => {
        const fetchResident = async () => {
            const response = await fetch('https://drims-demo.herokuapp.com/api/residents/')
            const json = await response.json()

            if (response.ok) {
                setOfficialList(json)
            }
        }

        fetchResident()
    }, [])

    const fetchSingleResident = async (id) => {
        const response = await fetch('https://drims-demo.herokuapp.com/api/residents/' + id)
        const json = await response.json()

        if (response.ok) {
            setSelectedResident(json)
        }
    }

    //Options
    const positionOptions = ['Chairman', 'Chairperson', 'Kagawad', 'SB Member', 'Member'];
    const membername = [];
    if (officialList) {
        officialList.map((props) => {
            membername.push(
                { label: props.lastName + ", " + props.firstName, id: props._id }
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

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault()

        const resident_id = selectedResident._id
        const official = { resident_id, position }
        console.log(official)
        const response = await fetch('https://drims-demo.herokuapp.com/api/organization/', {
            method: 'POST',
            body: JSON.stringify(official),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()
        console.log(json)

        if (response.ok) {
            toggleAddModal(false)
            document.getElementById("topBlur").className = "topbar flex-row";
            document.getElementById("sideBlur").className = "sidebar";
            document.getElementById("contentBlur").className = "resident";
            document.getElementById("headerBlur").className = "header";
            setIsLoading(false)
            toggleSnackbar(true)
            console.log('new official added:', json)
            dispatch({ type: 'CREATE_OFFICIAL', payload: json })

            // add activity logs
            const activity = "Added an official: " + selectedResident.lastName + ", " + selectedResident.firstName
            const content = { activity }
            fetch('https://drims-demo.herokuapp.com/api/activity/', {
                method: 'POST',
                body: JSON.stringify(content),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            setError(json.error)
            console.log(json.error)
            setIsLoading(false)
        }
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
                                <h4 style={{ marginBottom: "8px" }}>Resident's Name</h4>
                                <Autocomplete
                                    disablePortal
                                    className="roundRadius"
                                    id="combo-box-demo"
                                    options={membername}
                                    value={name}
                                    renderInput={(params) => <TextField {...params} placeholder="Choose Resident" />}
                                    onChange={(event, newValue) => {
                                        newValue && fetchSingleResident(newValue.id)
                                        setName(newValue.label)
                                    }}
                                />
                                <h4 style={{ marginBottom: "8px", marginTop: "16px" }}>Position</h4>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={positionOptions}
                                    renderInput={(params) => <TextField {...params} placeholder="Choose Position" />}
                                    onChange={(event, newValue) => {
                                        setPosition(newValue)
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
                                        <h3>{selectedResident ? selectedResident.firstName + " " + selectedResident.lastName : "No resident have been displayed. Please select or type a resident"}</h3>
                                    </div>
                                    <div className=" topAlign">
                                        <div className="flex-row marginBottom marginTop">
                                            <h3>Details</h3>
                                        </div>
                                        <div className="flex-row borderBottom1 paddingBottom">
                                            <h4 style={{ width: "30%", textAlign: "left" }}>Birthday:</h4>
                                            <p style={{ textAlign: "left" }}>{selectedResident ? format(new Date(selectedResident.birthday), "MMMM dd, yyyy") : "N/A"}</p>
                                        </div>
                                        <div className="flex-row borderBottom1 marginTop paddingBottom">
                                            <h4 style={{ width: "30%", textAlign: "left" }}>Address:</h4>
                                            <p style={{ width: "70%", textAlign: "left" }}>{selectedResident ? selectedResident.address : "N/A"}</p>
                                        </div>
                                        <div className="flex-row borderBottom1 marginTop paddingBottom">
                                            <h4 style={{ width: "30%", textAlign: "left" }}>Email:</h4>
                                            <p style={{ textAlign: "left" }}>{selectedResident ? selectedResident.email : "N/A"}</p>
                                        </div>
                                        <div className="flex-row marginTop paddingBottom">
                                            <h4 style={{ width: "30%", textAlign: "left" }}>Phone No.:</h4>
                                            <p style={{ textAlign: "left" }}>{selectedResident ? selectedResident.contactNumber : "N/A"}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="ModalButtons">
                            <button
                                type="submit"
                                className="solidButton buttonBlue"
                                disabled={isLoading}>
                                Add
                            </button>
                            <button
                                type="reset"
                                className="borderedButton"
                                onClick={() => {
                                    toggleAddModal(false)
                                    document.getElementById("topBlur").className = "topbar flex-row";
                                    document.getElementById("sideBlur").className = "sidebar";
                                    document.getElementById("contentBlur").className = "flex-row";
                                    document.getElementById("headerBlur").className = "header";
                                }}
                                disabled={isLoading}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>

            </Modal>
            {selectedResident && (
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={snackbar}
                    onClose={() => { toggleSnackbar(false) }}
                    autoHideDuration={5000}
                    message={`${selectedResident.lastName}, ${selectedResident.firstName} has been added!`}
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
            )}

            <div id='headerBlur' className='header'>
                <div className="flex-row borderBottom2 topHeader">
                    <h1>ORGANIZATION</h1>
                </div>
                <div className="flex-row headerActions bottomHeader">
                    <div style={{ flexGrow: "9" }}>
                        <TextField
                            placeholder="Search for Name, Position, Email..."
                            sx={{ backgroundColor: "white", borderRadius: "8px" }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                    <div className="flex-row center">
                        <img src={Print} alt="" className="export" style={{ cursor: "pointer" }} />
                        <button
                            className="solidButton add buttonBlue"
                            onClick={() => {
                                toggleAddModal(true)
                                document.getElementById("sideBlur").className += " blur";
                                document.getElementById("topBlur").className += " blur";
                                document.getElementById("headerBlur").className += " blur";
                                document.getElementById("contentBlur").className += " blur";
                            }}>
                            <img src={AddIcon} alt="" />
                            <p>Add Official</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header