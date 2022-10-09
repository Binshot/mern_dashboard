import RightHeader from "./RightHeader"
import Contacts from "./Contacts"
import InputField from "./InputField"
import Conversation from "./Conversation"
import { Autocomplete, TextField } from "@mui/material"
import { useState } from "react"
export default function Container() {
    const concernTypes = [
        "All Messages",
        "Community Concern",
        "Events Concern"
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

    return (
        <div className="message-container">
            <div className="left">
                <div className="header">
                    <h2 style={{ fontSize: "36px" }}>Messages</h2>
                </div>
                <div style={{ margin: "0 24px" }}>
                    <Autocomplete
                        disablePortal
                        fullWidth
                        id="combo-box-demo"
                        options={concernTypes}
                        defaultValue="All Messages"
                        renderInput={(params) => <TextField {...params} />}
                        sx={{
                            "& .MuiOutlinedInput-root:hover": {
                                "& > fieldset": {
                                    borderColor: "#7175F4"
                                }
                            }
                        }}
                    />
                </div>
                {messages.map((message, index) => {
                    return (
                        <Contacts
                            key={message._id}
                            list={message}
                            get={getSelectedMessage}
                            index={index}
                        />
                    )
                })}

            </div>
            <div className="right">
                <RightHeader />
                <Conversation list={messages[messageIndex]} />
                <InputField />
            </div>
        </div>
    )
}