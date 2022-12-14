import Avatar from "../NewImageFiles/Resident/Avatar.svg"
import format from "date-fns/format";
import { useState } from "react";

export default function Contacts(props) {
    const { contact, contactList, changeConvo, resident, convoIndex, currentIndex, returnIndex } = props;

    return (
        <div className={currentIndex == convoIndex ? "contactTile active" : "contactTile"} id={`convo${convoIndex}`} style={{ cursor: "pointer" }}
            onClick={() => {
                changeConvo(contact, contactList)
                returnIndex(convoIndex)
            }}
        >
            {!contact.message_thread.read_by_admin && <div className="dot"></div>}
            <div className="contactHeader">
                <img src={contact.accountImage ? `https://drims-demo.herokuapp.com/api/uploads/${contact.accountImage}` : Avatar} />
                <div style={{ width: "70%" }}>
                    <div className="centerTop">
                        <h3 style={{ fontSize: "16px" }}>
                            {resident}
                        </h3>
                        <p style={{ fontSize: "14px", color: "#9C9C9C" }}>
                            {format(new Date(contact.message_thread.message_date), 'hh:mm aa')}
                        </p>
                    </div>
                    <div style={{ fontSize: "12px", color: "#9C9C9C", textOverflow: "ellipsis", width: "100%", overflow: "hidden" }}>
                        {contact.email}
                    </div>
                </div>
            </div>
            <div className="messagePreview">
                {contact.message_thread.message_body}
            </div>
        </div>
    );
}