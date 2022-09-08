import React, { useState } from "react"
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
import Button from '@mui/material/Button';

//context
import { useAnnouncementContext } from "../../hooks/useAnnouncementContext"
function Header() {

    const [AddmodalShown, toggleAddModal] = useState(false);

    //context dispatch
    const { dispatch } = useAnnouncementContext()

    //FOR SNACKBAR
    const [snackbar, toggleSnackbar] = useState(false);
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
    const [announcementTitle, setTitle] = useState('')
    const [announcementDetail, setDescription] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const announcement = { announcementTitle, announcementDetail }

        toggleAddModal(false)
        document.getElementById("topBlur").className = "topbar flex-row";
        document.getElementById("sideBlur").className = "sidebar";
        document.getElementById("contentBlur").className = "resident";
        document.getElementById("headerBlur").className = "header";


        const response = await fetch('https://drims-demo.herokuapp.com/api/announcements/', {
            method: 'POST',
            body: JSON.stringify(announcement),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(JSON.stringify(announcement))
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            toggleSnackbar(true)
            setError(null)
            console.log('new announcement added:', json)
            dispatch({ type: 'CREATE_ANNOUNCEMENT', payload: json })
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
                    <div className="announcementModals">
                        <h2 className="marginBottom">Add Announcement</h2>
                        <div className="flex-column addAnnouncement">
                            <div>
                                <h4>Title</h4>
                                <TextField
                                    id="outlined-multiline-static"
                                    placeholder="Input Title"
                                    multiline
                                    rows={1}
                                    fullWidth
                                    inputProps={{
                                        maxLength: 80
                                    }}
                                    value={announcementTitle}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <h4>Description (Optional)</h4>
                                <TextField
                                    id="outlined-multiline-static"
                                    placeholder="Input Description"
                                    multiline
                                    rows={7}
                                    fullWidth
                                    inputProps={{
                                        maxLength: 400
                                    }}
                                    value={announcementDetail}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        {/*Button*/}
                        <div className="rightAlign ModalButtons" style={{ marginTop: "23px" }}>
                            <button
                                type="button"
                                className="borderedButton"
                                onClick={() => {
                                    toggleAddModal(false)
                                    setDescription('')
                                    setTitle('')
                                    document.getElementById("topBlur").className = "topbar flex-row";
                                    document.getElementById("sideBlur").className = "sidebar";
                                    document.getElementById("contentBlur").className = "resident";
                                    document.getElementById("headerBlur").className = "header";
                                }}>
                                Cancel
                            </button>
                            <button className="solidButton buttonBlue" type="submit">
                                Add
                            </button>
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

            <div id='headerBlur' className='header'>
                <div className="flex-row borderBottom2 topHeader">
                    <h1>ANNOUNCEMENTS</h1>
                </div>
                <div className="flex-row headerActions bottomHeader">
                    <div style={{ flexGrow: "9" }}>
                        <TextField
                            id="outlined-multiline-static"
                            placeholder="Search for Name, Position, Email..."
                            sx={{ backgroundColor: "white" }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
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
                            <p>Add Announcement</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
