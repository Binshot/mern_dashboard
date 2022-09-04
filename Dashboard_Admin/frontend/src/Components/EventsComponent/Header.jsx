import React, { useState } from "react"
import Modal from "../CommonComponents/Modal"
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from "../NewImageFiles/Sidebar/Events.svg"
import SearchIcon from '@mui/icons-material/Search';
import Print from "../NewImageFiles/Topbar/Print.svg"

import ModalTabs from "./Tabs/tab"

import Autocomplete from '@mui/material/Autocomplete';
import TextField from "@mui/material/TextField";

//FOR SNACKBAR
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

function Header(props) {
    const [AddmodalShown, toggleAddModal] = useState(false);

    const tagOption = ['Business', 'Work', 'Legal'];

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

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tag, setTag] = useState('')
    const [location, setLocation] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    const handleSubmit = () => {
        const date = { startDate, endDate }
        const time = { startTime, endTime }
        const event = { title, description, tag, location, date, time }
        console.log(event)

        toggleAddModal(false)
        document.getElementById("topBlur").className = "topbar flex-row";
        document.getElementById("sideBlur").className = "sidebar";
        document.getElementById("ResidentcontentBlur").className = "resident";
        document.getElementById("headerBlur").className = "header";
        toggleSnackbar(true)
        props.get(event)
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

    return (
        <div>
            <Modal
                shown={AddmodalShown}
                close={() => {
                    toggleAddModal(false);
                }}>
                <form onSubmit={handleSubmit}>
                    <div className="eventModals">
                        <h2 className="marginBottom">Add Event</h2>
                        <div>
                            <div className="flex-column">
                                <h4>Tittle</h4>
                                <input
                                    type="text"
                                    placeholder="Input Title"
                                    required
                                    onChange={(e) => setTitle(e.target.value)}
                                    className='marginBottom'
                                />
                            </div>
                            <div className="flex-row space-between marginBottom">
                                <div className="flex-column">
                                    <h4>Tag</h4>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={tagOption}
                                        sx={{ width: 330 }}
                                        renderInput={(params) => <TextField {...params} placeholder="Choose Tag" />}
                                        required
                                        onChange={(event, newValue) => {
                                            setTag(newValue);
                                        }}
                                    />
                                </div>
                                <div className="flex-column">
                                    <h4>Location</h4>
                                    <TextField
                                        id="outlined-multiline-static"
                                        placeholder="Input Location"
                                        sx={{ width: 330 }}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </div>
                            </div>

                        </div>
                        {/* <div style={{ marginBottom: "16px" }}>
                            <h4>Description</h4>
                            <TextField
                                id="outlined-multiline-static"
                                placeholder="Input Description"
                                multiline
                                rows={5}
                                fullWidth
                                inputProps={{
                                    maxLength: 400
                                }}
                            />
                        </div> */}
                        <div>
                            <ModalTabs action="add" />
                        </div>
                        <div className="ModalButtons rightAlign">
                            <button
                                className="borderedButton"
                                onClick={() => {
                                    toggleAddModal(false)
                                    document.getElementById("topBlur").className = "topbar flex-row";
                                    document.getElementById("sideBlur").className = "sidebar";
                                    document.getElementById("ResidentcontentBlur").className = "resident";
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
                message="{Announcement' Tittle} has been added!"
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
                    <h1>EVENTS</h1>
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
                            document.getElementById("ResidentcontentBlur").className += " blur";
                        }}>
                        <img src={Print} alt="" className="export" style={{ cursor: "pointer" }} />
                        <div className="solidButton add buttonBlue">
                            <img src={AddIcon} alt="" />
                            <p>Add Event</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
