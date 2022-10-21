import React, { useState, useEffect } from 'react'
import Avatar from "../NewImageFiles/Resident/Avatar.svg"
import View from "../NewImageFiles/ActionButton/View.svg"
import Update from "../NewImageFiles/ActionButton/Update.svg"
import Delete from "../NewImageFiles/ActionButton/Delete.svg"
import Woman from "../NewImageFiles/Resident/Woman.svg"

import FamilyModal from "./FamilyMembersModal/ViewUpdate"

import Modal from "../CommonComponents/Modal"
//FOR SNACKBAR
import { Snackbar, IconButton, Button, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

//context
import { useResidentContext } from "../../hooks/userResidentContext"

function ViewFamilyInformation(props) {

    const { residents, dispatch } = useResidentContext()
    const [familyMembers, setfamilyMembers] = useState(null)
    const [loading, setLoading] = useState(false)

    const [showFamilyModal, setshowFamilyModal] = useState(false)
    const getShowFamilyModal = show => setshowFamilyModal(show)
    const [FamAction, setFamAction] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(null);

    //FOR SNACKBAR
    const [snackbar, toggleSnackbar] = useState(false);
    const getShowSnackbar = snack => toggleSnackbar(snack)
    const [Deletesnackbar, toggleDeletesnackbar] = useState(false);

    const [selectedFamMember, setSelectedFamMember] = useState(null)

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

    const [memberRelationship, setFamilyRelationship] = useState('')

    // handle family member delete
    const handleDelete = async () => {
        setLoading(true)
        const response = await fetch('https://drims-demo.herokuapp.com/api/residents/'
            + selectedFamMember._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if (response.ok) {
            toggleDeletesnackbar(true)
            setLoading(false)
            setShowDeleteModal(false)
            dispatch({ type: 'DELETE_RESIDENT_MEMBER', payload: json })

            //Deleted a member of the family
            fetch('https://drims-demo.herokuapp.com/api/activity/', {
                method: 'POST',
                body: JSON.stringify({ activity: "Deleted a member of the family: " + selectedFamMember.lastName + ", " + selectedFamMember.firstName }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            setLoading(false)
        }
    }

    const [updatedResident, setUpdatedResident] = useState(null)
    const getName = name => setUpdatedResident(name)

    useEffect(() => {
        const fetchResidents = async () => {
            const response = await fetch('https://drims-demo.herokuapp.com/api/residents/members/' +
                props.familyHead._id)
            const json = await response.json()
            if (response.ok) {
                setfamilyMembers(json)
            }
        }

        fetchResidents()

    }, [residents])
    return (
        <div>
            {/* view or update family member */}
            {selectedFamMember && showFamilyModal && (
                <FamilyModal
                    shown={showFamilyModal}
                    setShown={getShowFamilyModal}
                    action={FamAction}
                    resident={selectedFamMember}
                    relation={memberRelationship}
                    snackbar={getShowSnackbar}
                    name={getName}
                />
            )}

            {/* Delete Resident */}
            {selectedFamMember && (
                <Modal shown={showDeleteModal} >
                    <div className="deleteModals">
                        <h2> Remove Family Member?</h2>
                        <div>
                            <p>
                                Are you sure you want to remove <span style={{ fontWeight: "bold" }}>{selectedFamMember.lastName}, {selectedFamMember.firstName}</span>? All data removed are archived
                                and can be restored.
                            </p>
                        </div>
                        <div className="rightAlign ModalButtons">
                            <button
                                className="solidButton buttonRed"
                                onClick={() => handleDelete()}
                                disabled={loading}>
                                Remove
                            </button>
                            <button
                                className="borderedButton"
                                onClick={() => setShowDeleteModal(false)}
                                disabled={loading}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {selectedFamMember && (
                <Snackbar
                    open={snackbar}
                    onClose={() => { toggleSnackbar(false) }}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={2000}
                    message={`${updatedResident} information has been updated!`}
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
            {selectedFamMember && (
                <Snackbar
                    open={Deletesnackbar}
                    onClose={() => { toggleDeletesnackbar(false) }}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={2000}
                    message={`${selectedFamMember.lastName}, ${selectedFamMember.firstName} has been removed!`}
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

            {familyMembers && <>
                {familyMembers.length !== 0 ? (
                    <div className='flex-column'>
                        {familyMembers.map(({ member_data, relationship }) => {
                            return (
                                <div className='flex-row viewFamilyMemberContainer' key={member_data._id}>
                                    <img style={{ height: "100px", width: "100px", marginRight: "16px", borderRadius: "50%" }}
                                        src={member_data.accountImage
                                            ? `https://drims-demo.herokuapp.com/api/uploads/${member_data.accountImage}`
                                            : Avatar}
                                    />
                                    <div className='flex-column' style={{ justifyContent: "center", flexGrow: "1" }}>
                                        <h4>{member_data.lastName + ", " + member_data.firstName + " " + member_data.middleName}</h4>
                                        <h5 style={{ fontSize: "14px", color: "#9C9C9C", fontWeight: "normal" }}>
                                            {relationship}
                                        </h5>
                                    </div>
                                    <div className='flex-row actions' style={{ alignContent: "center", justifyContent: "center" }}>
                                        <Tooltip title="View" arrow>
                                            <button
                                                style={{ marginRight: "16px" }}
                                                className="solidButton squareButton buttonGreen"
                                                type='button'
                                                onClick={() => {
                                                    setSelectedFamMember(member_data)
                                                    setFamAction("view")
                                                    setshowFamilyModal(true)
                                                    setFamilyRelationship(relationship)
                                                }}>
                                                <img src={View} alt="" />
                                            </button>
                                        </Tooltip>
                                        <Tooltip title="Update" arrow>
                                            <button
                                                style={{ marginRight: "16px" }}
                                                className="solidButton squareButton buttonBlue"
                                                type='button'
                                                onClick={() => {
                                                    setSelectedFamMember(member_data)
                                                    setshowFamilyModal(true)
                                                    setFamAction("edit")
                                                    setFamilyRelationship(relationship)
                                                }} >
                                                <img src={Update} alt="" />
                                            </button>
                                        </Tooltip>
                                        <Tooltip title="Delete" arrow>
                                            <button className='delete squareButton'
                                                type='button'
                                                onClick={() => {
                                                    setSelectedFamMember(member_data)
                                                    setShowDeleteModal(true)
                                                }}>
                                                <img src={Delete} alt="" />
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) :
                    <div className='flex-column' style={{ padding: "0 100px" }}>
                        <div className='flex-row' style={{ justifyContent: "center", flexGrow: "1" }} >
                            <img src={Woman} alt="" style={{ width: "140px", marginBottom: "10px" }} />
                        </div>
                        <p style={{ fontSize: "20px", lineHeight: "140%", textAlign: "center" }}>
                            There are no relatives for <span style={{ fontWeight: "bold" }}>{props.familyHead.lastName}, {props.familyHead.firstName}</span>. <br />
                            Relatives are listed if the Head of the family added their own family members
                        </p>
                    </div>
                }
            </>}
        </div>
    )
}

export default ViewFamilyInformation
