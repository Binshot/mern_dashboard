import RightHeader from "./RightHeader"
import Contacts from "./Contacts"
import Conversation from "./Conversation"
import { TextField, MenuItem, CircularProgress } from "@mui/material"
import EmptyState from "../NewImageFiles/EmptyStates/Message.svg"
import { useState, useEffect, useRef } from "react"

import { io } from "socket.io-client";

import { useAuthContext } from '../../hooks/useAuthContext';
import { useMessageContext } from "../../hooks/useMessageContext"
export default function Container() {
    const { dispatch } = useMessageContext()
    const concernTypes = [
        "All Messages",
        "Community Question",
        "Event Question",
        "Complaint",
        "Damage Report",
        "Others"
    ]

    const [messageIndex, setI] = useState(0)
    const getSelectedMessage = get => setI(get)

    const [filter, setfilter] = useState("All Messages")

    const { user } = useAuthContext();

    const [currentUser, setCurrentUser] = useState();

    const [contacts, setContacts] = useState(null);

    const [currentConvo, setCurrentConvo] = useState();

    // Message received
    const [arrivalMessage, setArrivalMessage] = useState(null);

    // Socket for realtime updates
    const socket = useRef();

    useEffect(() => {
        if (user) setCurrentUser(user)
    }, []);

    useEffect(() => {
        const fetchContacts = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/messages/get-contacts');

            const json = await response.json();

            if (response.ok) {
                // console.log(json)
                setContacts(json)
                if (json.length > 0) {
                    handleChangeCurrentConvo(json[0], json);
                }
            }

            if (!response.ok) {
                console.log(json.error);
            }
        }

        if (currentUser) fetchContacts()
    }, [currentUser])

    // Connect to socket
    useEffect(() => {
        if (currentUser) {
            socket.current = io(process.env.REACT_APP_SOCKET_URL);
            socket.current.emit("add-user", currentUser.id);

            // If user is ADMIN, update the contacts side if there are new messges
            if (socket.current) {
                socket.current.on("update-contacts", (data) => {
                    setArrivalMessage(data);
                });
            }
        }
    }, [currentUser]);

    useEffect(() => {
        // Update read_by_admin status to true
        const update_read_status = async () => {
            try {
                const response = await fetch(`https://drims-demo.herokuapp.com/api/messages/update-read`, {
                    method: 'PATCH',
                    body: JSON.stringify({ thread_id: currentConvo._id }),
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        'Content-Type': 'application/json',
                    }
                });

                const json = await response.json();

            } catch (e) {
                console.log(e.message);
            }
        }

        // Checks if there is a conversation selected
        if (arrivalMessage) {
            const newArrivalMessage = arrivalMessage;
            if (currentConvo) {
                // Checks if the message being received is from the current conversation
                if (arrivalMessage.resident_id === currentConvo.resident_id) {
                    update_read_status();
                    dispatch({ type: 'SUBTRACT_MESSAGE_COUNT' })
                    newArrivalMessage.message_thread.read_by_admin = true
                }
            }

            // Replace the item in contacts if it is from the message being received
            const x = contacts.find((c) => c.resident_id === newArrivalMessage.resident_id);
            const y = contacts.filter((c) => c.resident_id !== newArrivalMessage.resident_id);
            if (x) {
                x.message_thread = newArrivalMessage.message_thread;
                const newContacts = [x, ...y]
                // dispatch({ type: 'SUBTRACT_MESSAGE_COUNT' })
                setContacts(newContacts)
            } else {
                console.log(newArrivalMessage);
                const newContacts = [newArrivalMessage, ...y];
                dispatch({ type: 'SUBTRACT_MESSAGE_COUNT' })
                setContacts(newContacts);
            }
        }
    }, [arrivalMessage]);

    const handleChangeCurrentConvo = async (currentContact, contacts) => {
        setCurrentConvo({
            id: currentContact._id,
            resident_id: currentContact.resident_id,
            resident_name: getResidentName(currentContact),
            email: currentContact.email,
            accountImage: currentContact.accountImage
        })
        const read_status = currentContact.message_thread.read_by_admin;

        if (!read_status) {
            const newContacts = contacts.map((c) => {
                if (c._id === currentContact._id) {
                    dispatch({ type: 'SUBTRACT_MESSAGE_COUNT' })
                    return { ...c, message_thread: { ...c.message_thread, read_by_admin: true } };
                }
                return c;
            })
            setContacts(newContacts);
        }
    }

    const getResidentName = (c) => {
        // Change if necessary
        return `${c.firstName} ${c.lastName}`;
    }

    const [currentConvoIndex, setcurrentConvoIndex] = useState(0)
    const setCurrentConvos = set => setcurrentConvoIndex(set)
    return (
        <>
            {contacts
                ? contacts.length > 0
                    ? <div className="message-container">
                        <div className="left">
                            <div className="header">
                                <h2 style={{ fontSize: "36px" }}>Messages</h2>
                            </div>
                            <div style={{ margin: "0 24px" }}>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    fullWidth
                                    defaultValue={"All Messages"}
                                    onChange={(e) => {
                                        setfilter(e.target.value)
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root:hover": {
                                            "& > fieldset": {
                                                borderColor: "#7175F4"
                                            }
                                        }
                                    }}
                                >
                                    {concernTypes.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="contacts" >
                                {
                                    contacts.map((contact, index) => {
                                        const resident = getResidentName(contact);
                                        return (
                                            <Contacts
                                                key={contact._id}
                                                contact={contact}
                                                contactList={contacts}
                                                resident={resident}
                                                changeConvo={handleChangeCurrentConvo}
                                                convoIndex={index}
                                                currentIndex={currentConvoIndex}
                                                returnIndex={setCurrentConvos}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {
                            currentConvo &&
                            <div className="right">
                                <RightHeader conversation={currentConvo} />
                                <Conversation resident={currentConvo.resident_id} socket={socket} filterProps={filter} />
                            </div>
                        }
                    </div>
                    : <div className="emptyState" style={{height: "79vh"}}>
                        <img src={EmptyState} />
                        <h2>No Messages Yet</h2>
                        <p>All incoming messages will appear in this module</p>
                    </div>
                : <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CircularProgress size={100} sx={{ color: "#0C1096" }} />
                </div>
            }
        </>
    )
}