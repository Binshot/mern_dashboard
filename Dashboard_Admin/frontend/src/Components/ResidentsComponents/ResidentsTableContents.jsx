import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

import View from "../NewImageFiles/ActionButton/View.svg"
import Update from "../NewImageFiles/ActionButton/Update.svg"
import Delete from "../NewImageFiles/ActionButton/Delete.svg"
import AddMember from "../NewImageFiles/ActionButton/AddFamilyMember.svg"
import ToggleOn from "../NewImageFiles/ActionButton/Badge-Check.svg"
import ToggleOff from "../NewImageFiles/ActionButton/Badge-Close.svg"

const Residents = ({ residents, id, flag, action, del, lastName, firstName }) => {
    const [Toggle, setToggle] = useState(true)
    return (
        <tr>
            <td>{residents.name.lastName}, {residents.name.firstName}</td>
            <td>{Toggle ? <div><span className='dotGreen'></span> Activated</div> : <div><span className='dotRed'></span> Deactivated</div>}</td>
            <td className='residentActions actions'>
                <div className='flex-row'>
                    <div style={{ marginRight: "16px" }} className="solidButton squareButton buttonGreen"
                        onClick={() => {
                            id(residents.id)
                            flag(true)
                            action("view")
                            document.getElementById("sideBlur").className += " blur";
                            document.getElementById("topBlur").className += " blur";
                            document.getElementById("headerBlur").className += " blur";
                            document.getElementById("ResidentcontentBlur").className += " blur";
                        }}>
                        <img src={View} alt="" />
                    </div>
                    <div style={{ marginRight: "16px" }} className="solidButton squareButton buttonBlue"
                        onClick={() => {
                            flag(true)
                            action("addMember")
                            document.getElementById("sideBlur").className += " blur";
                            document.getElementById("topBlur").className += " blur";
                            document.getElementById("headerBlur").className += " blur";
                            document.getElementById("ResidentcontentBlur").className += " blur";
                        }} >
                        <img src={AddMember} alt="" />
                    </div>
                    <div style={{ marginRight: "16px" }} className="solidButton squareButton buttonBrown"
                        onClick={() => {
                            id(residents.id)
                            flag(true)
                            action("edit")
                            lastName(residents.name.lastName)
                            firstName(residents.name.firstName)
                            document.getElementById("sideBlur").className += " blur";
                            document.getElementById("topBlur").className += " blur";
                            document.getElementById("headerBlur").className += " blur";
                            document.getElementById("ResidentcontentBlur").className += " blur";
                        }}>
                        <img src={Update} alt="" />
                    </div>
                    <div style={{ marginRight: "16px" }} className={Toggle ? "solidButton squareButton buttonRed" : "solidButton squareButton buttonGreen"}
                        onClick={() => setToggle(!Toggle)}>
                        <img src={Toggle ? ToggleOff : ToggleOn} alt="" />
                    </div>
                    <div className='delete squareButton'
                        onClick={() => {
                            id(residents.id)
                            del(true)
                            action("delete")
                            lastName(residents.name.lastName)
                            firstName(residents.name.firstName)
                            document.getElementById("sideBlur").className += " blur";
                            document.getElementById("topBlur").className += " blur";
                            document.getElementById("headerBlur").className += " blur";
                            document.getElementById("ResidentcontentBlur").className += " blur";
                        }} >
                        <img src={Delete} />
                    </div>

                </div>
            </td>
        </tr>
    )
};

export default Residents;