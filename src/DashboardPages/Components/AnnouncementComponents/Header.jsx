import React, { useState, useRef } from "react"
import Modal from "../CommonComponents/Modal"
import InputAdornment from '@mui/material/InputAdornment';

import Print from "../NewImageFiles/Topbar/Print.svg"

import TextField from "@mui/material/TextField";
import AddIcon from "../NewImageFiles/Sidebar/Announcement.svg"
import SearchIcon from '@mui/icons-material/Search';

//FOR SNACKBAR
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

//context
import { useAnnouncementContext } from "../../hooks/useAnnouncementContext"

import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../printPDF/AnnouncementToPrint';

function Header(props) {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const [AddmodalShown, toggleAddModal] = useState(false);

    //context dispatch
    const { announcements, dispatch } = useAnnouncementContext()

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
    const [announcementTitle, setTitle] = useState('')
    const [announcementDetail, setDescription] = useState('')

    const [cancelModal, setCancelModal] = useState(false)
    const [changed, setChanged] = useState(false)

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault()

        const announcement = { announcementTitle, announcementDetail }

        const response = await fetch('https://drims-demo.herokuapp.com/api/announcements/', {
            method: 'POST',
            body: JSON.stringify(announcement),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (response.ok) {
            toggleAddModal(false)
            setIsLoading(false)
            toggleSnackbar(true)
            setChanged(false)
            console.log('new announcement added:', json)
            dispatch({ type: 'CREATE_ANNOUNCEMENT', payload: json })

            // add activity logs
            fetch('https://drims-demo.herokuapp.com/api/activity/', {
                method: 'POST',
                body: JSON.stringify({ activity: "Added an announcement: " + announcementTitle }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            setEmptyFields(json.emptyFields)
            setIsLoading(false)
            setError(json.error)
        }
    }

    const handleCancel = () => {
        setError(null)
        setEmptyFields([])
        toggleAddModal(false)
        setDescription('')
        setTitle('')
        setChanged(false)
        setCancelModal(false)
        toggleAddModal(false)
    }

    const requestSearch = (searchedVal) => {
        const filteredRows = announcements.filter((row) => {
            return row.announcementTitle.toLowerCase().includes(searchedVal.toLowerCase());
        });
        props.get(filteredRows)
    };

    const xButton = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => { changed ? setCancelModal(true) : handleCancel() }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

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
                    <div className="announcementModals">
                        <div className='modalHeader'>
                            <h2>Add Announcement</h2>
                            {xButton}
                        </div>
                        <div className="flex-column addAnnouncement">
                            <div>
                                <h4>Title</h4>
                                <TextField
                                    id="outlined-multiline-static"
                                    error={emptyFields.includes('Announcement Title') ? true : false}
                                    placeholder="Input Title"
                                    fullWidth
                                    inputProps={{
                                        maxLength: 80
                                    }}
                                    value={announcementTitle}
                                    onChange={(e) => {
                                        setTitle(e.target.value)
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
                            <div>
                                <h4>Description (Optional)</h4>
                                <TextField
                                    id="outlined-multiline-static"
                                    error={emptyFields.includes('Announcement Detail') ? true : false}
                                    placeholder="Input Description"
                                    multiline
                                    rows={7}
                                    fullWidth
                                    inputProps={{
                                        maxLength: 400
                                    }}
                                    value={announcementDetail}
                                    onChange={(e) => {
                                        setDescription(e.target.value)
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
                        {/*Button*/}
                        <div className='bottomPartModal' style={{ marginTop: "16px" }}>
                            <div className="rightAlign ModalButtons">
                                <button className="solidButton buttonBlue" type="submit" disabled={isLoading}>
                                    Add
                                </button>
                                <button
                                    disabled={isLoading}
                                    type="button"
                                    className="borderedButton"
                                    onClick={() => {
                                        changed ? setCancelModal(true) : handleCancel()
                                    }}>
                                    Cancel
                                </button>
                            </div>
                            {error && <div className="divError">{error}</div>}
                        </div>
                    </div>
                </form>
            </Modal>

            <Snackbar
                open={snackbar}
                onClose={() => {
                    toggleSnackbar(false)
                    setDescription('')
                    setTitle('')
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={5000}
                message={`${announcementTitle} has been added!`}
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
                                handleCancel()
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

            <div id='headerBlur' className='header'>
                <div className="flex-row borderBottom2 topHeader">
                    <h1>ANNOUNCEMENTS</h1>
                </div>
                <div className="flex-row headerActions bottomHeader">
                    <div style={{ flexGrow: "9" }}>
                        <TextField
                            id="outlined-multiline-static"
                            placeholder="Search announcement title"
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
                                ),
                            }}
                            onChange={(e) => requestSearch((e.target.value).toString())}
                        />
                    </div>

                    <div className="flex-row center">
                        <div className="rightAlign actions" style={{ cursor: "pointer" }} onClick={() => handlePrint()} >
                            <img src={Print} alt="" className="export" />
                        </div>
                        <div style={{ display: "none" }}><ComponentToPrint ref={componentRef} list={announcements} /></div>
                        <button
                            className="solidButton add buttonBlue"
                            onClick={() => {
                                toggleAddModal(true)
                            }}>
                            <img src={AddIcon} alt="" />
                            <p>Add Announcement</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
