import Avatar from "../NewImageFiles/Resident/Avatar.svg"
import format from "date-fns/format";
import { useState } from "react";

export default function Contacts(props) {
    const { contact, contactList, changeConvo, resident } = props;
  
    return (
        <div className="contacts" onClick={() => changeConvo(contact, contactList)} style={{ cursor: "pointer" }}>
            <div className="contactTile">
                {!contact.message_thread.read_by_admin && <div className="dot"></div>}
                <div className="contactHeader">
                    <img src={contact.accountImage ? `https://drims-demo.herokuapp.com/api/uploads/${contact.accountImage}` : Avatar} />
                    <div style={{ flexGrow: "1" }}>
                        <div className="centerTop">
                            <h3 style={{ fontSize: "16px", lineHeight: "150%" }}>
                                {resident}
                            </h3>
                            <p style={{ fontSize: "14px", color: "#9C9C9C" }}>
                                {format(new Date(contact.message_thread.message_date), 'hh:mm aa')}
                            </p>
                        </div>
                        <p style={{ fontSize: "12px", color: "#9C9C9C" }}>
                            {contact.email}
                        </p>
                    </div>
                </div>
                <div className="messagePreview">
                    {contact.message_thread.message_body}
                </div>
            </div>
        </div>
    );
}