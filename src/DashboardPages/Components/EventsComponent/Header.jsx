import React, { useState, useRef } from "react"
import Modal from "../CommonComponents/Modal"
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from "../NewImageFiles/Sidebar/Events.svg"
import SearchIcon from '@mui/icons-material/Search';
import Print from "../NewImageFiles/Topbar/Print.svg"
import axios from "axios";
import Box from '@mui/material/Box';
import uploadEventBanner from "../NewImageFiles/Event/uploadEventBanner.svg"

import Autocomplete from '@mui/material/Autocomplete';
import TextField from "@mui/material/TextField";

//FOR SNACKBAR
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

//Context
import { useEventContext } from "../../hooks/useEventContext"

import imageIcon from "../NewImageFiles/Event/imageIcon.svg"

import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../printPDF/EventsToPrint';
function Header(props) {
    const [AddmodalShown, toggleAddModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

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

    const xButton = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                    changed ? setCancelModal(true) : toggleAddModal(false)
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    // set time now
    // new Date().toLocaleString().slice(12, 17)
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventTag, setEventTag] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [dateFrom, setDateFrom] = useState(new Date().toISOString().slice(0, 10));
    const [dateTo, setDateTo] = useState();
    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState("");
    const [file, setFile] = useState(null);

    //context dispatch
    const { events, dispatch } = useEventContext()

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
            const response = await fetch(process.env.REACT_APP_API_URL + '/events/', {
                method: 'POST',
                body: formData
            })
            const json = await response.json();

            if (response.ok) {
                toggleSnackbar(true)
                console.log('new event added:', json)
                toggleAddModal(false)
                setFile(null)
                setName('')
                setTotalSize('')
                setUploadButtonFlag(true)
                setProgressflag(true)
                setUploadedFlag(true)
                setIsLoading(false)
                dispatch({ type: 'CREATE_EVENT', payload: json })

                //Add an Event
                const activity = "Added an Event: " + eventTitle
                const content = { activity }
                fetch(process.env.REACT_APP_API_URL + '/activity/', {
                    method: 'POST',
                    body: JSON.stringify({ activity: "Added an Event: " + eventTitle }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                setIsLoading(false)
                setError(json.error)
                setEmptyFields(json.emptyFields)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const requestSearch = (searchedVal) => {
        const filteredRows = events.filter((row) => {
            return row.eventTitle.toLowerCase().includes(searchedVal.toLowerCase());
        });
        props.get(filteredRows)
    };

    // image upload
    const [totalSize, setTotalSize] = useState('')
    const [name, setName] = useState('')
    const [percent, setPercent] = useState(0)
    const [progressFlag, setProgressflag] = useState(false)
    const [uploadedFlag, setUploadedFlag] = useState(false)
    const [uploadButtonFlag, setUploadButtonFlag] = useState(true)
    const [previewImage, setPreviewImage] = useState(false)
    const [imageURL, setImageURL] = useState(null)
    const [cancelModal, setCancelModal] = useState(false)
    const [changed, setChanged] = useState(false)
    const inputRef = useRef();
    const onImageUpload = (image) => {
        setProgressflag(true)
        setUploadButtonFlag(false)
        console.log("hello")

        setImageURL(URL.createObjectURL(image))
        setName(image.name)

        const config = {
            onUploadProgress: function (progressEvent) {
                setPercent(Math.floor((progressEvent.loaded / progressEvent.total) * 100))
                setTotalSize((progressEvent.total / 1000000).toFixed(2) + "MB")
            }
        }
        axios.post("https://httpbin.org/post", image, config)
            .then(res => {
                setProgressflag(false)
                setUploadedFlag(true)
            })
            .catch(err => console.log(err))
    }

    const deleteImage = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                    setFile(null)
                    setUploadButtonFlag(true)
                    setUploadedFlag(false)
                    setProgressflag(false)
                    inputRef.value = ''
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const xButtonPreview = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                    setPreviewImage(false)
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const cancelForm = () => {
        toggleAddModal(false)
        setError(null)
        setEmptyFields([])
        setFile(null)
        setName('')
        setTotalSize('')
        setUploadButtonFlag(true)
        setProgressflag(false)
        setUploadedFlag(false)
        setChanged(false)
        setCancelModal(false)
        setDateFrom(new Date().toISOString().slice(0, 10))
        setDateTo('')
        setTimeFrom('')
        setTimeTo('')
        setEventTitle('')
        setEventDescription('')
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
                    <div className="eventModals">
                        <div className='modalHeader'>
                            <h2 className="marginBottom">Add Event</h2>
                            {xButton}
                        </div>

                        <Box sx={{ width: '100%', height: '400px', overflow: 'auto', paddingRight: '10px', mb: 4, borderBottom: 1, borderColor: '#9C9C9C' }}>
                            <div className="flex-column">
                                <h4>Tittle</h4>
                                <TextField
                                    error={emptyFields.includes('Event Title') ? true : false}
                                    disabled={isLoading}
                                    placeholder="Input Title"
                                    maxLength={10}
                                    style={{ width: "100%", marginBottom: "16px" }}
                                    onChange={(e) => {
                                        eventTitle.length != 80 && setEventTitle(e.target.value)
                                        setChanged(true)
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {`${eventTitle.length}/80`}
                                            </InputAdornment>
                                        ),
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
                            <div className="flex-row space-between marginBottom">
                                <div className="flex-column">
                                    <h4>Tag</h4>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={tagOption}
                                        renderInput={(params) => <TextField {...params} placeholder="Choose Tag" error={emptyFields.includes('Event Tag') ? true : false} />}
                                        onChange={(event, newValue) => {
                                            setEventTag(newValue);
                                            setChanged(true)
                                        }}
                                        disabled={isLoading}
                                        sx={{
                                            width: 340,
                                            "& .MuiOutlinedInput-root:hover": {
                                                "& > fieldset": {
                                                    borderColor: "#7175F4"
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <div className="flex-column">
                                    <h4>Location</h4>
                                    <TextField
                                        error={emptyFields.includes('Event Location') ? true : false}
                                        id="outlined-multiline-static"
                                        placeholder="Input Location"
                                        onChange={(e) => {
                                            setEventLocation(e.target.value)
                                            setChanged(true)
                                        }}
                                        disabled={isLoading}
                                        sx={{
                                            width: 340,
                                            "& .MuiOutlinedInput-root:hover": {
                                                "& > fieldset": {
                                                    borderColor: "#7175F4"
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <div style={{ marginBottom: "16px" }}>
                                <h4>Description</h4>
                                <div style={{ position: "relative" }}>
                                    <TextField
                                        error={emptyFields.includes('Event Description') ? true : false}
                                        id="outlined-multiline-static"
                                        placeholder="Input Description"
                                        multiline
                                        rows={6}
                                        fullWidth
                                        onChange={(e) => {
                                            eventDescription.length != 400 && setEventDescription(e.target.value)
                                            setChanged(true)
                                        }}
                                        disabled={isLoading}
                                        sx={{
                                            "& .MuiOutlinedInput-root:hover": {
                                                "& > fieldset": {
                                                    borderColor: "#7175F4"
                                                }
                                            }
                                        }}
                                    />
                                    <div style={{ position: "absolute", right: "14px", bottom: "14px", color: '#636363' }}>
                                        {`${eventDescription.length}/400`}
                                    </div>
                                </div>
                            </div>
                            <h4>Events Banner</h4>
                            <Modal
                                shown={previewImage}
                                close={() => {
                                    setPreviewImage(false);
                                }}>
                                <div className="previewImage" >
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                        {xButtonPreview}
                                        <img src={imageURL} />
                                    </div>
                                </div>
                            </Modal>
                            {/* upload image */}
                            <div className="uploadArticleBanner" style={uploadButtonFlag ? { marginBottom: "16px" } : { display: "none", marginBottom: "16px" }}>
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
                                    <input type="file" accept="image/*"
                                        onChange={(e) => {
                                            setFile(e.target.files[0])
                                            e.target.files.length > 0 && onImageUpload(e.target.files[0])
                                            setChanged(true)
                                        }} />
                                </label>
                            </div>
                            {/* uploading image */}
                            <section className="progress-area" style={progressFlag ? { display: "flex" } : { display: "none" }}>
                                <img src={imageIcon} alt="" />
                                <div className="center-div">
                                    <div className="progress-details">
                                        <span id="fileName">{name}</span>
                                        <span id="fileSize">{totalSize}</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress" style={{ width: `${percent}%` }}></div>
                                    </div>
                                </div>
                                <div>{deleteImage}</div>
                            </section>
                            {/* uploaded image */}
                            <section className="uploaded-area" style={uploadedFlag ? { display: "flex" } : { display: "none" }}>
                                <img src={imageIcon} alt="" />
                                <div className="center-div">
                                    <div className="progress-details">
                                        <div className="left">
                                            <span>{name}</span>
                                            <div />
                                            <button type="button" onClick={() => setPreviewImage(true)}>Preview</button>
                                        </div>
                                        <span>{totalSize}</span>
                                    </div>
                                </div>
                                <div>{deleteImage}</div>
                            </section>
                            <div className="flex-row space-between marginBottom" style={{ marginBottom: "16px" }}>
                                <div>
                                    <h4>Start Date</h4>
                                    <TextField
                                        error={emptyFields.includes('Event Date (from)') ? true : false}
                                        id="date"
                                        type="date"
                                        inputProps={{
                                            min: new Date().toISOString().slice(0, 10)
                                        }}
                                        placeholder="Input start Date"
                                        value={dateFrom}
                                        onChange={(e) => {
                                            setDateFrom(e.target.value)
                                            setChanged(true)
                                        }}
                                        disabled={isLoading}
                                        sx={{
                                            width: 340,
                                            "& .MuiOutlinedInput-root:hover": {
                                                "& > fieldset": {
                                                    borderColor: "#7175F4"
                                                }
                                            }
                                        }}
                                    />

                                </div>
                                <div>
                                    <h4>End Date</h4>
                                    <TextField
                                        error={emptyFields.includes('Event Date (to)') ? true : false}
                                        id="date"
                                        type="date"
                                        inputProps={{
                                            min: new Date(dateFrom).toISOString().slice(0, 10)
                                        }}
                                        onChange={(e) => {
                                            setDateTo(e.target.value)
                                            setChanged(true)
                                        }}
                                        disabled={isLoading}
                                        sx={{
                                            width: 340,
                                            "& .MuiOutlinedInput-root:hover": {
                                                "& > fieldset": {
                                                    borderColor: "#7175F4"
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex-row space-between marginBottom" >
                                <div>
                                    <h4>Start Time</h4>
                                    <TextField
                                        error={emptyFields.includes('Event Time (from)') ? true : false}
                                        id="time"
                                        type="time"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        defaultValue={"00:00:00"}
                                        // value={timeFrom}
                                        onChange={(e) => {
                                            setTimeFrom(e.target.value)
                                            setChanged(true)
                                        }}
                                        disabled={isLoading}
                                        sx={{
                                            width: 340,
                                            "& .MuiOutlinedInput-root:hover": {
                                                "& > fieldset": {
                                                    borderColor: "#7175F4"
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <div>
                                    <h4>End Time</h4>
                                    <TextField
                                        error={emptyFields.includes('Event Time (to)') ? true : false}
                                        id="time"
                                        type="time"
                                        defaultValue={"00:01:00"}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => {
                                            setTimeTo(e.target.value)
                                            setChanged(true)
                                        }}
                                        disabled={isLoading}
                                        sx={{
                                            width: 340,
                                            "& .MuiOutlinedInput-root:hover": {
                                                "& > fieldset": {
                                                    borderColor: "#7175F4"
                                                }
                                            }
                                        }}
                                    />
                                </div>

                            </div>

                        </Box>
                        <div className='bottomPartModal'>
                            <div className="ModalButtons rightAlign">
                                <button className="solidButton buttonBlue" type="submit" disabled={isLoading}>
                                    Add
                                </button>
                                <button
                                    disabled={isLoading}
                                    type="button"
                                    className="borderedButton"
                                    onClick={() => {
                                        changed ? setCancelModal(true) : cancelForm()
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

            <div id='headerBlur' className='header'>
                <div className="flex-row borderBottom2 topHeader">
                    <h1>EVENTS</h1>
                </div>
                <div className="flex-row headerActions bottomHeader">
                    <div style={{ flexGrow: "9" }}>
                        <TextField
                            id="outlined-multiline-static"
                            placeholder="Search events title"
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
                        <div style={{ display: "none" }}><ComponentToPrint ref={componentRef} list={events} /></div>
                        <button
                            className="solidButton add buttonBlue"
                            onClick={() => {
                                toggleAddModal(true)
                            }}>
                            <img src={AddIcon} alt="" />
                            <p>Add Events</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
