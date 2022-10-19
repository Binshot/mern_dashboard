import React, { useState } from 'react';

import View from "../NewImageFiles/ActionButton/View.svg"
import Update from "../NewImageFiles/ActionButton/Update.svg"
import Delete from "../NewImageFiles/ActionButton/Delete.svg"
import AddMember from "../NewImageFiles/ActionButton/AddFamilyMember.svg"
import ChangeHead from "../NewImageFiles/ActionButton/Change-Head.svg"

const Residents = ({ residents, flag, action, del, returnResident }) => {
    return (
        <tr key={residents._id}>
            <td>{residents.lastName}, {residents.firstName}</td>
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
                    <button style={{ marginRight: "16px" }} className="solidButton squareButton buttonBrown"
                        onClick={() => {
                            flag(true)
                            action("changeHead")
                            returnResident(residents)
                        }}>
                        <img src={ChangeHead} alt="" />
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