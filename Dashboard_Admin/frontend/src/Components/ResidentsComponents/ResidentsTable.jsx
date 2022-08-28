import React, { useState } from 'react';
import Residents from './ResidentsTableContents';
import PageNumber from './ResidentsPageNumber';
import useFetch from "../usFetch";

import Modal from "../CommonComponents/Modal"
//FOR SNACKBAR
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

import UpdateResident from "./UpdateResident"
import AddFamilyMember from "./AddResident"

const Table = (props) => {
    // const { data: residentsList, error, isPending } = useFetch("http://localhost:8001/Residents");
    const residentsList = props.list
    const [currentPage, setCurrentPage] = useState(1);
    const residentsPerPage = 5;
    //Get Id of selected Resident
    const [residentID, setResidentID] = useState(0);

    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
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

    //Delete Resident
    // const handleDelete = () => {
    // console.log(residentID)
    //     fetch('http://localhost:8001/Residents/' + residentID, {
    //         method: 'DELETE'
    //     }).then(() => {
    //         console.log('Resident Deleted');
    //         window.location.reload(false);
    //     })
    // }
    if (residentsList) {

        const residents = residentsList

        // Get current residents
        let indexOfLastResident = currentPage * residentsPerPage;
        let indexOfFirstResident = indexOfLastResident - residentsPerPage;
        let currentResidents;
        currentResidents = residents.slice(indexOfFirstResident, indexOfLastResident);

        // Change page
        const paginate = pageNumber => setCurrentPage(pageNumber);

        //get resident id
        const getResidentID = id => setResidentID(id);
        const getAction = action => setAction(action);
        const getModal = modal => setShowModal(modal);
        const getDelete = del => setShowDeleteModal(del)
        const getLastName = last => setLastName(last)
        const getFirstName = first => setFirstName(first)
        const getSnack = snack => toggleSnackbar(snack)
        const getID = get => setResidentID(get)
        let setSelectedResident = residents.findIndex(res => res.id === residentID)
        // const [toggle, setToggle] = useState(true)
        // const getToggle = tog => setToggle(tog)
        return (
            <div>
                {/* View or Update */}
                {action !== "addMember" && (
                    residents[residentID - 1] && (
                        <UpdateResident
                            shown={showModal}
                            setShown={getModal}
                            action={action} resident={residents[residentID - 1]}
                            length={residents.length}
                            returnID={getID}
                            snackbar ={getSnack}
                        />
                    )
                )}

                {/* Add Family Member */}
                {action === "addMember" && (
                    <AddFamilyMember shown={showModal} setShown={getModal} action={action} />
                )}

                {/* Delete Resident */}
                <Modal
                    shown={showDeleteModal}
                    close={() => {
                        setShowDeleteModal(false);
                    }}>
                    <div className="deleteModals">
                        <h2> Remove Resident?</h2>
                        <div>
                            <p>{`Are you sure you want to remove ${lastName}, ${firstName}? All data removed are archived and can be restored.`}</p>
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
                                    toggleDeletesnackbar(true)
                                    document.getElementById("topBlur").className = "topbar flex-row";
                                    document.getElementById("sideBlur").className = "sidebar";
                                    document.getElementById("ResidentcontentBlur").className = "resident";
                                    document.getElementById("headerBlur").className = "header";
                                    residentsList.splice(setSelectedResident, 1)
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
                    message={`${lastName}, ${firstName} has been updated!`}
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
                    message={`${lastName}, ${firstName} has been removed!`}
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
                    <table className='Residents_table'>
                        <thead>
                            <tr>
                                <td><h4>HEAD OF THE FAMILY</h4> </td>
                                <td><h4>STATUS</h4></td>
                                <td><h4>ACTION</h4></td>
                            </tr>
                        </thead>
                        <tbody>
                            {currentResidents.map((currentResidents, index) => {
                                return (
                                    <Residents
                                        key={index}
                                        residents={currentResidents}
                                        id={getResidentID}
                                        action={getAction}
                                        flag={getModal}
                                        del={getDelete}
                                        lastName={getLastName}
                                        firstName={getFirstName}
                                    />
                                )
                            })}
                            {/* <Residents
                                residents={currentResidents}
                                id={getResidentID}
                                action={getAction}
                                flag={getModal}
                                del={getDelete}
                                lastName={getLastName}
                                firstName={getFirstName}
                            /> */}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>
                                    <h4>Total Residents: {residents.length}</h4>
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