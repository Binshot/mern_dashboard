import React, { useEffect, useState } from 'react';
import Residents from './TableContents';
import PageNumber from './PageNumber';

import Modal from "../CommonComponents/Modal"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from "@mui/material/TextField";

//FOR SNACKBAR
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import uploadEventBanner from "../NewImageFiles/Event/uploadEventBanner.svg"
import { useEventContext } from "../../hooks/useEventContext"

import format from 'date-fns/format'

const Table = () => {

    //get all announcement
    const { events, dispatch } = useEventContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('https://drims-demo.herokuapp.com/api/events/')
            const json = await response.json()
            if (response.ok) {
                dispatch({ type: 'SET_EVENT', payload: json })
            }
        }

        fetchWorkouts()
    }, [dispatch])

    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 5;

    //Get Id of selected Resident
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventTag, setEventTag] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [timeFrom, setTimeFrom] = useState("");
    const [timeTo, setTimeTo] = useState("");
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

    //FOR SNACKBAR
    const [snackbar, toggleSnackbar] = useState(false);
    const [Deletesnackbar, toggleDeletesnackbar] = useState(false);

    const tag = ['Business', 'Work', 'Legal', 'Community'];

    const actionButton = (
        <React.Fragment>
            <Button size="small"
                onClick={() => {
                    toggleSnackbar(false)
                    toggleDeletesnackbar(false)
                }}>
                <p style={{ color: "white", margin: 0 }}>Undo</p>
            </Button>
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
        }
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

                {/* View/Update Resident */}
                {showModal && (
                    <Modal
                        shown={showModal}
                        close={() => {
                            setShowModal(false);
                        }}>
                        <div className="eventModals">
                            <h2 className="marginBottom">{action === 'view' ? "View Event" : "Update Event"}</h2>
                            <Box sx={{ width: '100%', height: '400px', overflow: 'auto', paddingRight: '10px', mb: 4, borderBottom: 1, borderColor: '#9C9C9C' }}>
                                <div className="flex-column">
                                    <h4>Tittle</h4>
                                    <input
                                        type="text"
                                        placeholder="Input Title"
                                        required
                                        defaultValue={selectedEvent.eventTitle}
                                        onChange={(e) => setEventTitle(e.target.value)}
                                        className='marginBottom'
                                        disabled={action === 'view' ? true : false}
                                    />
                                </div>
                                <div className="flex-row space-between marginBottom">
                                    <div className="flex-column">
                                        <h4>Tag</h4>
                                        {action !== 'view' ?
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={tag}
                                                sx={{ width: 330 }}
                                                renderInput={(params) => <TextField {...params} />}
                                                required
                                                defaultValue={selectedEvent.eventTag}
                                                onChange={(event, newValue) => {
                                                    setEventTag(newValue);
                                                }}
                                            />
                                            :
                                            <TextField
                                                id="outlined-multiline-static"
                                                sx={{ width: 330 }}
                                                value={selectedEvent.eventTag}
                                                disabled={true}
                                            />
                                        }
                                    </div>
                                    <div className="flex-column">
                                        <h4>Location</h4>
                                        <TextField
                                            id="outlined-multiline-static"
                                            placeholder="Input Location"
                                            sx={{ width: 330 }}
                                            defaultValue={selectedEvent.eventLocation}
                                            onChange={(e) => setEventLocation(e.target.value)}
                                            disabled={action === 'view' ? true : false}

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
                                        defaultValue={selectedEvent.eventDescription}
                                        onChange={(e) => setEventDescription(e.target.value)}
                                        inputProps={{
                                            maxLength: 400
                                        }}
                                        disabled={action === 'view' ? true : false}

                                    />
                                </div>
                                <h4>Events Banner</h4>
                                <div className="uploadArticleBanner" style={{ marginBottom: "16px" }}>
                                    <label className="fileUpload" style={{cursor: "pointer"}}>
                                        <div className="flex-row fileUploadContent">
                                            <div className="flex-row">
                                                <img src={uploadEventBanner} alt="" />
                                                <div className="flex-column">
                                                    <h4>Upload an image or drag and drop here</h4>
                                                    <p>JPG or PNG, smaller than 10MB</p>
                                                </div>
                                            </div>
                                            <div className="upload">Upload</div>
                                        </div>
                                        <input type="file" accept="image/*" />
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
                                            defaultValue={format(new Date(selectedEvent.eventDateTime.from), 'yyyy-MM-dd')}
                                            onChange={(e) => setDateFrom(e.target.value)}
                                            disabled={action === 'view' ? true : false}

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
                                            defaultValue={format(new Date(selectedEvent.eventDateTime['to']), 'yyyy-MM-dd')}
                                            onChange={(e) => setDateTo(e.target.value)}
                                            disabled={action === 'view' ? true : false}

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
                                            defaultValue={format(new Date(selectedEvent.eventDateTime['from']), 'kk:mm')}
                                            required
                                            onChange={(e) => setTimeFrom(e.target.value)}
                                            disabled={action === 'view' ? true : false}

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
                                            defaultValue={format(new Date(selectedEvent.eventDateTime['to']), 'kk:mm')}
                                            onChange={(e) => setTimeTo(e.target.value)}
                                            disabled={action === 'view' ? true : false}

                                        />
                                    </div>

                                </div>
                            </Box>
                            <div className="ModalButtons rightAlign">
                                <button
                                    className="borderedButton"
                                    onClick={() => {
                                        setShowModal(false)
                                        document.getElementById("topBlur").className = "topbar flex-row";
                                        document.getElementById("sideBlur").className = "sidebar";
                                        document.getElementById("ResidentcontentBlur").className = "resident";
                                        document.getElementById("headerBlur").className = "header";
                                    }}>
                                    Cancel
                                </button>
                                <button
                                    hidden={action === "view" ? true : false}
                                    disabled={isLoading}
                                    className="solidButton buttonBlue"
                                    onClick={() => {
                                        setShowModal(false)
                                        document.getElementById("topBlur").className = "topbar flex-row";
                                        document.getElementById("sideBlur").className = "sidebar";
                                        document.getElementById("ResidentcontentBlur").className = "resident";
                                        document.getElementById("headerBlur").className = "header";
                                        toggleSnackbar(true)
                                        setIsLoading(true)
                                    }}>
                                    Update
                                </button>
                            </div>
                        </div>
                    </Modal>
                )}

                {/* Delete Resident */}
                <Modal
                    shown={showDeleteModal}
                    close={() => {
                        setShowDeleteModal(false);
                    }}>
                    <div className="deleteModals">
                        <h2> Remove Event?</h2>
                        <div>
                            <p>Are you sure you want to remove this Event? All data removed are archived and can be restored.</p>
                        </div>
                        <div className="rightAlign ModalButtons">
                            <button
                                className="borderedButton"
                                onClick={() => {
                                    setShowDeleteModal(false)
                                    document.getElementById("topBlur").className = "topbar flex-row";
                                    document.getElementById("sideBlur").className = "sidebar";
                                    document.getElementById("ResidentcontentBlur").className = "resident";
                                    document.getElementById("headerBlur").className = "header";
                                }}>
                                Cancel
                            </button>
                            <button
                                className="solidButton buttonRed"
                                onClick={() => {
                                    setShowDeleteModal(false)
                                    document.getElementById("topBlur").className = "topbar flex-row";
                                    document.getElementById("sideBlur").className = "sidebar";
                                    document.getElementById("ResidentcontentBlur").className = "resident";
                                    document.getElementById("headerBlur").className = "header";
                                    toggleDeletesnackbar(true)
                                    handleDelete()
                                }}>
                                Remove
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
            </div>
        );
    }
};

export default Table;