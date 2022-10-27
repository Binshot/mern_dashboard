import React, { useState, useEffect } from 'react'
import TextField from "@mui/material/TextField";
import Modal from '../../CommonComponents/Modal';
import Autocomplete from '@mui/material/Autocomplete';
//FOR SNACKBAR
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { useResidentContext } from "../../../hooks/userResidentContext"

function ChangeHeadOfTheFamily(props) {
    
    const [familyMembers, setFamilyMembers] = useState([])
    const { dispatch } = useResidentContext()
    useEffect(() => {
        const fetchResidents = async () => {
            const secondresponse = await fetch(process.env.REACT_APP_API_URL + '/residents/members/' +
                props.resident._id)
            const secondjson = await secondresponse.json()
            if (secondresponse.ok) {
                secondjson.map((res) => {
                    setFamilyMembers([...familyMembers, { label: `${res.member_data.firstName} ${res.member_data.middleName} ${res.member_data.lastName}`, id: res.member_data._id }])
                })
            }
        }

        fetchResidents()
    }, [])

    const [loading, setLoading] = useState(false)
    const [selectedMember, setselectedMember] = useState(null)

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        const response = await fetch(process.env.REACT_APP_API_URL + '/residents/change-head', {
            method: 'PATCH',
            body: JSON.stringify({
                headOfFamily_id: props.resident._id,
                resident_id: selectedMember
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        const newHeadPayload = {
            newHead: json.newHead,
            oldHead: props.resident._id
        }
        if (response.ok) {
            setChanged(false)
            setLoading(false)
            dispatch({ type: 'NEW_FAMILY_HEAD', payload: newHeadPayload })
            props.setShown(false)
            props.snackbar(true)
            props.headName(json.newHead.lastName + ", " + json.newHead.firstName)

            // update family head
            fetch(process.env.REACT_APP_API_URL + '/activity/', {
                method: 'POST',
                body: JSON.stringify({ activity:"Changed a new head of the family: " + json.newHead.lastName + ", " + json.newHead.firstName }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            setLoading(false)
            console.log(json.error)
        }
    }

    const [changed, setChanged] = useState(false)
    const [cancelModal, setCancelModal] = useState(false)

    const xButton = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                    changed ? setCancelModal(true) : props.setShown(false)
                }}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    
    return (
        <div>
            {props.shown && familyMembers ? (
                <div className="modal-backdrop">
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
                                        setChanged(false)
                                        props.setShown(false)
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
                    <form onSubmit={handleSubmit}>
                        <div className="modal-content">
                            <div className='modalHeader'>
                                <h2 className="marginBottom">Change Head Family</h2>
                                {xButton}
                            </div>
                            <div>
                                <h4 style={{ marginBottom: "8px", marginTop: "16px" }}>Current Head of the Family</h4>
                                <TextField
                                    defaultValue={`${props.resident.firstName} ${props.resident.middleName} ${props.resident.lastName}`}
                                    sx={{
                                        width: 360
                                    }}
                                    disabled
                                />
                                <h4 style={{ marginBottom: "8px", marginTop: "24px" }}>New Head of the Family</h4>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={familyMembers}

                                    renderInput={(params) => <TextField {...params} placeholder="Choose New Head of the Family" />}
                                    onChange={(e, newValue) => {
                                        setselectedMember(newValue.id)
                                        setChanged(true)
                                        // console.log(newValue)
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
                            <div className="rightAlign ModalButtons" style={{ marginTop: "24px" }}>
                                <button
                                    type='submit'
                                    className="solidButton buttonBlue"
                                >
                                    Update
                                </button>
                                <button
                                    disabled={loading}
                                    type="button"
                                    className="borderedButton"
                                    onClick={() => {
                                        changed ? setCancelModal(true) : props.setShown(false)
                                    }}>
                                    Exit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            ) : null}
        </div>
    )
}

export default ChangeHeadOfTheFamily
