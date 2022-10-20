import React, { useState, useEffect } from 'react';
import Residents from './ResidentsTableContents';
import PageNumber from './ResidentsPageNumber';

import Modal from "../CommonComponents/Modal"
//FOR SNACKBAR
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

//Family Head Modals (View and Update)
import UpdateResident from "./FamilyHeadModals/UpdateHead"
import ViewResident from "./FamilyHeadModals/ViewHead"
import ChangeHeadOfTheFamily from './FamilyHeadModals/ChangeHead';

import AddFamilyMember from "./AddResident"

import { useResidentContext } from "../../hooks/userResidentContext"

const Table = (props) => {

    //get all resident
    const { dispatch } = useResidentContext()

    const residents = props.list
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
    const [greenSnackbar, setgreenSnackbar] = useState(false)
    const [Deletesnackbar, toggleDeletesnackbar] = useState(false);
    const [memberName, setMemberName] = useState('')

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
                    setgreenSnackbar(false)
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
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    const [loading, setLoading] = useState(false)

    //Handle Delete Head of The Family
    const handleDelete = async () => {
        setLoading(true)
        const response = await fetch('https://drims-demo.herokuapp.com/api/residents/'
            + selectedResident._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if (response.ok) {
            toggleDeletesnackbar(true)
            setLoading(false)
            setShowDeleteModal(false)
            dispatch({ type: 'DELETE_RESIDENT', payload: json })

            //Deleted a head of the family
            fetch('https://drims-demo.herokuapp.com/api/activity/', {
                method: 'POST',
                body: JSON.stringify({ activity: "Deleted a head of the family and its members: " + selectedResident.lastName + ", " + selectedResident.firstName }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            setLoading(false)
        }
    }

    if (residents) {

        // filter family head
        const familyHead = residents.filter(head => head.isHeadOfFamily == true)
        // Get current residents
        let indexOfLastResident = currentPage * residentsPerPage;
        let indexOfFirstResident = indexOfLastResident - residentsPerPage;
        let currentResidents;
        currentResidents = familyHead.slice(indexOfFirstResident, indexOfLastResident);

        // Change page
        const paginate = pageNumber => setCurrentPage(pageNumber);

        const getAction = action => setAction(action);
        const getModal = modal => {
            setShowModal(modal)
            setSelectedResident(null)
        }
        const getDelete = del => setShowDeleteModal(del)
        const getSelectedResident = resident => setSelectedResident(resident)
        const getSnack = snack => toggleSnackbar(snack)
        const getName = name => setMemberName(name)
        const getGreenSnackbar = snackbar => setgreenSnackbar(snackbar)
        return (
            <div>
                {/* Update Head of the Family */}
                {action == "edit" && selectedResident && (
                    <UpdateResident
                        shown={showModal}
                        setShown={getModal}
                        resident={selectedResident}
                        snackbar={getSnack}
                        allResidents={residents}
                        headName={getName}
                    />
                )}
                {action == "view" && selectedResident && (
                    <ViewResident
                        shown={showModal}
                        setShown={getModal}
                        resident={selectedResident}
                        allResidents={residents}
                    />
                )}

                {/* change head of the family modal */}
                {action == "changeHead" && selectedResident && (
                    <ChangeHeadOfTheFamily
                        shown={showModal}
                        setShown={getModal}
                        resident={selectedResident}
                        snackbar={getGreenSnackbar}
                        headName={getName}
                    />
                )}
                {/* Add Family Member */}
                {selectedResident && (
                    action == "addMember" && (
                        <AddFamilyMember shown={showModal} setShown={getModal} action={action} headID={selectedResident._id} />
                    )
                )}

                {/* Delete Resident */}
                {showDeleteModal && (
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
                )}

                {/* update head information snackbar */}
                {snackbar && (
                    <Snackbar
                        open={snackbar}
                        onClose={() => { toggleSnackbar(false) }}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        autoHideDuration={2000}
                        message={`${memberName} information has been updated!`}
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
                )}

                {/* change new head snackbar */}
                {greenSnackbar && (
                    <Snackbar
                        open={greenSnackbar}
                        onClose={() => { toggleSnackbar(false) }}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        autoHideDuration={2000}
                        message={`${memberName} is now the new Head of the Family!`}
                        ContentProps={{
                            sx: {
                                background: "#35CA3B",
                                width: 560,
                                ml: 30,
                                mt: 10
                            }
                        }}
                        action={actionButton}
                    />
                )}

                {/* delete snackbar */}
                {selectedResident && (
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
                )}

                <div id='ResidentcontentBlur' className='resident'>
                    <table className='Residents_table'>
                        <thead>
                            <tr>
                                <td><h4>HEAD OF THE FAMILY</h4> </td>
                                <td style={{ width: "305px" }}><h4>ACTION</h4></td>
                            </tr>
                        </thead>
                        <tbody>
                            {currentResidents.map((filteredHead) => {
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
                                <td >
                                    <h4>Total Families: <span style={{fontWeight: "normal"}} > {residents.filter(head => head.isHeadOfFamily == true).length} </span></h4>
                                    <h4>Total Residents: <span style={{fontWeight: "normal"}} > {residents.length} </span></h4>
                                </td>
                                <td >
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