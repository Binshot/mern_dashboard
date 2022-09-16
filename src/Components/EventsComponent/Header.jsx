import React, { useState } from "react"
import Modal from "../CommonComponents/Modal"
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from "../NewImageFiles/Sidebar/Events.svg"
import SearchIcon from '@mui/icons-material/Search';
import Print from "../NewImageFiles/Topbar/Print.svg"

import Box from '@mui/material/Box';
import uploadEventBanner from "../NewImageFiles/Event/uploadEventBanner.svg"

import Autocomplete from '@mui/material/Autocomplete';
import TextField from "@mui/material/TextField";

//FOR SNACKBAR
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

//Context
import { useEventContext } from "../../hooks/useEventContext"

import format from 'date-fns/format'

function Header() {
    const [AddmodalShown, toggleAddModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const tagOption = ['Business', 'Work', 'Legal', 'Community'];

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

    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventTag, setEventTag] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [timeFrom, setTimeFrom] = useState("");
    const [timeTo, setTimeTo] = useState("");
    const [file, setFile] = useState(null);

    //context dispatch
    const { dispatch } = useEventContext()

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();

        var eventImage = "";
        if (eventTitle && file) {
            const fileExtension = file.name.substring(file.name.lastIndexOf('.'));
            const regex = /[!*'();:@&=+$,/?%#\\[\]\s]/gm;
            const fileName = eventTitle.replaceAll(regex, "+").toLowerCase();
            eventImage = fileName + fileExtension;
        }

        const eventObj = {
            eventTitle, eventDescription, eventTag, eventLocation, dateFrom, dateTo, timeFrom, timeTo, eventImage
        };

        const formData = new FormData();
        formData.append('eventInfo', JSON.stringify(eventObj));
        formData.append('file', file);

        try {
            const response = await fetch('https://drims-demo.herokuapp.com/api/events/', {
                method: 'POST',
                body: formData
            })
            const json = await response.json();
            console.log(json);

            if (!response.ok) {
                setIsLoading(false)
            }

            if (response.ok) {
                toggleSnackbar(true)
                console.log('new event added:', json)
                toggleAddModal(false)
                document.getElementById("topBlur").className = "topbar flex-row";
                document.getElementById("sideBlur").className = "sidebar";
                document.getElementById("ResidentcontentBlur").className = "resident";
                document.getElementById("headerBlur").className = "header";
                setIsLoading(false)
                dispatch({ type: 'CREATE_EVENT', payload: json })

            }
        } catch (error) {
            console.log(error);
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
                    <div className="eventModals">
                        <h2 className="marginBottom">Add Event</h2>
                        <Box sx={{ width: '100%', height: '400px', overflow: 'auto', paddingRight: '10px', mb: 4, borderBottom: 1, borderColor: '#9C9C9C' }}>
                            <div className="flex-column">
                                <h4>Tittle</h4>
                                <input
                                    type="text"
                                    placeholder="Input Title"
                                    required
                                    onChange={(e) => setEventTitle(e.target.value)}
                                    className='marginBottom'
                                    disabled={isLoading}
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
                                        renderInput={(params) => <TextField {...params} placeholder="Choose Tag" required />}
                                        required
                                        onChange={(event, newValue) => {
                                            setEventTag(newValue);
                                        }}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="flex-column">
                                    <h4>Location</h4>
                                    <TextField
                                        id="outlined-multiline-static"
                                        placeholder="Input Location"
                                        required
                                        sx={{ width: 330 }}
                                        onChange={(e) => setEventLocation(e.target.value)}
                                        disabled={isLoading}

                                    />
                                </div>
                            </div>
                            <div style={{ marginBottom: "16px" }}>
                                <h4>Description</h4>
                                <TextField
                                    id="outlined-multiline-static"
                                    placeholder="Input Description"
                                    multiline
                                    rows={6}
                                    fullWidth
                                    required
                                    inputProps={{
                                        maxLength: 400
                                    }}
                                    onChange={(e) => setEventDescription(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                            <h4>Events Banner</h4>
                            <div className="uploadArticleBanner" style={{ marginBottom: "16px" }}>
                                <label className="fileUpload">
                                    <div className="flex-row fileUploadContent">
                                        <div className="flex-row">
                                            <img src={uploadEventBanner} alt="" />
                                            <div className="flex-column">
                                                <h4>Upload an image or drag and drop here</h4>
                                                <p>JPG or PNG, smaller than 10MB</p>
                                            </div>
                                        </div>

                                        <div className="upload" style={{ cursor: "pointer" }}>Upload</div>
                                    </div>
                                    <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} required />
                                </label>
                            </div>
                            <div className="flex-row space-between marginBottom" style={{ marginBottom: "16px" }}>
                                <div>
                                    <h4>Start Date</h4>
                                    <TextField
                                        id="date"
                                        type="date"
                                        sx={{ width: '330px' }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        required
                                        placeholder="Input start Date"
                                        value={dateFrom}
                                        onChange={(e) => setDateFrom(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div>
                                    <h4>End Date</h4>
                                    <TextField
                                        id="date"
                                        type="date"
                                        sx={{ width: '330px' }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        required
                                        onChange={(e) => setDateTo(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <div className="flex-row space-between marginBottom" >
                                <div>
                                    <h4>Start Time</h4>
                                    <TextField
                                        id="time"
                                        type="time"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        sx={{ width: '330px' }}
                                        required
                                        value={timeFrom}
                                        onChange={(e) => setTimeFrom(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div>
                                    <h4>End Time</h4>
                                    <TextField
                                        id="time"
                                        type="time"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        sx={{ width: '330px' }}
                                        required
                                        onChange={(e) => setTimeTo(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>

                            </div>

                        </Box>
                        <div className="ModalButtons rightAlign">
                            <button className="solidButton buttonBlue" type="submit" disabled={isLoading}>
                                Add
                            </button>
                            <button
                                disabled={isLoading}
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

                        </div>
                    </div>
                </form>
            </Modal>

            <Snackbar
                open={snackbar}
                onClose={() => { toggleSnackbar(false) }}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={5000}
                message={`${eventTitle} has been added!`}
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
                        <button className="solidButton add buttonBlue">
                            <img src={AddIcon} alt="" />
                            <p>Add Event</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
