import Avatar from "../NewImageFiles/Resident/Avatar.svg"
import format from "date-fns/format";
import { useState } from "react";

export default function Contacts(props) {
    const [dot, setdot] = useState(true)
    const handleClick = () => {
        props.get(props.index)
        setdot(false)
    }
    return (
        <div className="contacts" onClick={handleClick} style={{ cursor: "pointer" }}>
            <div className="contactTile">
                {dot && <div className="dot"></div>}
                <div className="contactHeader">
                    <img src={Avatar} />
                    <div style={{ flexGrow: "1" }}>
                        <div className="centerTop">
                            <h3 style={{ fontSize: "16px", lineHeight: "150%" }}>
                                Resident's name
                            </h3>
                            <p style={{ fontSize: "14px", color: "#9C9C9C" }}>
                                12:07 PM
                                {/* {format(new Date(props.l))} */}
                            </p>
                        </div>
                        <p style={{ fontSize: "12px", color: "#9C9C9C" }}>
                            {props.list.email}
                        </p>
                    </div>
                </div>
                <div className="messagePreview">
                    {props.list.message_thread[props.list.message_thread.length - 1].message_body}
                </div>
            </div>
        </div>
    );
}