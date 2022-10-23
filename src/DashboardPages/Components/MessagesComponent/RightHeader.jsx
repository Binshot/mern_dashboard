import Avatar from "../NewImageFiles/Resident/Avatar.svg"
import View from "../NewImageFiles/ActionButton/View.svg"
import { useState, useEffect } from "react";
import ViewResident from "./ViewResident"
import Tooltip from '@mui/material/Tooltip';

export default function RightHeader(props) {
    const { conversation } = props;
    const [resident, setresident] = useState(null)
    const [familyMembers, setfamilyMembers] = useState(null)

    useEffect(() => {
        const fetchResidents = async () => {
            const response = await fetch('https://drims-demo.herokuapp.com/api/residents/' +
                conversation.resident_id)
            const json = await response.json()
            if (response.ok) {
                setresident(json)

                const secondresponse = await fetch('https://drims-demo.herokuapp.com/api/residents/members/' +
                    conversation.resident_id)
                const secondjson = await secondresponse.json()
                if (secondresponse.ok) {
                    setfamilyMembers(secondjson)
                }
            }
        }

        fetchResidents()
    }, [conversation])

    const [showModal, setshowModal] = useState(false)
    const getModal = get => setshowModal(get)

    return (
        <>
            {resident && familyMembers && (
                <ViewResident
                    shown={showModal}
                    setShown={getModal}
                    resident={resident}
                    familyMembers={familyMembers}
                />
            )}

            <div className="header">
                <img className="msgAvatar" style={{objectFit: "cover"}}
                    src={conversation.accountImage ? `https://drims-demo.herokuapp.com/api/uploads/${conversation.accountImage}` : Avatar} />
                <div className="center">
                    <h3 style={{ fontSize: "16px", lineHeight: "150%" }}>{conversation.resident_name}</h3>
                    <p style={{ fontSize: "12px", color: "#9C9C9C" }}>{conversation.email}</p>
                </div>
                <Tooltip title="View" arrow>
                    <button className="solidButton squareButton buttonGreen" onClick={() => setshowModal(true)}>
                        <img src={View} alt="" />
                    </button>
                </Tooltip>
            </div>
        </>
    )
}