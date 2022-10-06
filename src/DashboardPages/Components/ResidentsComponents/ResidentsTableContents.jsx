import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

import View from "../NewImageFiles/ActionButton/View.svg"
import Update from "../NewImageFiles/ActionButton/Update.svg"
import Delete from "../NewImageFiles/ActionButton/Delete.svg"
import AddMember from "../NewImageFiles/ActionButton/AddFamilyMember.svg"
import ToggleOn from "../NewImageFiles/ActionButton/Badge-Check.svg"
import ToggleOff from "../NewImageFiles/ActionButton/Badge-Close.svg"

const Residents = ({ residents, flag, action, del, returnResident}) => {
    const [Toggle, setToggle] = useState(true)
    return (
        <tr key={residents._id}>
            <td>{residents.lastName}, {residents.firstName}</td>
            <td>{Toggle ? <div><span className='dotGreen'></span> Activated</div> : <div><span className='dotRed'></span> Deactivated</div>}</td>
            <td className='residentActions actions'>
                <div className='flex-row'>
                    <button style={{ marginRight: "16px" }} className="solidButton squareButton buttonGreen"
                        onClick={() => {
                            flag(true)
                            action("view")
                            returnResident(residents)
                        }}>
                        <img src={View} alt="" />
                    </button>
                    <button style={{ marginRight: "16px" }} className="solidButton squareButton buttonBlue"
                        onClick={() => {
                            flag(true)
                            action("addMember")
                            returnResident(residents)
                        }} >
                        <img src={AddMember} alt="" />
                    </button>
                    <button style={{ marginRight: "16px" }} className="solidButton squareButton buttonBrown"
                        onClick={() => {
                            flag(true)
                            action("edit")
                            returnResident(residents)
                        }}>
                        <img src={Update} alt="" />
                    </button>
                    <button style={{ marginRight: "16px" }} className={Toggle ? "solidButton squareButton buttonRed" : "solidButton squareButton buttonGreen"}
                        onClick={() => setToggle(!Toggle)}>
                        <img src={Toggle ? ToggleOff : ToggleOn} alt="" />
                    </button>
                    <button className='delete squareButton'
                        onClick={() => {
                            del(true)
                            action("delete")
                            returnResident(residents)
                        }} >
                        <img src={Delete} />
                    </button>
                </div>
            </td>
        </tr>
    )
};

export default Residents;