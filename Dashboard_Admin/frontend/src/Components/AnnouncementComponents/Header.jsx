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

function Header(props) {
    const [AddmodalShown, toggleAddModal] = useState(false);

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

    const date = new Date()

    const day = ("0" + date.getDate()).slice(-2)
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const hour = ("0" + date.getHours()).slice(-2)
    const minutes = ("0" + date.getMinutes()).slice(-2)
    const currentDate = `${date.getFullYear()}-${month}-${day}`
    const currentTime = `${hour}:${minutes}`

    const id = props.length + 1
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dateSched, setDate] = useState(currentDate)
    const [timeSched, setTime] = useState(currentTime)

    const handleSubmit = () => {
        const announcement = { id, title, description, dateSched, timeSched }
        // console.log(announcement)

        toggleAddModal(false)
        document.getElementById("topBlur").className = "topbar flex-row";
        document.getElementById("sideBlur").className = "sidebar";
        document.getElementById("contentBlur").className = "resident";
        document.getElementById("headerBlur").className = "header";
        toggleSnackbar(true)

        props.get(announcement)
        //insert data to json file
        // fetch('http://localhost:8002/Announcement', {
        //     method: 'POST',
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(announcement)
        // }).then(() => {
        //     console.log('new announcement added');
        //     window.location.reload(false);
        //     toggleSnackbar(true)
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
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex-row space-between">
                                <div className="flex-column inputs">
                                    <h4>Schedule Date Post</h4>
                                    <TextField
                                        id="date"
                                        type="date"
                                        value={dateSched}
                                        placeholder="Choose Date"
                                        onChange={(e) => setDate(e.target.value)}
                                        sx={{ width: 338 }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        disabled={action === "view" ? true : false}
                                        required
                                    />
                                </div>
                                <div className="flex-column inputs">
                                    <h4>Schedule Time Post</h4>
                                    <TextField
                                        id="time"
                                        type="time"
                                        required
                                        value={timeSched}
                                        onChange={(e) => setTime(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        sx={{ width: 338 }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="rightAlign ModalButtons">
                            <button
                                type="button"
                                className="borderedButton"
                                onClick={() => {
                                    toggleAddModal(false)
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
                onClose={() => { toggleSnackbar(false) }}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={5000}
                message={`${title} has been added!`}
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
