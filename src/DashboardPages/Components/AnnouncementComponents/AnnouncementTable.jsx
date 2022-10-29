import React, { useEffect, useState } from 'react';
import AnnouncementTableContents from './AnnouncementTableContents';
import PageNumber from './AnnouncementPageNumber';

import Modal from "../CommonComponents/Modal"
import { TextField, InputAdornment } from "@mui/material";

//FOR SNACKBAR
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useAnnouncementContext } from "../../hooks/useAnnouncementContext"

const Table = (props) => {
    //get all announcement
    const { announcements, dispatch } = useAnnouncementContext()

    const announcement = props.list
    const [currentPage, setCurrentPage] = useState(1);
    const announcementsPerPage = 10;
    //Get Id of selected Resident
    const [announcementID, setAnnouncementID] = useState(null);
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

    const [cancelModal, setCancelModal] = useState(false)
    const [changed, setChanged] = useState(false)

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
    )

    if (announcement && announcements) {

        // Get current announcement
        let indexOfLastResident = currentPage * announcementsPerPage;
        let indexOfFirstResident = indexOfLastResident - announcementsPerPage;
        let currentAnnouncement;
        currentAnnouncement = announcement.slice(indexOfFirstResident, indexOfLastResident);

        // Change page
        const paginate = pageNumber => setCurrentPage(pageNumber);

        const getAnnouncementID = id => setAnnouncementID(id);
        const getAction = action => setAction(action);
        const getModal = modal => setShowModal(modal);
        const getDelete = del => setShowDeleteModal(del)
        const getTitle = title => setTitle(title)
        const getDes = des => setDescription(des)

        // Delete Announcement
        const handleDelete = async () => {

            const response = await fetch(process.env.REACT_APP_API_URL + '/announcements/'
                + announcementID, {
                method: 'DELETE'
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'DELETE_ANNOUNCEMENT', payload: json })
                props.get(announcements)
                //delete announcement
                fetch(process.env.REACT_APP_API_URL + '/activity/', {
                    method: 'POST',
                    body: JSON.stringify({ activity: "Deleted an announcement: " + title }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
        }

        // Update Announcement
        const handleUpdate = async () => {

            const response = await fetch(process.env.REACT_APP_API_URL + '/announcements/'
                + announcementID, {
                method: 'PATCH',
                body: JSON.stringify({
                    announcementTitle: title,
                    announcementDetail: description
                }),
                headers: {
                    'Content-Type': 'application/json'
                }

            })

            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'UPDATE_ANNOUNCEMENT', payload: json })

                //update announcement
                fetch(process.env.REACT_APP_API_URL + '/activity/', {
                    method: 'POST',
                    body: JSON.stringify({ activity: "Updated an announcement: " + title }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
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
                        <div className='modalHeader'>
                            <h2>{action === "view" ? "View" : "Update"}  Announcement</h2>
                            {xButton}
                        </div>
                        <div className="flex-column addAnnouncement">
                            <div>
                                <h4>Tittle</h4>
                                {action === "view" ?
                                    <div style={{ position: "relative" }}>
                                        <TextField
                                            defaultValue={title}
                                            disabled
                                            fullWidth
                                        />
                                        <div style={{ position: "absolute", right: "14px", top: "18px", color: '#636363' }}>
                                            {`${title.length}/80`}
                                        </div>
                                    </div> :
                                    <TextField
                                        id="outlined-multiline-static"
                                        defaultValue={title}
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {`${title.length}/80`}
                                                </InputAdornment>
                                            ),
                                        }}
                                        onChange={(e) => {
                                            title.length != 80 && setTitle(e.target.value)
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
                                }
                            </div>
                            <div>
                                <h4>Description (Optional)</h4>
                                {action === "view" ?
                                    <div style={{ position: "relative" }}>
                                        <TextField
                                            id="outlined-multiline-static"
                                            defaultValue={description}
                                            rows={7}
                                            fullWidth
                                            disabled
                                            multiline
                                            // sx={{backgroundColor: "#d4d4d4"}}
                                        />
                                        <div style={{ position: "absolute", right: "14px", bottom: "14px", color: '#636363' }}>
                                            {`${description.length}/400`}
                                        </div>
                                    </div>
                                    :
                                    <div style={{ position: "relative" }}>
                                        <TextField
                                            id="outlined-multiline-static"
                                            multiline
                                            defaultValue={description}
                                            rows={7}
                                            fullWidth
                                            onChange={(e) => {
                                                description.length != 400 && setDescription(e.target.value)
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
                                        <div style={{ position: "absolute", right: "14px", bottom: "14px", color: '#636363' }}>
                                            {`${description.length}/400`}
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="rightAlign ModalButtons" style={{ marginTop: "23px" }}>
                            <button
                                className="solidButton buttonBlue"
                                hidden={action === "view" ? "hidden" : ""}
                                onClick={() => {
                                    setShowModal(false)
                                    handleUpdate()
                                    toggleSnackbar(true)
                                }}>
                                Update
                            </button>
                            <button
                                className="borderedButton"
                                onClick={() => {
                                    changed ? setCancelModal(true) : setShowModal(false)
                                }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>

                {/* Delete Resident */}
                <Modal
                    shown={showDeleteModal}
                    close={() => {
                        setShowDeleteModal(false)
                    }}>
                    <div className="deleteModals">
                        <div className='modalHeader'>
                            <h2> Remove Announcement?</h2>
                            {xButton}
                        </div>
                        <div>
                            <p>Are you sure you want to remove this announcement? All data removed won’t be restored.</p>
                        </div>
                        <div className="rightAlign ModalButtons">
                            <button
                                className="solidButton buttonRed"
                                onClick={() => {
                                    setShowDeleteModal(false)
                                    handleDelete()
                                    toggleDeletesnackbar(true)
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
                    onClose={() => {
                        toggleDeletesnackbar(false)
                    }}
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
                                    setShowModal(false)
                                    setChanged(false)
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
                            <AnnouncementTableContents
                                announcement={currentAnnouncement}
                                id={getAnnouncementID}
                                action={getAction}
                                flag={getModal}
                                del={getDelete}
                                title={getTitle}
                                description={getDes}
                            />
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={2}>
                                    <h4>Total Announcement: {announcement.length}</h4>
                                </td>
                                <td colSpan={2}>
                                    <PageNumber
                                        announcementsPerPage={announcementsPerPage}//ResidentPerPage
                                        totalAnnouncement={announcement.length}
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