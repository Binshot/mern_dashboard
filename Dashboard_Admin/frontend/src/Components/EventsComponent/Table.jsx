import React, { useState } from 'react';
import Residents from './TableContents';
import PageNumber from './PageNumber';
import useFetch from "../usFetch";

import Modal from "../CommonComponents/Modal"
import ModalTabs from "./Tabs/tab"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from "@mui/material/TextField";

//FOR SNACKBAR
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

const Table = (props) => {
    // const { data: eventsList, error, isPending } = useFetch("http://localhost:8003/Events");
    const eventsList = props.list
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 5;
    //Get Id of selected Resident
    const [eventsID, setEventsID] = useState(null);
    const [title, setTitle] = useState('')
    //Set action flag
    const [action, setAction] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    //FOR SNACKBAR
    const [snackbar, toggleSnackbar] = useState(false);
    const [Deletesnackbar, toggleDeletesnackbar] = useState(false);

    const tag = [
        { value: 'Business', label: 'Business' },
        { value: 'Business', label: 'Business' },
        { value: 'Business', label: 'Business' }
    ];

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

    if (eventsList) {

        const events = eventsList
        // console.log(events[eventsID-1].title)

        // Get current events
        let indexOfLastEvents = currentPage * eventsPerPage;
        let indexOfFirstEvents = indexOfLastEvents - eventsPerPage;
        let currentEvents;
        currentEvents = events.slice(indexOfFirstEvents, indexOfLastEvents);

        // Change page
        const paginate = pageNumber => setCurrentPage(pageNumber);

        //get resident id
        const getEventsID = id => setEventsID(id);
        const getAction = action => setAction(action);
        const getModal = modal => setShowModal(modal);
        const getDelete = del => setShowDeleteModal(del)
        const getTitle = title => setTitle(title)
        let setSelectedEvent = events.findIndex(res => res.id === eventsID)

        //Delete Resident
        const handleDelete = () => {
            // console.log(eventsID)
            // fetch('http://localhost:8003/Events/' + eventsID, {
            //     method: 'DELETE'
            // }).then(() => {
            //     console.log('Resident Deleted');
            //     window.location.reload(false);
            // })

        }
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
                            <h2 className="marginBottom">{action === "view" ? "View Event" : "Update Event"}</h2>
                            <div>
                                <div className="flex-column">
                                    <h4>Tittle</h4>
                                    <input
                                        type="text"
                                        className='marginBottom'
                                        defaultValue={events[eventsID].title}
                                        disabled={action === 'view' ? true : false}
                                    />

                                </div>
                                <div className="flex-row space-between marginBottom">
                                    <div className="flex-column">
                                        <h4>Tag</h4>
                                        {action === 'view' && (
                                            <TextField
                                                id="date"
                                                sx={{ width: 330 }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                disabled
                                                defaultValue={events[eventsID].tag}
                                            />
                                        )}
                                        <Autocomplete
                                            options={tag}
                                            sx={{ width: 330 }}
                                            renderInput={(params) => <TextField {...params} placeholder="Choose Tag" />}
                                            defaultValue={events[eventsID].tag}
                                            hidden={action === 'view' ? true : false}
                                        />
                                    </div>
                                    <div className="flex-column">
                                        <h4>Location</h4>
                                        <TextField
                                            id="outlined-multiline-static"
                                            placeholder="Input Location"
                                            sx={{ width: 330 }}
                                            defaultValue={events[eventsID].location}
                                            disabled={action === 'view' ? true : false}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <ModalTabs action={action} startDate={events[eventsID].date.startDate} endDate={events[eventsID].date.endDate} startTime={events[eventsID].time.startTime} endTime={events[eventsID].time.endTime} />
                            </div>
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
                                    className="solidButton buttonBlue"
                                    onClick={() => {
                                        setShowModal(false)
                                        document.getElementById("topBlur").className = "topbar flex-row";
                                        document.getElementById("sideBlur").className = "sidebar";
                                        document.getElementById("ResidentcontentBlur").className = "resident";
                                        document.getElementById("headerBlur").className = "header";
                                        toggleSnackbar(true)
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
                                    eventsList.splice(setSelectedEvent, 1)
                                }}>
                                Remove
                            </button>
                        </div>
                    </div>
                </Modal>

                <Snackbar
                    open={snackbar}
                    onClose={() => { toggleSnackbar(false) }}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={2000}
                    message="{Resident's name} information has been added!"
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
                <Snackbar
                    open={Deletesnackbar}
                    onClose={() => { toggleDeletesnackbar(false) }}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={2000}
                    message={`${title} has been removed!`}
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
                    {/* {isPending && <div>Loading...</div>}
                    {error && <div>{error}</div>} */}
                    <table className='Events_table'>
                        <thead>
                            <tr>
                                <td><h4>Title</h4> </td>
                                <td><h4>Date</h4></td>
                                <td><h4>Time</h4></td>
                                <td><h4>ACTION</h4></td>
                            </tr>
                        </thead>
                        <tbody>
                            <Residents
                                events={currentEvents}
                                id={getEventsID}
                                action={getAction}
                                flag={getModal}
                                del={getDelete}
                                title={getTitle}
                            />
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={2}>
                                    <h4>Total Announcement: {events.length}</h4>
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