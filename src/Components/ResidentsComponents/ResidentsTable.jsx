import React, { useState, useEffect } from 'react';
import Residents from './ResidentsTableContents';
import PageNumber from './ResidentsPageNumber';

import Modal from "../CommonComponents/Modal"
//FOR SNACKBAR
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

import UpdateResident from "./UpdateResident"
import AddFamilyMember from "./AddResident"

import { useResidentContext } from "../../hooks/userResidentContext"

const Table = () => {
    //get all resident
    const { residents, dispatch } = useResidentContext()

    useEffect(() => {
        const fetchResidents = async () => {
            const response = await fetch('https://drims-demo.herokuapp.com/api/residents/')
            const json = await response.json()
            if (response.ok) {
                dispatch({ type: 'SET_RESIDENT', payload: json })
            }
        }

        fetchResidents()
    }, [dispatch])

    const [currentPage, setCurrentPage] = useState(1);
    const residentsPerPage = 5;

    //Set action flag
    const [action, setAction] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(null);

    //FOR SNACKBAR
    const [snackbar, toggleSnackbar] = useState(false);
    const [Deletesnackbar, toggleDeletesnackbar] = useState(false);

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

    const [selectedResident, setSelectedResident] = useState('')

    const xButton = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                    setShowDeleteModal(false)
                    document.getElementById("topBlur").className = "topbar flex-row";
                    document.getElementById("sideBlur").className = "sidebar";
                    document.getElementById("ResidentcontentBlur").className = "resident";
                    document.getElementById("headerBlur").className = "header";
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    //Handle Delete Head of The Family
    const handleDelete = async () => {

        const response = await fetch('https://drims-demo.herokuapp.com/api/residents/'
            + selectedResident._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            console.log("deleted")
            dispatch({ type: 'DELETE_RESIDENT', payload: json })
        } else {
            console.log("not Delete")
        }
    }

    if (residents) {

        // Get current residents
        let indexOfLastResident = currentPage * residentsPerPage;
        let indexOfFirstResident = indexOfLastResident - residentsPerPage;
        let currentResidents;
        currentResidents = residents.slice(indexOfFirstResident, indexOfLastResident);

        // Change page
        const paginate = pageNumber => setCurrentPage(pageNumber);

        const getAction = action => setAction(action);
        const getModal = modal => setShowModal(modal);
        const getDelete = del => setShowDeleteModal(del)
        const getSelectedResident = resident => setSelectedResident(resident)
        const getSnack = snack => toggleSnackbar(snack)

        return (
            <div>
                {/* View or Update */}
                {action !== "addMember" && (
                    selectedResident && (
                        <UpdateResident
                            shown={showModal}
                            setShown={getModal}
                            action={action}
                            resident={selectedResident}
                            length={residents.length}
                            snackbar={getSnack}
                            allResidents={residents}
                        />
                    )
                )}

                {/* Add Family Member */}
                {action === "addMember" && (
                    <AddFamilyMember shown={showModal} setShown={getModal} action={action} headID={selectedResident._id}/>
                )}

                {/* Delete Resident */}
                <Modal
                    shown={showDeleteModal}
                    close={() => {
                        setShowDeleteModal(false);
                    }}>
                    <div className="deleteModals">
                        <div className='modalHeader'>
                            <h2> Remove Resident?</h2>
                            {xButton}
                        </div>
                        <div>
                            <p>Are you sure you want to remove <span style={{ fontWeight: "bold" }}>{selectedResident.lastName}, </span>
                                <span style={{ fontWeight: "bold" }}>{selectedResident.firstName}</span>? All data such as their family members
                                and account information won't be restored.</p>
                        </div>
                        <div className="rightAlign ModalButtons">
                            <button
                                className="solidButton buttonRed"
                                onClick={() => {
                                    setShowDeleteModal(false)
                                    toggleDeletesnackbar(true)
                                    document.getElementById("topBlur").className = "topbar flex-row";
                                    document.getElementById("sideBlur").className = "sidebar";
                                    document.getElementById("ResidentcontentBlur").className = "resident";
                                    document.getElementById("headerBlur").className = "header";
                                    handleDelete()
                                }}>
                                Remove
                            </button>
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
                        </div>
                    </div>
                </Modal>

                <Snackbar
                    open={snackbar}
                    onClose={() => { toggleSnackbar(false) }}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={2000}
                    message={`${selectedResident.lastName}, ${selectedResident.firstName} has been updated!`}
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
                    message={`${selectedResident.lastName}, ${selectedResident.firstName} has been removed!`}
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
                    <table className='Residents_table'>
                        <thead>
                            <tr>
                                <td><h4>HEAD OF THE FAMILY</h4> </td>
                                <td><h4>STATUS</h4></td>
                                <td><h4>ACTION</h4></td>
                            </tr>
                        </thead>
                        <tbody>
                            {currentResidents.filter(head => head.isHeadOfFamily == true).map((filteredHead) => {
                                return (
                                    <Residents
                                        key={filteredHead._id}
                                        residents={filteredHead}
                                        action={getAction}
                                        flag={getModal}
                                        del={getDelete}
                                        returnResident={getSelectedResident}
                                    />
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>
                                    <h4>Total Residents: {residents.filter(head => head.isHeadOfFamily == true).length}</h4>
                                </td>
                                <td colSpan={2}>
                                    <PageNumber
                                        residentsPerPage={residentsPerPage}
                                        totalResidents={residents.filter(head => head.isHeadOfFamily == true).length}
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