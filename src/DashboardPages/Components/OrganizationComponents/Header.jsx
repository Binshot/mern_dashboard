import React, { useState, useEffect, useRef } from "react"
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

import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../printPDF/OfficialsToPrint';

function Header(props) {
    //context dispatch
    const { organizations, dispatch } = useOrganizationContext()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [emptyFieldss, setEmptyFields] = useState([])

    const [AddmodalShown, toggleAddModal] = useState(false);
    const [cancelModal, setCancelModal] = useState(false)
    const [changed, setChanged] = useState(false)

    const [officialList, setOfficialList] = useState(null)
    const [selectedResident, setSelectedResident] = useState(null)
    const [position, setPosition] = useState(null)
    // const [name, setName] = useState(null)
    useEffect(() => {
        const fetchResident = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/residents/')
            const json = await response.json()

            if (response.ok) {
                setOfficialList(json)
            }
        }

        fetchResident()
    }, [])

    const fetchSingleResident = async (id) => {
        const response = await fetch(process.env.REACT_APP_API_URL + '/residents/' + id)
        const json = await response.json()

        if (response.ok) {
            setSelectedResident(json)
        }
    }

    //Options
    const positionOptions = ['President', 'Vice President', 'Secretary', 'Treasurer', 'Auditor', 'Board Member'];
    const membername = [];
    if (officialList) {
        officialList.map((props) => {
            membername.push(
                { label: `${props.lastName}, ${props.firstName}`, id: props._id }
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

        const response = await fetch(process.env.REACT_APP_API_URL + '/organization/', {
            method: 'POST',
            body: JSON.stringify({
                resident_id: selectedResident ? selectedResident._id : null,
                position: position
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (response.ok) {
            cancelForm()
            setIsLoading(false)
            toggleSnackbar(true)
            setChanged(false)
            const resresponse = await fetch(process.env.REACT_APP_API_URL + '/residents/' + json.resident_id)
            const resjson = await resresponse.json()
            if (resresponse.ok) {
                let sortPosition
                switch (position) {
                    case "President":
                        sortPosition = 1;
                        break;
                    case "Vice President":
                        sortPosition = 2;
                        break;
                    case "Secretary":
                        sortPosition = 3;
                        break;
                    case "Treasurer":
                        sortPosition = 4;
                        break;
                    case "Auditor":
                        sortPosition = 5;
                        break;
                    default:
                        sortPosition = 6;
                        break;
                }
                const data = { official: resjson, position: json.position, _id: json._id, positionIndex: sortPosition }
                dispatch({ type: 'CREATE_OFFICIAL', payload: data })
            }

            // add activity logs
            fetch(process.env.REACT_APP_API_URL + '/activity/', {
                method: 'POST',
                body: JSON.stringify({ activity: "Added an official: " + selectedResident.lastName + ", " + selectedResident.firstName }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            setError(json.error)
            console.log(json.error)
            setIsLoading(false)
            setEmptyFields(json.emptyFields || [])
            console.log(json.emptyFields)
        }
    }

    const requestSearch = (searchedVal) => {
        const filteredRows = organizations.filter((row) => {
            let name = row.official.lastName.toLowerCase() + row.official.firstName.toLowerCase()
            return name.includes(searchedVal.toLowerCase());
        });
        props.get(filteredRows)
    };

    const xButton = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => changed ? setCancelModal(true) : cancelForm()}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    const cancelForm = () => {
        toggleAddModal(false)
        setError(null)
        setEmptyFields([])
        setPosition(null)
        setChanged(false)
        setSelectedResident(null)
    }

    const pageStyle = `
                        @page {
                            size: landscape;
                            margin: 10mm 10mm 10mm 10mm
                        }                        
                    `;

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: pageStyle,
    });

    return (
        <div>
            <Modal
                shown={AddmodalShown}
                close={() => {
                    toggleAddModal(false);
                }}>
                <form onSubmit={handleSubmit}>
                    <div className="Editmodal officalModal">
                        <div className='modalHeader'>
                            <h2 className="marginBottom">Add Official</h2>
                            {xButton}
                        </div>
                        <div className="flex-row addOfficial space-between">
                            <div className="selects">
                                <h4 style={{ marginBottom: "8px" }}>Resident's Name</h4>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={membername}
                                    isOptionEqualToValue={(option, value) => option.label == value.label}
                                    renderInput={(params) => <TextField {...params}
                                        placeholder="Choose Resident"
                                        error={emptyFieldss.includes('Resident') ? true : false}
                                    />}
                                    onChange={(event, newValue) => {
                                        newValue && fetchSingleResident(newValue.id)
                                        // setName(newValue.label)
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
                                <h4 style={{ marginBottom: "8px", marginTop: "16px" }}>Position</h4>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={positionOptions}
                                    renderInput={(params) => <TextField {...params}
                                        placeholder="Choose Position"
                                        error={emptyFieldss.includes('Position') ? true : false}
                                    />}
                                    onChange={(event, newValue) => {
                                        setPosition(newValue)
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
                            <div className="addOfficialDetails">
                                <div className="modalheader">
                                    <label className='label'>Detailed Information</label><br />
                                </div>
                                <div className="details">
                                    <div className="addOfficialDetailsHeader">
                                        <img className="modalAvatar"
                                            src={selectedResident && selectedResident.accountImage
                                                ? `https://drims-demo.herokuapp.com/api/uploads/${selectedResident.accountImage}`
                                                : Avatar}
                                        />
                                        <h3>{selectedResident ? selectedResident.firstName + " " + selectedResident.lastName : "No resident have been displayed. Please select a resident"}</h3>
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
                        <div className='bottomPartModal'>
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
                                    onClick={() => changed ? setCancelModal(true) : cancelForm()}
                                    disabled={isLoading}>
                                    Cancel
                                </button>
                            </div>
                            {error && <div className="divError">{error}</div>}
                        </div>
                    </div>
                </form>

            </Modal>

            {/* cancel add */}
            <Modal
                shown={cancelModal}
                close={() => {
                    setCancelModal(false)
                }}>
                <div className="deleteModals">
                    <div className='modalHeader'>
                        <h2>Cancel Add?</h2>
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
                            placeholder="Search official's name"
                            sx={{
                                backgroundColor: "white",
                                "& .MuiOutlinedInput-root:hover": {
                                    "& > fieldset": {
                                        borderColor: "#7175F4"
                                    }
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                            onChange={(e) => requestSearch((e.target.value).toString())}
                        />
                    </div>
                    <div className="flex-row center">
                        <div className="rightAlign actions" style={{ cursor: "pointer" }} onClick={() => handlePrint()} >
                            <img src={Print} alt="" className="export" />
                        </div>
                        <div style={{ display: "none" }}><ComponentToPrint ref={componentRef} list={organizations} /></div>
                        <button
                            className="solidButton add buttonBlue"
                            onClick={() => {
                                toggleAddModal(true)
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
