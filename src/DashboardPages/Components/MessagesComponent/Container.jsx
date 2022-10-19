import RightHeader from "./RightHeader"
import Contacts from "./Contacts"
import Conversation from "./Conversation"
import { Autocomplete, TextField, MenuItem } from "@mui/material"

import { useState, useEffect, useRef } from "react"

import { io } from "socket.io-client";

import { useAuthContext } from '../../hooks/useAuthContext';

export default function Container() {
    const concernTypes = [
        "All Messages",
        "Community Question",
        "Event Question",
        "Complaint",
        "Damage Report",
        "Others"
    ]

    const messages = [
        {
            "_id": "633e371987de554f263cc3e7",
            "email": "w@s.com",
            "concernType": "Event",
            "message_thread": [
                {
                    "message_body": "Hello Admin",
                    "sent_by_resident": true,
                    "read_by_admin": true,
                    "_id": "633e371987de554f263cc3e9",
                    "message_date": "2022-10-06T02:02:01.703Z"
                },
                {
                    "message_body": "Hi resident",
                    "sent_by_resident": false,
                    "read_by_admin": true,
                    "_id": "633e37f44bacfcf38bf2606f",
                    "message_date": "2022-10-06T02:05:40.354Z"
                },
                {
                    "message_body": "Hi again",
                    "sent_by_resident": true,
                    "read_by_admin": true,
                    "_id": "633e38564bacfcf38bf26074",
                    "message_date": "2022-10-06T02:07:18.768Z"
                }
            ],
            "createdAt": "2022-10-06T02:02:01.631Z",
            "updatedAt": "2022-10-06T02:07:18.765Z",
            "__v": 0
        },
        {
            "_id": "633e38754bacfcf38bf26076",
            "email": "q@s.com",
            "concernType": "Community",
            "message_thread": [
                {
                    "message_body": "Hi again",
                    "sent_by_resident": true,
                    "read_by_admin": true,
                    "_id": "633e38754bacfcf38bf26078",
                    "message_date": "2022-10-06T02:07:49.753Z"
                }
            ],
            "createdAt": "2022-10-06T02:07:49.699Z",
            "updatedAt": "2022-10-07T03:03:52.494Z",
            "__v": 0
        },
        {
            "_id": "633e38a74bacfcf38bf2607a",
            "email": "w@s.com",
            "concernType": "Community",
            "message_thread": [
                {
                    "message_body": "Hi there admin",
                    "sent_by_resident": true,
                    "read_by_admin": true,
                    "_id": "633e38a74bacfcf38bf2607c",
                    "message_date": "2022-10-06T02:08:39.037Z"
                }
            ],
            "createdAt": "2022-10-06T02:08:39.001Z",
            "updatedAt": "2022-10-07T03:03:41.232Z",
            "__v": 0
        }
    ]

    const [messageIndex, setI] = useState(0)
    const getSelectedMessage = get => setI(get)

    const [filter, setfilter] = useState("All Messages")

    const { user } = useAuthContext();

    const [currentUser, setCurrentUser] = useState();

    const [contacts, setContacts] = useState([]);

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
            const response = await fetch('https://drims-demo.herokuapp.com/api/messages/get-contacts');

            const json = await response.json();

            if (response.ok) {
                if (json.length > 0) {
                    console.log(json);
                    setContacts(json)
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
            socket.current = io('https://drims-demo.herokuapp.com/');
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

                    newArrivalMessage.message_thread.read_by_admin = true
                }
            }

            // Replace the item in contacts if it is from the message being received
            const x = contacts.find((c) => c.resident_id === newArrivalMessage.resident_id);
            const y = contacts.filter((c) => c.resident_id !== newArrivalMessage.resident_id);
            if (x) {
                x.message_thread = newArrivalMessage.message_thread;
                const newContacts = [x, ...y]
                setContacts(newContacts)
            } else {
                console.log(newArrivalMessage);
                const newContacts = [newArrivalMessage, ...y];
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

    return (
        <div className="message-container">
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
                {
                    contacts.map((contact) => {
                        const resident = getResidentName(contact);
                        return (
                            <Contacts
                                key={contact._id}
                                contact={contact}
                                contactList={contacts}
                                resident={resident}
                                changeConvo={handleChangeCurrentConvo}
                            />
                        )
                    })
                }
            </div>
            {
                currentConvo &&
                <div className="right">
                    <RightHeader conversation={currentConvo} />
                    {/* <Conversation resident={currentConvo.resident_id} list={messages[messageIndex]} socket={socket} /> */}
                    <Conversation resident={currentConvo.resident_id} socket={socket} filterProps={filter} />
                </div>
            }
        </div>
    )
}