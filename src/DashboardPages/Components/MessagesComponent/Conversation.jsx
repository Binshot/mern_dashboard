import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { format } from 'date-fns';
import { useState } from 'react';

export default function Conversation(props) {

    return (
        <div className="conversation">
            <div className='concernSnackBar'>
                <ErrorOutlineIcon
                    sx={{ color: "#0C1096" }}
                />
                <p style={{ marginLeft: "10px" }}>
                    The concern is
                    <span> {props.list.concernType}</span>
                </p>
            </div>
            {/* <div className='dateSnackBar'>

            </div> */}
            {props.list.message_thread.map((thread, index) => {
                {/* const [clicked, setclicked] = useState(false) */ }
                return (
                    thread.sent_by_resident == true ?
                        <div style={{ alignSelf: "flex-end" }} className='admin' key={index}>
                            <div className='message'
                                style={{ cursor: "pointer" }}
                            // onClick={() => setclicked(!clicked)}
                            >
                                {thread.message_body}
                            </div>
                            <div className='time'
                                // style={!clicked ? { display: "none" } : { textAlign: "right" }}>
                                style={{ textAlign: "right" }}>
                                {format(new Date(thread.message_date.substr(0, 23)), 'hh:mm aa')}
                            </div>
                        </div>
                        :
                        <div className='user' >
                            <div className='message'
                                // onClick={() => setclicked(!clicked)}
                                style={{ cursor: "pointer" }}>
                                {thread.message_body}
                            </div>
                            <div className='time' 
                            // style={!clicked ? { display: "none" } : { display: "block" }}>
                            >
                                12:00 PM
                            </div>
                        </div>
                )
            })}
        </div>
    )
}