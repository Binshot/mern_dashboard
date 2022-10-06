import React, { useState, useRef } from 'react';
import Residents from './TableContents';
import PageNumber from './PageNumber';

import Modal from "../CommonComponents/Modal"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from "@mui/material/TextField";
import axios from "axios";

//FOR SNACKBAR
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Box from '@mui/material/Box';
import uploadEventBanner from "../NewImageFiles/Event/uploadEventBanner.svg"
import { useEventContext } from "../../hooks/useEventContext"

import { format } from 'date-fns'

import imageIcon from "../NewImageFiles/Event/imageIcon.svg"

const Table = (props) => {

    //get all announcement
    const { dispatch } = useEventContext()

    const events = props.list
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 5;

    //Get Id of selected Resident
    // const [eventTitle, setEventTitle] = useState("");
    const eventTitle = useRef()
    const eventDescription = useRef()
    const eventTag = useRef()
    const eventLocation = useRef()
    const dateFrom = useRef()
    const dateTo = useRef()
    const timeFrom = useRef()
    const timeTo = useRef()
    const [file, setFile] = useState(null);

    //get Selected Event
    const [selectedEvent, setSelectedEvent] = useState('')

    //set loading state of update button
    const [isLoading, setIsLoading] = useState(false)

    //Set action flag
    const [action, setAction] = useState("");

    //set modal state
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [cancelModal, setCancelModal] = useState(false)
    const [changed, setChanged] = useState(false)

    const [totalSize, setTotalSize] = useState('')
    const [name, setName] = useState('')
    const [percent, setPercent] = useState(0)
    const [progressFlag, setProgressflag] = useState(false)
    const [uploadedFlag, setUploadedFlag] = useState(true)
    const [uploadButtonFlag, setUploadButtonFlag] = useState(false)
    const [imageURL, setImageURL] = useState(null)

    //FOR SNACKBAR
    const [snackbar, toggleSnackbar] = useState(false);
    const [Deletesnackbar, toggleDeletesnackbar] = useState(false);

    const tag = ['Business', 'Work', 'Legal', 'Community'];

    const actionButton = (
        <React.Fragment>
            {/* <Button size="small"
                onClick={() => {
                    toggleSnackbar(false)
                    toggleDeletesnackbar(false)
                }}>
                <p style={{ color: "white", margin: 0 }}>Undo</p>
            </Button> */}
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                    toggleSnackbar(false)
                    toggleDeletesnackbar(false)
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    // Delete Announcement
    const handleDelete = async () => {

        const response = await fetch('https://drims-demo.herokuapp.com/api/events/'
            + selectedEvent._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_EVENT', payload: json })
            console.log(json)
            //Delete an Event
            const activity = "Deleted an Event: " + selectedEvent.eventTitle
            const content = { activity }
            fetch('https://drims-demo.herokuapp.com/api/activity/', {
                method: 'POST',
                body: JSON.stringify(content),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    const xButton = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                    changed ? setCancelModal(true) : setShowModal(false)
                    setShowDeleteModal(false)
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const deleteImage = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                    setUploadedFlag(false)
                    setFile(null)
                    setUploadButtonFlag(true)
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

    const [previewImage, setPreviewImage] = useState(false)

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();

        var eventImage = "";
        if (eventTitle && file) {
            const fileExtension = file.name.substring(file.name.lastIndexOf('.'));
            const regex = /[!*'();:@&=+$,/?%#\\[\]\s]/gm;
            const fileName = eventTitle.current.value.replaceAll(regex, "+").toLowerCase();
            eventImage = fileName + fileExtension;
        }

        const eventObj = {
            eventTitle: eventTitle.current.value,
            eventDescription: eventDescription.current.value,
            eventTag: eventTag.current.value,
            eventLocation: eventLocation.current.value,
            dateFrom: dateFrom.current.value,
            dateTo: dateTo.current.value,
            timeFrom: timeFrom.current.value,
            timeTo: timeTo.current.value,
            eventImage: eventImage
        };

        const formData = new FormData();
        formData.append('eventInfo', JSON.stringify(eventObj));
        formData.append('file', file);

        try {
            const response = await fetch('https://drims-demo.herokuapp.com/api/events/' +
                selectedEvent._id, {
                method: 'PATCH',
                body: formData
            })
            const json = await response.json();

            if (response.ok) {
                toggleSnackbar(true)
                console.log('upated an:', json)
                setShowModal(false)
                setFile(null)
                setName('')
                setTotalSize('')
                setUploadButtonFlag(false)
                setProgressflag(false)
                setUploadedFlag(true)
                setIsLoading(false)
                setImageURL(null)
                setChanged(false)
                dispatch({ type: 'UPDATE_EVENT', payload: json })

                //Add an Event
                const activity = "Updated an Event: " + eventTitle
                const content = { activity }
                fetch('https://drims-demo.herokuapp.com/api/activity/', {
                    method: 'POST',
                    body: JSON.stringify(content),
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

    const onImageUpload = (image) => {
        setProgressflag(true)
        setUploadButtonFlag(false)

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

    if (events) {
        // Get current events
        let indexOfLastEvents = currentPage * eventsPerPage;
        let indexOfFirstEvents = indexOfLastEvents - eventsPerPage;
        let currentEvents;
        currentEvents = events.slice(indexOfFirstEvents, indexOfLastEvents);

        // Change page
        const paginate = pageNumber => setCurrentPage(pageNumber);

        //get resident id
        const getAction = action => setAction(action);
        const getModal = modal => setShowModal(modal);
        const getDelete = del => setShowDeleteModal(del)
        const getSelectedEvent = event => setSelectedEvent(event)

        return (
            <div>

                {/* View/Update Events */}
                {showModal && (
                    <Modal
                        shown={showModal}
                        close={() => {
                            setShowModal(false);
                        }}>
                        <form onSubmit={handleSubmit}>
                            <div className="eventModals">
                                <div className='modalHeader'>
                                    <h2 className="marginBottom">{action == 'view' ? "View Event" : "Update Event"}</h2>
                                    {xButton}
                                </div>
                                <Box sx={{ width: '100%', height: '400px', overflow: 'auto', paddingRight: '10px', mb: 4, borderBottom: 1, borderColor: '#9C9C9C' }}>
                                    <div className="flex-column">
                                        <h4>Tittle</h4>
                                        {action == 'view' ?
                                            <TextField
                                                defaultValue={selectedEvent.eventTitle}
                                                disabled
                                            /> :
                                            <TextField
                                                id="outlined-multiline-static"
                                                defaultValue={selectedEvent.eventTitle}
                                                inputRef={eventTitle}
                                                disabled={action == 'view' ? true : false}
                                                sx={{
                                                    "& .MuiOutlinedInput-root:hover": {
                                                        "& > fieldset": {
                                                            borderColor: "#7175F4"
                                                        }
                                                    }
                                                }}
                                                onChange={(e) => {
                                                    setChanged(true)
                                                }}
                                            />
                                        }
                                    </div>
                                    <div className="flex-row space-between marginBottom" style={{ marginTop: "16px" }}>
                                        <div className="flex-column">
                                            <h4>Tag</h4>
                                            {action != 'view' ?
                                                <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    options={tag}
                                                    sx={{
                                                        width: 340,
                                                        "& .MuiOutlinedInput-root:hover": {
                                                            "& > fieldset": {
                                                                borderColor: "#7175F4"
                                                            }
                                                        }
                                                    }}
                                                    renderInput={(params) => <TextField {...params} inputRef={eventTag} />}
                                                    defaultValue={selectedEvent.eventTag}
                                                    onChange={(e) => {
                                                        setChanged(true)
                                                    }}
                                                />
                                                :
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    sx={{ width: 340 }}
                                                    value={selectedEvent.eventTag}
                                                    disabled
                                                />
                                            }
                                        </div>
                                        <div className="flex-column">
                                            <h4>Location</h4>
                                            {action == 'view' ?
                                                <TextField
                                                    defaultValue={selectedEvent.eventLocation}
                                                    disabled
                                                    sx={{ width: 340 }}
                                                /> :
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    placeholder="Input Location"
                                                    sx={{
                                                        width: 340,
                                                        "& .MuiOutlinedInput-root:hover": {
                                                            "& > fieldset": {
                                                                borderColor: "#7175F4"
                                                            }
                                                        }
                                                    }}
                                                    defaultValue={selectedEvent.eventLocation}
                                                    inputRef={eventLocation}
                                                    onChange={(e) => {
                                                        setChanged(true)
                                                    }}
                                                />
                                            }
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: "16px" }}>
                                        <h4>Description</h4>
                                        {action == 'view' ?
                                            <TextField
                                                defaultValue={selectedEvent.eventTitle}
                                                disabled
                                                rows={6}
                                                fullWidth
                                                multiline
                                            /> :
                                            <TextField
                                                id="outlined-multiline-static"
                                                placeholder="Input Description"
                                                multiline
                                                rows={6}
                                                fullWidth
                                                defaultValue={selectedEvent.eventDescription}
                                                inputRef={eventDescription}
                                                inputProps={{
                                                    maxLength: 400
                                                }}
                                                sx={{
                                                    "& .MuiOutlinedInput-root:hover": {
                                                        "& > fieldset": {
                                                            borderColor: "#7175F4"
                                                        }
                                                    }
                                                }}
                                                onChange={(e) => {
                                                    setChanged(true)
                                                }}
                                            />
                                        }
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
                                                <img src={imageURL ? imageURL : "https://drims-demo.herokuapp.com/api/uploads/" + selectedEvent.eventImage} />
                                            </div>
                                        </div>
                                    </Modal>
                                    {action == "view" &&
                                        <section className="uploaded-area view">
                                            <div className='imageIcon' />
                                            <div className="center-div">
                                                <div className="progress-details">
                                                    <div className="left">
                                                        <span>{selectedEvent.eventImage}</span>
                                                        <div />
                                                        <button
                                                            type="button"
                                                            onClick={() => setPreviewImage(true)}>
                                                            Preview
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div><CloseIcon fontSize="small" /></div>
                                        </section>}
                                    {action != "view" && uploadedFlag &&
                                        <section className="uploaded-area" style={{ borderColor: "#7175F4" }} >
                                            <img src={imageIcon} alt="" />
                                            <div className="center-div">
                                                <div className="progress-details">
                                                    <div className="left">
                                                        <span>{imageURL ? name : selectedEvent.eventImage}</span>
                                                        <div />
                                                        <button type="button" onClick={() => setPreviewImage(true)}>Preview</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>{deleteImage}</div>
                                        </section>
                                    }
                                    {action != "view" && uploadButtonFlag &&
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
                                                <input type="file" accept="image/*"
                                                    onChange={(e) => {
                                                        setFile(e.target.files[0])
                                                        onImageUpload(e.target.files[0])
                                                        setChanged(true)
                                                    }} />
                                            </label>
                                        </div>
                                    }
                                    {action != "view" && progressFlag &&
                                        <section className="progress-area" style={{ display: "flex" }}>
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
                                    }


                                    <div className="flex-row space-between marginBottom" style={{ marginBottom: "16px" }}>
                                        <div className="flex-column">
                                            <h4>Start Date</h4>
                                            {action == 'view' ?
                                                <TextField
                                                    defaultValue={format(new Date(selectedEvent.eventDateTime.from), 'MMMM dd, yyyy')}
                                                    disabled
                                                    style={{ width: '340px' }}
                                                /> : <TextField
                                                    id="date"
                                                    type="date"
                                                    sx={{
                                                        width: 340,
                                                        "& .MuiOutlinedInput-root:hover": {
                                                            "& > fieldset": {
                                                                borderColor: "#7175F4"
                                                            }
                                                        }
                                                    }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    defaultValue={format(new Date(selectedEvent.eventDateTime.from), 'yyyy-MM-dd')}
                                                    inputRef={dateFrom}
                                                    onChange={(e) => {
                                                        setChanged(true)
                                                    }}
                                                />
                                            }
                                        </div>
                                        <div>
                                            <h4>End Date</h4>
                                            {action == 'view' ?
                                                <TextField
                                                    defaultValue={format(new Date(selectedEvent.eventDateTime.to), 'MMMM dd, yyyy')}
                                                    disabled
                                                    style={{ width: '340px' }}
                                                /> :
                                                <TextField
                                                    id="date"
                                                    type="date"
                                                    sx={{
                                                        width: 340,
                                                        "& .MuiOutlinedInput-root:hover": {
                                                            "& > fieldset": {
                                                                borderColor: "#7175F4"
                                                            }
                                                        }
                                                    }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}

                                                    defaultValue={format(new Date(selectedEvent.eventDateTime.to), 'yyyy-MM-dd')}
                                                    inputRef={dateTo}
                                                    onChange={(e) => {
                                                        setChanged(true)
                                                    }}
                                                />
                                            }
                                        </div>
                                    </div>
                                    <div className="flex-row space-between marginBottom" >
                                        <div>
                                            <h4>Start Time</h4>
                                            {action == 'view' ?
                                                <TextField
                                                    defaultValue={format(new Date(selectedEvent.eventDateTime.from.substr(0, 23)), 'hh:mm aa')}
                                                    disabled
                                                    style={{ width: '340px' }}
                                                /> :
                                                <TextField
                                                    id="time"
                                                    type="time"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    sx={{
                                                        width: 340,
                                                        "& .MuiOutlinedInput-root:hover": {
                                                            "& > fieldset": {
                                                                borderColor: "#7175F4"
                                                            }
                                                        }
                                                    }}
                                                    defaultValue={format(new Date(selectedEvent.eventDateTime.from.substr(0, 23)), 'HH:mm')}
                                                    inputRef={timeFrom}
                                                    onChange={(e) => {
                                                        setChanged(true)
                                                    }}
                                                />
                                            }
                                        </div>
                                        <div>
                                            <h4>End Time</h4>
                                            {action == 'view' ?
                                                <TextField
                                                    defaultValue={format(new Date(selectedEvent.eventDateTime.to.substr(0, 23)), 'hh:mm aa')}
                                                    disabled
                                                    style={{ width: '340px' }}
                                                /> :
                                                <TextField
                                                    id="time"
                                                    type="time"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    sx={{
                                                        width: 340,
                                                        "& .MuiOutlinedInput-root:hover": {
                                                            "& > fieldset": {
                                                                borderColor: "#7175F4"
                                                            }
                                                        }
                                                    }}
                                                    defaultValue={format(new Date(selectedEvent.eventDateTime.to.substr(0, 23)), 'HH:mm')}
                                                    inputRef={timeTo}
                                                    onChange={(e) => {
                                                        setChanged(true)
                                                    }}
                                                />
                                            }
                                        </div>
                                    </div>
                                </Box>
                                <div className="ModalButtons rightAlign">
                                    <button
                                        hidden={action == "view" ? true : false}
                                        disabled={isLoading}
                                        className="solidButton buttonBlue"

                                        type={'submit'}>
                                        Update
                                    </button>
                                    <button
                                        className="borderedButton"
                                        onClick={() => {
                                            changed ? setCancelModal(true) : setShowModal(false)
                                        }}
                                        type='button'>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Modal>
                )
                }

                {/* Delete Resident */}
                <Modal
                    shown={showDeleteModal}
                    close={() => {
                        setShowDeleteModal(false);
                    }}>
                    <div className="deleteModals">
                        <div className='modalHeader'>
                            <h2> Remove Event?</h2>
                            {xButton}
                        </div>
                        <div>
                            <p>Are you sure you want to remove this Event? All data removed are archived and can be restored.</p>
                        </div>
                        <div className="rightAlign ModalButtons">
                            <button
                                className="solidButton buttonRed"
                                onClick={() => {
                                    setShowDeleteModal(false)
                                    toggleDeletesnackbar(true)
                                    handleDelete()
                                }}>
                                Remove
                            </button>
                            <button
                                className="borderedButton"
                                onClick={() => {
                                    setShowDeleteModal(false)
                                }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>

                {/* update snackbar */}
                <Snackbar
                    open={snackbar}
                    onClose={() => { toggleSnackbar(false) }}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={2000}
                    message={`${selectedEvent.eventTitle} information has been updated!`}
                    ContentProps={{
                        sx: {
                            background: "#DBB324",
                            width: 560,
                            ml: 30,
                            mt: 10
                        }
                    }}
                    action={actionButton}
                />
                {/* delete snackbar */}
                <Snackbar
                    open={Deletesnackbar}
                    onClose={() => { toggleDeletesnackbar(false) }}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={2000}
                    message={`${selectedEvent.eventTitle} has been removed!`}
                    ContentProps={{
                        sx: {
                            background: "#D82727",
                            width: 560,
                            ml: 30,
                            mt: 10
                        }
                    }}
                    action={actionButton}
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
                                You have made changes that haven’t been saved yet. Do you still want to quit?
                            </p>
                        </div>
                        <div className="rightAlign ModalButtons">
                            <button
                                className="solidButton buttonRed"
                                onClick={() => {
                                    setCancelModal(false)
                                    setChanged(false)
                                    setShowModal()
                                    setFile(null)
                                    setImageURL(null)
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

                <div id='ResidentcontentBlur' className='resident'>
                    <table className='Events_table'>
                        <thead>
                            <tr>
                                <td><h4>Title</h4> </td>
                                <td><h4>Date</h4></td>
                                <td><h4>Time</h4></td>
                                <td><h4>Status</h4></td>
                                <td><h4>No. of Participants</h4></td>
                                <td><h4>ACTION</h4></td>
                            </tr>
                        </thead>
                        <tbody>
                            <Residents
                                events={currentEvents}
                                action={getAction}
                                flag={getModal}
                                del={getDelete}
                                selectedEvents={getSelectedEvent}
                            />
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4}>
                                    <h4>Total Events: {events.length}</h4>
                                </td>
                                <td colSpan={2}>
                                    <PageNumber
                                        eventsPerPage={eventsPerPage}
                                        totalEvents={events.length}
                                        paginate={paginate}
                                    />
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div >
        );
    }
};

export default Table;