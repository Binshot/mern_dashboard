import React, { useState } from 'react'
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
function ViewFamilyInformation(props) {
    const item = [1, 2, 3, 4, 5]
    // const item = null

    const [showFamilyModal, setshowFamilyModal] = useState(false)
    const setShowFamilyModal = show => setshowFamilyModal(show)
    const [FamAction, setFamAction] = useState(null)
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
    return (
        <div>
            <FamilyModal shown={showFamilyModal} setShown={setShowFamilyModal} action={FamAction} resident={props.list} />

            {/* Delete Resident */}
            <Modal shown={showDeleteModal} >
                    <div className="deleteModals">
                        <h2> Remove Family Member?</h2>
                        <div>
                            <p>{`Are you sure you want to remove [Member's Name]? All data removed are archived and can be restored.`}</p>
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
                                    // residentsList.splice(residentID - 1, 1)
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
                    message="{Resident's name} information has been updated!"
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
                    message={`[Member's Name] has been removed!`}
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

            <div>
                {props.list ? (
                    <div className='flex-column'>
                        {item.map((value) => {
                            return (
                                <div className='flex-row viewFamilyMemberContainer' key={value}>
                                    <img src={avatar} alt="" style={{ height: "100px", width: "100px", marginRight: "16px" }} />
                                    <div className='flex-column' style={{ justifyContent: "center", flexGrow: "1" }}>
                                        <h4>Name</h4>
                                        <h5 style={{ fontSize: "14px", color: "#9C9C9C", fontWeight: "normal" }}>Position</h5>
                                    </div>
                                    <div className='flex-row actions' style={{ alignContent: "center", justifyContent: "center" }}>
                                        <div style={{ marginRight: "16px" }} className="solidButton squareButton buttonGreen"
                                            onClick={() => {
                                                // id(residents.id)
                                                setFamAction("view")
                                                setshowFamilyModal(true)
                                                // document.getElementById("sideBlur").className += " blur";
                                                // document.getElementById("topBlur").className += " blur";
                                                // document.getElementById("headerBlur").className += " blur";
                                                // document.getElementById("contentBlur").className += " blur";
                                            }}>
                                            <img src={View} alt="" />
                                        </div>
                                        <div style={{ marginRight: "16px" }} className="solidButton squareButton buttonBlue"
                                            onClick={() => {
                                                // id(residents.id)
                                                setshowFamilyModal(true)
                                                setFamAction("edit")
                                                // title(residents.title)
                                                // description(residents.description)
                                                // date(residents.dateSched)
                                                // time(residents.timeSched)
                                                // document.getElementById("sideBlur").className += " blur";
                                                // document.getElementById("topBlur").className += " blur";
                                                // document.getElementById("headerBlur").className += " blur";
                                                // document.getElementById("contentBlur").className += " blur";
                                            }} >
                                            <img src={Update} alt="" />
                                        </div>
                                        <div className='delete squareButton'
                                            onClick={() => {
                                                // id(residents.id)
                                                // title(residents.title)
                                                setShowDeleteModal(true)
                                                // action("delete")
                                                // document.getElementById("sideBlur").className += " blur";
                                                // document.getElementById("topBlur").className += " blur";
                                                // document.getElementById("headerBlur").className += " blur";
                                                // document.getElementById("contentBlur").className += " blur";
                                            }} >
                                            <img src={Delete} alt="" />
                                        </div>
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
                        <p style={{ fontSize: "20px", lineHeight: "140%", textAlign: "center" }}>There are no relatives for [Resident’s name]. <br />
                            Relatives are listed if the Head of the family added their own family members</p>
                    </div>
                }
            </div>

        </div>
    )
}

export default ViewFamilyInformation
