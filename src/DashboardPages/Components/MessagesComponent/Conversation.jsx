import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { format } from 'date-fns';
import React, { useState, useEffect, useRef } from 'react';
import View from "../NewImageFiles/Send.svg"
import { TextField, CircularProgress } from "@mui/material";
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Conversation(props) {
    const { resident, socket } = props;

    const { user } = useAuthContext();

    const [currentUser, setCurrentUser] = useState();
    // Conversation for a specific resident
    const [conversation, setConversation] = useState([]);
    // For displaying time when message bubble is clicked
    const [displayTime, setDisplayTime] = useState([]);
    // Latest message thread in the conversation
    let currentThreadId = "";
    // Message to be sent
    const [message, setMessage] = useState("");
    // Message received
    const [arrivalMessage, setArrivalMessage] = useState(null);
    // Automatic scrolling for new messages
    const scrollRef = useRef();

    useEffect(() => {
        if (user) setCurrentUser(user)
    }, []);

    // Fetch Conversation for specific user
    useEffect(() => {
        const fetchConversation = async () => {
            const response = await fetch(`https://drims-demo.herokuapp.com/api/messages/get-conversation/`, {
                method: 'POST',
                body: JSON.stringify({ resident_id: resident }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const json = await response.json();
            setConversation(json);
        }
        setConversation([]);
        if (resident) fetchConversation();
    }, [resident])

    // Receive realtime messages
    useEffect(() => {
        if (socket.current) {
            socket.current.on(`msg-receive-${user.id}`, (data) => {
                setArrivalMessage({ new_thread: data.new_thread, message: data.message })
                // setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, []);

    // Update conversation after receiving realtime messages
    useEffect(() => {
        if (arrivalMessage && (resident === arrivalMessage.message.resident_id)) {
            if (arrivalMessage.new_thread) {
                setConversation((prev) => [...prev, arrivalMessage.message]);
            } else {
                const msgs = [...conversation];
                const newMessages = msgs.map((m) => {
                    if (m._id === arrivalMessage.message._id) {
                        return arrivalMessage.message;
                    }
                    return m;
                })
                setConversation(newMessages);
            }
        }
        // arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    // Scroll to bottom
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conversation]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        const data = {
            id: currentThreadId,
            resident_id: resident,
            message_body: message,
            sent_by_resident: false,
            read_by_admin: true,
        }

        const response = await fetch('https://drims-demo.herokuapp.com/api/messages/send-message', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const json = await response.json();

        if (response.ok) {
            // If message_thread is updated in the database
            socket.current.emit("send-msg", {
                to: resident,
                from: user.id,
                message: json,
                new_thread: false
            })

            // Replace the last message thread with the updated message thread
            const convo = [...conversation];
            const newConvo = convo.map((message_thread) => {
                if (message_thread._id === currentThreadId) {
                    return json;
                }
                return message_thread;
            })

            // Update conversation
            setConversation(newConvo);
            setMessage("")
        }

        if (!response.ok) {
            console.log(json.error);
        }
    }

    function filterItems(arr, query) {
        return query == "All Messages"
            ? arr
            : arr.filter((el) => el.concern_type.toLowerCase().includes(query.toLowerCase()))
    }
    return (
        <>
            <div className='conversationWrapper'>
                <div className="conversation">
                    {
                        conversation && props.filterProps &&
                        filterItems(conversation, props.filterProps).map((msg_thread, index) => {
                            if (index === conversation.length - 1) currentThreadId = msg_thread._id;
                            return (
                                <React.Fragment key={msg_thread._id}>
                                    <div className='concernSnackBar'>
                                        <ErrorOutlineIcon sx={{ color: "#0C1096" }} />
                                        <p style={{ marginLeft: "10px" }}>
                                            The concern is {msg_thread.concern_type}
                                        </p>
                                    </div>
                                    {
                                        msg_thread.message_thread.map((message) => {
                                            return message.sent_by_resident === false
                                                ?
                                                <div style={{ alignSelf: "flex-end" }} className='admin' key={message._id}>
                                                    <div
                                                        ref={scrollRef}
                                                        className='message'
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => {
                                                            displayTime.includes(message._id)
                                                                ? setDisplayTime(displayTime.filter((d) => d !== message._id))
                                                                : setDisplayTime([...displayTime, message._id])
                                                        }}
                                                    >
                                                        {message.message_body}
                                                    </div>
                                                    <div
                                                        className='time'
                                                        style={
                                                            !displayTime.includes(message._id)
                                                                ? { display: "none" }
                                                                : { textAlign: "right" }
                                                        }>
                                                        {format(new Date(message.message_date), 'hh:mm aa')}
                                                    </div>
                                                </div>
                                                :
                                                <div className='user' key={message._id} >
                                                    <div
                                                        ref={scrollRef}
                                                        className='message'
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => {
                                                            displayTime.includes(message._id)
                                                                ? setDisplayTime(displayTime.filter((d) => d !== message._id))
                                                                : setDisplayTime([...displayTime, message._id])
                                                        }}>
                                                        {message.message_body}
                                                    </div>
                                                    <div
                                                        className='time'
                                                        style={
                                                            !displayTime.includes(message._id)
                                                                ? { display: "none" }
                                                                : { display: "block" }
                                                        }>
                                                        {format(new Date(message.message_date), 'hh:mm aa')}
                                                    </div>
                                                </div>
                                        }
                                        )
                                    }
                                </React.Fragment>
                            );
                        })
                    }
                </div>
            </div>
            <form onSubmit={handleSendMessage}>
                <div className="inputfield">
                    <TextField
                        fullWidth
                        sx={{
                            backgroundColor: "white",
                            "& .MuiOutlinedInput-root:hover": {
                                "& > fieldset": {
                                    borderColor: "#7175F4"
                                }
                            }
                        }}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button style={{ height: "56px", width: "62px", marginLeft: "16px" }} type="submit" className="solidButton squareButton buttonBlue">
                        <img src={View} />
                    </button>
                </div>
            </form>
        </>
    )
}