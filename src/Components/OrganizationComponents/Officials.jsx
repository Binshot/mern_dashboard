import React, { useState } from "react"
// import Select from 'react-select';
import Avatar from "../NewImageFiles/Resident/Avatar.svg"
import View from "../NewImageFiles/ActionButton/View.svg"
import Update from "../NewImageFiles/ActionButton/Update.svg"
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';

import Modal from "../CommonComponents/Modal"
// import useFetch from "../usFetch"

//FOR SNACKBAR
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

function Officials(props) {
    // const { data: officialList } = useFetch("http://localhost:8000/MembersData");
    const officialList = props.list
    const [id, setID] = useState(null)
    const [nameOfMember, setnameOfMember] = useState("");
    const [position, setPosition] = useState("");
    const [age, setAge] = useState("");
    const [bday, setBday] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const [modalShown, toggleModal] = useState(false);
    const [updateModalShown, toggleUpdateModal] = useState(false);

    const positionOptions = ['Chairman', 'Chairperson', 'Kagawad', 'SB Member', 'Member'];
    const [snackbar, toggleSnackbar] = useState(false);
    const action = (
        <React.Fragment>
            <Button size="small" onClick={() => { toggleSnackbar(false) }}>
                <p style={{ color: "white", margin: 0 }}>Undo</p>
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => { toggleSnackbar(false) }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    if (officialList) {
        const Officials = officialList
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
                                <img src={Officials[id].avatar} alt="" className="modalAvatar" />
                                <h3>{nameOfMember}</h3>
                                <div className="marginTop8">
                                    <h6 >{position}</h6>
                                </div>
                            </div>
                            <div className="details leftAlign">
                                <div className="flex-row marginBottom marginTop">
                                    <h4>Details</h4>
                                </div>
                                <div className="flex-row borderBottom1 paddingBottom">
                                    <h4 style={{ width: 120, textAlign: "left" }}>Age:</h4>
                                    <p style={{ textAlign: "left" }}>{age} years old</p>
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
                                    document.getElementById("topBlur").className = "topbar flex-row";
                                    document.getElementById("sideBlur").className = "sidebar";
                                    document.getElementById("contentBlur").className = "flex-row";
                                    document.getElementById("headerBlur").className = "header";
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
                            <h2 className="marginBottom">Update Official</h2>
                            <h4>Resident's Name</h4>
                            <div className="flex-row addOfficial space-between">
                                <div className="selects">
                                    <input type="text" value={nameOfMember} disabled style={{ marginTop: "8px", width: "90%" }} />
                                    <h4>Position</h4>
                                    <Autocomplete
                                        style={{ width: "99%" }}
                                        disablePortal
                                        id="combo-box-demo"
                                        value={position}
                                        options={positionOptions}
                                        sx={{ width: '100%' }}
                                        renderInput={(params) => <TextField {...params} />}
                                        onChange={(e, newValue) => setPosition(newValue)}
                                    />
                                </div>

                                <div className="addOfficialDetails">
                                    <div className="modalheader">
                                        <label className='label'>Detailed Information</label><br />
                                    </div>
                                    <div className="details">
                                        <div className="addOfficialDetailsHeader">
                                            <img src={Officials[id].avatar} alt="" className="modalAvatar" />
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
                                        toggleUpdateModal(false)
                                        document.getElementById("topBlur").className = "topbar flex-row";
                                        document.getElementById("sideBlur").className = "sidebar";
                                        document.getElementById("contentBlur").className = "flex-row";
                                        document.getElementById("headerBlur").className = "header";
                                        toggleSnackbar(true)
                                        officialList[id].typeOfMember = position
                                    }}>
                                    Update
                                </button>
                                <button
                                    className="borderedButton"
                                    onClick={() => {
                                        toggleUpdateModal(false)
                                        document.getElementById("topBlur").className = "topbar flex-row";
                                        document.getElementById("sideBlur").className = "sidebar";
                                        document.getElementById("contentBlur").className = "flex-row";
                                        document.getElementById("headerBlur").className = "header";
                                    }}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Modal>
                )}

                {/* Snackbar */}
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
                <div id="contentBlur" className="flex-row">
                    {Officials.map((props, index) => {
                        return (
                            <div className="flex-column officialCard " key={props.id}>
                                <div className="avatar">
                                    <img src={props.avatar === "defaultAvatar" ? Avatar : props.avatar} alt="" style={{ width: "100px" }} />
                                </div>
                                <h3>{props.name}</h3>
                                <p className="marginTop8">{props.typeOfMember}</p>
                                <div className="flex-row actions">
                                    <div className="solidButton squareButton buttonGreen" style={{ marginRight: "16px" }}
                                        onClick={() => {
                                            setID(index)
                                            setnameOfMember(props.name)
                                            setPosition(props.typeOfMember)
                                            setAge(props.age)
                                            setAddress(props.address)
                                            setEmail(props.email)
                                            setPhone(props.number)
                                            toggleModal(true)
                                            document.getElementById("sideBlur").className += " blur";
                                            document.getElementById("topBlur").className += " blur";
                                            document.getElementById("headerBlur").className += " blur";
                                            document.getElementById("contentBlur").className += " blur";
                                        }}>
                                        <img src={View} alt="" />
                                    </div>
                                    <div className="solidButton squareButton buttonBlue"
                                        onClick={() => {
                                            setnameOfMember(props.name)
                                            setPosition(props.typeOfMember)
                                            setBday(props.birthday)
                                            setAddress(props.address)
                                            setEmail(props.email)
                                            setPhone(props.number)
                                            setID(index)
                                            toggleUpdateModal(true)
                                            document.getElementById("sideBlur").className += " blur";
                                            document.getElementById("topBlur").className += " blur";
                                            document.getElementById("headerBlur").className += " blur";
                                            document.getElementById("contentBlur").className += " blur";
                                        }}>
                                        <img src={Update} alt="" />
                                    </div>
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
