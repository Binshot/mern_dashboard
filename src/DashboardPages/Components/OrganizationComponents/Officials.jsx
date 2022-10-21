import React, { useState, useEffect } from "react"
// import Select from 'react-select';
import Avatar from "../NewImageFiles/Resident/Avatar.svg"
import View from "../NewImageFiles/ActionButton/View.svg"
import Update from "../NewImageFiles/ActionButton/Update.svg"
import Delete from "../NewImageFiles/ActionButton/Delete.svg"
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';

import Modal from "../CommonComponents/Modal"
// import useFetch from "../usFetch"

//FOR SNACKBAR
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useOrganizationContext } from "../../hooks/useOrganizationContext"

import format from "date-fns/format";
function Officials(props) {

    //get all officials
    const { dispatch } = useOrganizationContext()

    // get all resident that are officials
    const organizations = props.list
    const [modalShown, toggleModal] = useState(false);
    const [updateModalShown, toggleUpdateModal] = useState(false);
    const [deleteModal, toggleDeleteModal] = useState(false)

    const positionOptions = ['President', 'Vice President', 'Secretary', 'Treasurer', 'Auditor', 'Board Member'];
    const [snackbar, toggleSnackbar] = useState(false);
    const [deleteSnackbar, toggleDeleteSnackbar] = useState(false);

    const action = (
        <React.Fragment>
            {/* <Button size="small" onClick={() => { toggleSnackbar(false) }}>
                <p style={{ color: "white", margin: 0 }}>Undo</p>
            </Button> */}
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                    toggleSnackbar(false)
                    toggleDeleteSnackbar(false)
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const [officialAvatar, setAvatar] = useState(null)
    const [position, setPosition] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [nameOfMember, setNameOfMember] = useState('')
    const [bday, setBday] = useState('')
    const [id, setId] = useState(null)
    const [residentID, setResidentID] = useState(null)
    const [changed, setChanged] = useState(false)
    const [cancelModal, setCancelModal] = useState(false)

    // handle update official
    const handleUpdate = async () => {
        const response = await fetch('https://drims-demo.herokuapp.com/api/organization/'
            + id, {
            method: 'PATCH',
            body: JSON.stringify({
                resident_id: residentID,
                position: position
            }),
            headers: {
                'Content-Type': 'application/json'
            }

        })

        const json = await response.json()
        if (response.ok) {
            let sortPosition
            switch (json.position) {
                case "President":
                    sortPosition = 1;
                    break;
                case "Vice President":
                    sortPosition = 2;
                    break;
                case "Secretary":
                    sortPosition = 3;
                    break;
                case "Treasurer":
                    sortPosition = 4;
                    break;
                case "Auditor":
                    sortPosition = 5;
                    break;
                default:
                    sortPosition = 6;
                    break;
            }
            dispatch({ type: 'UPDATE_OFFICIAL', payload: { json, sortPosition } })
            toggleUpdateModal(false)
            toggleSnackbar(true)

            //update announcement
            fetch('https://drims-demo.herokuapp.com/api/activity/', {
                method: 'POST',
                body: JSON.stringify({ activity: "Updated an official: " + nameOfMember }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    // handle delete official
    const handleDelete = async () => {

        const response = await fetch('https://drims-demo.herokuapp.com/api/organization/'
            + id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_OFFICIAL', payload: json })
            toggleDeleteModal(false)
            toggleDeleteSnackbar(true)

            //delete announcement
            fetch('https://drims-demo.herokuapp.com/api/activity/', {
                method: 'POST',
                body: JSON.stringify({ activity: "Deleted an official: " + nameOfMember }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    const xButton = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => cancelForm()}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    const cancelForm = () => {
        toggleUpdateModal(false)
        toggleDeleteModal(false)
        setChanged(false)
    }

    if (organizations) {
        return (
            <div className="official">
                {/* View Official */}
                {modalShown && (
                    <Modal
                        shown={modalShown}
                        close={() => {
                            toggleModal(false);
                        }}
                        align="center">
                        <div>
                            <div className="modalheader">
                                <label className='label'>Detailed Information</label><br />
                            </div>
                            <div>
                                <img className="modalAvatar" style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                                    src={officialAvatar
                                        ? `https://drims-demo.herokuapp.com/api/uploads/${officialAvatar}`
                                        // ? ImageURL
                                        : Avatar}
                                />
                                <h3 style={{ fontSize: "20px" }}>{nameOfMember}</h3>
                                <div className="marginTop8">
                                    <h6 style={{ fontSize: "14px" }} >{position}</h6>
                                </div>
                            </div>
                            <div className="details leftAlign">
                                <div className="flex-row marginBottom marginTop">
                                    <h4>Details</h4>
                                </div>
                                <div className="flex-row borderBottom1 marginTop paddingBottom">
                                    <h4 style={{ width: 120, textAlign: "left" }}>Birthday:</h4>
                                    <p style={{ width: 230, textAlign: "left" }}>{format(new Date(bday), "MMMM dd, yyyy")}</p>
                                </div>
                                <div className="flex-row borderBottom1 marginTop paddingBottom">
                                    <h4 style={{ width: 120, textAlign: "left" }}>Address:</h4>
                                    <p style={{ width: 230, textAlign: "left" }}>{address}</p>
                                </div>
                                <div className="flex-row borderBottom1 marginTop paddingBottom">
                                    <h4 style={{ width: 120, textAlign: "left" }}>Email:</h4>
                                    <p style={{ textAlign: "left" }}>{email}</p>
                                </div>
                                <div className="flex-row marginTop paddingBottom">
                                    <h4 style={{ width: 120, textAlign: "left" }}>Phone No.:</h4>
                                    <p style={{ textAlign: "left" }}>{phone}</p>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className='borderedButton exit marginTop'
                                onClick={() => {
                                    toggleModal(false)
                                }}>
                                EXIT
                            </button>
                        </div>
                    </Modal>
                )}

                {/* UpdateOfficial */}
                {updateModalShown && (
                    <Modal
                        shown={updateModalShown}
                        close={() => {
                            toggleUpdateModal(false);
                        }}>
                        <div className="Editmodal officalModal">
                            <div className='modalHeader'>
                                <h2 className="marginBottom">Edit Official</h2>
                                {xButton}
                            </div>
                            <div className="flex-row addOfficial space-between">
                                <div className="selects">
                                    <h4>Resident's Name</h4>
                                    <TextField
                                        value={nameOfMember}
                                        disabled
                                        style={{ marginTop: "8px", marginBottom: "16px", width: "100%" }}
                                    />
                                    <h4 style={{ marginBottom: "8px" }}>Position</h4>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        value={position}
                                        options={positionOptions}
                                        fullWidth
                                        renderInput={(params) => <TextField {...params} />}
                                        onChange={(e, newValue) => {
                                            setPosition(newValue)
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
                                </div>

                                <div className="addOfficialDetails">
                                    <div className="modalheader">
                                        <label className='label'>Detailed Information</label><br />
                                    </div>
                                    <div className="details">
                                        <div className="addOfficialDetailsHeader">
                                            <img className="modalAvatar"
                                                src={officialAvatar
                                                    ? `https://drims-demo.herokuapp.com/api/uploads/${officialAvatar}`
                                                    // ? ImageURL
                                                    : Avatar}
                                            />
                                            <h3 style={{ fontSize: "20px" }}>{nameOfMember}</h3>
                                            <div className="marginTop8">
                                                <h6 style={{ fontSize: "14px" }} >{position}</h6>
                                            </div>
                                        </div>
                                        <div className="topAlign">
                                            <div className="flex-row marginBottom marginTop">
                                                <h3>Details</h3>
                                            </div>
                                            <div className="flex-row borderBottom1 paddingBottom">
                                                <h4 style={{ width: "30%", textAlign: "left" }}>Birthday:</h4>
                                                <p style={{ textAlign: "left" }}>{bday}</p>
                                            </div>
                                            <div className="flex-row borderBottom1 marginTop paddingBottom">
                                                <h4 style={{ width: "30%", textAlign: "left" }}>Address:</h4>
                                                <p style={{ width: "70%", textAlign: "left" }}>{address}</p>
                                            </div>
                                            <div className="flex-row borderBottom1 marginTop paddingBottom">
                                                <h4 style={{ width: "30%", textAlign: "left" }}>Email:</h4>
                                                <p style={{ textAlign: "left" }}>{email}</p>
                                            </div>
                                            <div className="flex-row marginTop paddingBottom">
                                                <h4 style={{ width: "30%", textAlign: "left" }}>Phone No.:</h4>
                                                <p style={{ textAlign: "left" }}>{phone}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="ModalButtons">
                                <button
                                    className="solidButton buttonBlue"
                                    onClick={() => {
                                        handleUpdate()
                                    }}>
                                    Update
                                </button>
                                <button
                                    className="borderedButton"
                                    onClick={() => changed ? setCancelModal(true) : cancelForm()}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Modal>
                )}

                {/* delete official */}
                <Modal
                    shown={deleteModal}
                    close={() => {
                        toggleDeleteModal(false)
                    }}>
                    <div className="deleteModals">
                        <div className='modalHeader'>
                            <h2>Remove Official?</h2>
                            {xButton}
                        </div>
                        <div>
                            <p>Are you sure you want to remove <span style={{ fontWeight: "bold" }}>{nameOfMember}</span>? All data removed won’t be restored.</p>
                        </div>
                        <div className="rightAlign ModalButtons">
                            <button
                                className="solidButton buttonRed"
                                onClick={() => {
                                    handleDelete()
                                }}>
                                Remove
                            </button>
                            <button
                                className="borderedButton"
                                onClick={() => cancelForm()}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>

                {/* update Snackbar */}
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={snackbar}
                    onClose={() => { toggleSnackbar(false) }}
                    autoHideDuration={5000}
                    message={`${nameOfMember} information has been updated!`}
                    action={action}
                    ContentProps={{
                        sx: {
                            background: "#836B16",
                            width: 560,
                            ml: 30,
                            mt: 10
                        }
                    }}
                />
                {/* delete snackbar */}
                <Snackbar
                    open={deleteSnackbar}
                    onClose={() => {
                        toggleDeleteSnackbar(false)
                    }}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={2000}
                    message={`${nameOfMember} has been removed!`}
                    ContentProps={{
                        sx: {
                            background: "#D82727",
                            width: 560,
                            ml: 30,
                            mt: 10
                        }
                    }}
                    action={action}
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
                                    cancelForm()
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

                <div id="contentBlur" className="flex-row">
                    {organizations.map((props) => {
                        return (
                            <div className="flex-column officialCard " key={props._id}>
                                <div className="avatar">
                                    <img className="modalAvatar"  style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                                        src={props.official.account_image
                                            ? `https://drims-demo.herokuapp.com/api/uploads/${props.official.account_image}`
                                            // ? ImageURL
                                            : Avatar}
                                    />
                                </div>
                                <div style={{ textOverflow: "ellipsis", overflow: "hidden", width: "180px", whiteSpace: "nowrap", fontWeight: "bold", fontSize: "20px" }}>
                                    {props.official.firstName} {props.official.lastName}
                                </div>
                                <p className="marginTop8">{props.position}</p>
                                <div className="flex-row actions">
                                    <Tooltip title="View" arrow>
                                        <button className="solidButton squareButton buttonGreen" style={{ marginRight: "16px" }}
                                            onClick={() => {
                                                setAvatar(props.official.account_image)
                                                setPosition(props.position)
                                                setAddress(props.official.address)
                                                setEmail(props.official.email)
                                                setPhone(props.official.contactNumber)
                                                setNameOfMember(props.official.firstName + " " + props.official.lastName)
                                                setBday(props.official.birthday)
                                                toggleModal(true)
                                            }}>
                                            <img src={View} alt="" />
                                        </button>
                                    </Tooltip>
                                    <Tooltip title="Update" arrow>
                                        <button className="solidButton squareButton buttonBlue" style={{ marginRight: "16px" }}
                                            onClick={() => {
                                                setPosition(props.position)
                                                setAddress(props.official.address)
                                                setEmail(props.official.email)
                                                setPhone(props.official.contactNumber)
                                                setNameOfMember(props.official.firstName + " " + props.official.lastName)
                                                setBday(props.official.birthday)
                                                setId(props._id)
                                                setResidentID(props.official._id)
                                                toggleUpdateModal(true)
                                            }}>
                                            <img src={Update} alt="" />
                                        </button>
                                    </Tooltip>
                                    <Tooltip title="Delete" arrow>
                                        <button className='delete squareButton'
                                            onClick={() => {
                                                setNameOfMember(props.official.firstName + " " + props.official.lastName)
                                                setId(props._id)
                                                toggleDeleteModal(true)
                                            }}>
                                            <img src={Delete} alt="" />
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Officials
