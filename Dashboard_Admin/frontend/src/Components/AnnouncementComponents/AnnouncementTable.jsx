import React, { useState } from 'react';
import Residents from './AnnouncementTableContents';
import PageNumber from './AnnouncementPageNumber';
import useFetch from "../usFetch";

import Modal from "../CommonComponents/Modal"
import TextField from "@mui/material/TextField";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

//FOR SNACKBAR
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

const Table = (props) => {
    // const { data: residentsList, error, isPending } = useFetch("http://localhost:8002/Announcement");
    const residentsList = props.list
    const [currentPage, setCurrentPage] = useState(1);
    const residentsPerPage = 5;
    //Get Id of selected Resident
    const [residentID, setResidentID] = useState(null);
    //Set action flag
    const [action, setAction] = useState(null);
    const [showModal, setShowModal] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(null);

    //FOR SNACKBAR
    const [snackbar, toggleSnackbar] = useState(false);
    const [Deletesnackbar, toggleDeletesnackbar] = useState(false);

    //For Modal contents
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')

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

    //Delete Resident

    if (residentsList) {

        const residents = residentsList

        // Get current residents
        let indexOfLastResident = currentPage * residentsPerPage;
        let indexOfFirstResident = indexOfLastResident - residentsPerPage;
        let currentResidents;
        currentResidents = residents.slice(indexOfFirstResident, indexOfLastResident);

        // Change page
        const paginate = pageNumber => setCurrentPage(pageNumber);

        const getResidentID = id => setResidentID(id);
        const getAction = action => setAction(action);
        const getModal = modal => setShowModal(modal);
        const getDelete = del => setShowDeleteModal(del)
        const getTitle = title => setTitle(title)
        const getDes = des => setDescription(des)
        const getDate = date => setDate(date)
        const getTime = time => setTime(time)
        let setSelectedAnnouncement = residents.findIndex(res => res.id === residentID)

        const handleUpdate = () => {
            residentsList[residentID-1].title = title
            residentsList[residentID-1].description = description
            residentsList[residentID-1].dateSched = date
            residentsList[residentID-1].timeSched = time
        }

        return (
            <div>
                {/* View/Update Announcement */}
                <Modal
                    shown={showModal}
                    close={() => {
                        setShowModal(false);
                    }}>
                    <div className="announcementModals">
                        <h2 className="marginBottom">{action === "view" ? "View" : "Update"}  Announcement</h2>
                        <div className="flex-column addAnnouncement">
                            <div>
                                <h4>Tittle</h4>
                                <TextField
                                    id="outlined-multiline-static"
                                    placeholder="Input Description"
                                    multiline
                                    defaultValue={title}
                                    rows={1}
                                    fullWidth
                                    inputProps={{
                                        maxLength: 80
                                    }}
                                    disabled={action === "view" ? true : false}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <h4>Description (Optional)</h4>
                                <TextField
                                    id="outlined-multiline-static"
                                    placeholder="Input Description"
                                    multiline
                                    defaultValue={description}
                                    rows={7}
                                    fullWidth
                                    inputProps={{
                                        maxLength: 400
                                    }}
                                    disabled={action === "view" ? true : false}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="flex-row space-between">
                                <div className="flex-column inputs">
                                    <h4>Schedule Date Post</h4>
                                    <TextField
                                        id="date"
                                        type="date"
                                        defaultValue={date}
                                        sx={{ width: 338 }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        disabled={action === "view" ? true : false}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                                <div className="flex-column inputs">
                                    <h4>Schedule Time Post</h4>
                                    <TextField
                                        id="time"
                                        type="time"
                                        defaultValue={time}
                                        disabled={action === "view" ? true : false}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                        sx={{ width: 338 }}
                                        onChange={(e) => setTime(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="rightAlign ModalButtons">
                            <button
                                className="borderedButton"
                                onClick={() => {
                                    setShowModal(false)
                                    document.getElementById("topBlur").className = "topbar flex-row";
                                    document.getElementById("sideBlur").className = "sidebar";
                                    document.getElementById("contentBlur").className = "resident";
                                    document.getElementById("headerBlur").className = "header";
                                }}>
                                Cancel
                            </button>
                            <button
                                className="solidButton buttonBlue"
                                hidden={action === "view" ? "hidden" : ""}
                                onClick={() => {
                                    setShowModal(false)
                                    document.getElementById("topBlur").className = "topbar flex-row";
                                    document.getElementById("sideBlur").className = "sidebar";
                                    document.getElementById("contentBlur").className = "resident";
                                    document.getElementById("headerBlur").className = "header";
                                    handleUpdate()
                                    toggleSnackbar(true)
                                }}>
                                Update
                            </button>
                        </div>
                    </div>
                </Modal>

                {/* Delete Resident */}
                <Modal
                    shown={showDeleteModal}
                    close={() => {
                        setShowDeleteModal(false);
                    }}>
                    <div className="deleteModals">
                        <h2> Remove Announcement?</h2>
                        <div>
                            <p>Are you sure you want to remove this announcement? All data removed are archived and can be restored.</p>
                        </div>
                        <div className="rightAlign ModalButtons">
                            <button
                                className="borderedButton"
                                onClick={() => {
                                    setShowDeleteModal(false)
                                    document.getElementById("topBlur").className = "topbar flex-row";
                                    document.getElementById("sideBlur").className = "sidebar";
                                    document.getElementById("contentBlur").className = "resident";
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
                                    document.getElementById("contentBlur").className = "resident";
                                    document.getElementById("headerBlur").className = "header";
                                    toggleDeletesnackbar(true)
                                    residentsList.splice(setSelectedAnnouncement, 1)
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
                    message={`${title} information has been updated!`}
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

                <div id='contentBlur' className='resident'>
                    {/* {isPending && <div>Loading...</div>}
                    {error && <div>{error}</div>} */}
                    <table className='Announcement_table'>
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
                                residents={currentResidents}
                                id={getResidentID}
                                action={getAction}
                                flag={getModal}
                                del={getDelete}
                                title={getTitle}
                                description={getDes}
                                date={getDate}
                                time={getTime}
                            />
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={2}>
                                    <h4>Total Announcement: {residents.length}</h4>
                                </td>
                                <td colSpan={2}>
                                    <PageNumber
                                        residentsPerPage={residentsPerPage}//ResidentPerPage
                                        totalResidents={residents.length}
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