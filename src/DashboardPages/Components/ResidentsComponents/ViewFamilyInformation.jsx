import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import avatar from "../NewImageFiles/Resident/Avatar.svg"
import View from "../NewImageFiles/ActionButton/View.svg"
import Update from "../NewImageFiles/ActionButton/Update.svg"
import Delete from "../NewImageFiles/ActionButton/Delete.svg"
import Woman from "../NewImageFiles/Resident/Woman.svg"

import FamilyModal from "./FamilyMembersModal/ViewUpdate"

import Modal from "../CommonComponents/Modal"
//FOR SNACKBAR
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

//context
import { useResidentContext } from "../../hooks/userResidentContext"

function ViewFamilyInformation(props) {

    const { dispatch } = useResidentContext()
    const [loading, setLoading] = useState(false)

    const [showFamilyModal, setshowFamilyModal] = useState(false)
    const getShowFamilyModal = show => setshowFamilyModal(show)
    const [FamAction, setFamAction] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(null);

    //FOR SNACKBAR
    const [snackbar, toggleSnackbar] = useState(false);
    const [Deletesnackbar, toggleDeletesnackbar] = useState(false);

    const [selectedFamMember, setSelectedFamMember] = useState(null)

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

    const [memberRelationship, setFamilyRelationship] = useState('')
    console.log(memberRelationship)

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
            const activity = "Deleted a member of the family: " + selectedFamMember.lastName + ", " + selectedFamMember.firstName
            const content = { activity }
            fetch('https://drims-demo.herokuapp.com/api/activity/', {
                method: 'POST',
                body: JSON.stringify(content),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            setLoading(false)
        }
    }
    return (
        <div>
            {/* view or update family member */}
            {selectedFamMember && (
                <FamilyModal 
                shown={showFamilyModal} 
                setShown={getShowFamilyModal} 
                action={FamAction} 
                resident={selectedFamMember} 
                relation={memberRelationship}/>
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
                    message={`${selectedFamMember.lastName}, ${selectedFamMember.firstName} information has been updated!`}
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

            <div>
                {props.list.length !== 0 ? (
                    <div className='flex-column'>
                        {props.list.map((res) => {
                            return (
                                <div className='flex-row viewFamilyMemberContainer' key={res._id}>
                                    <img src={avatar} alt="" style={{ height: "100px", width: "100px", marginRight: "16px" }} />
                                    <div className='flex-column' style={{ justifyContent: "center", flexGrow: "1" }}>
                                        <h4>{res.lastName + ", " + res.firstName + " " + res.middleName}</h4>
                                        <h5 style={{ fontSize: "14px", color: "#9C9C9C", fontWeight: "normal" }}>
                                            {props.familyHead.familyMembers.filter(member => member.member_id == res._id).map(a => {
                                                return a.relationship
                                            })}
                                        </h5>
                                    </div>
                                    <div className='flex-row actions' style={{ alignContent: "center", justifyContent: "center" }}>
                                        <button
                                            style={{ marginRight: "16px" }}
                                            className="solidButton squareButton buttonGreen"
                                            type='button'
                                            onClick={() => {
                                                setSelectedFamMember(res)
                                                setFamAction("view")
                                                setshowFamilyModal(true)
                                                setFamilyRelationship(props.familyHead.familyMembers.filter(member => member.member_id == res._id).map(a => {
                                                    return a.relationship
                                                }))
                                            }}>
                                            <img src={View} alt="" />
                                        </button>
                                        <button
                                            style={{ marginRight: "16px" }}
                                            className="solidButton squareButton buttonBlue"
                                            type='button'
                                            onClick={() => {
                                                setSelectedFamMember(res)
                                                setshowFamilyModal(true)
                                                setFamAction("edit")
                                            }} >
                                            <img src={Update} alt="" />
                                        </button>
                                        <button className='delete squareButton'
                                            type='button'
                                            onClick={() => {
                                                setSelectedFamMember(res)
                                                setShowDeleteModal(true)
                                            }}>
                                            <img src={Delete} alt="" />
                                        </button>
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
            </div>

        </div>
    )
}

export default ViewFamilyInformation
