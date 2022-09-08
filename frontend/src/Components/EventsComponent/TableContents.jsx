import React from 'react';

import View from "../NewImageFiles/ActionButton/View.svg"
import Update from "../NewImageFiles/ActionButton/Update.svg"
import Delete from "../NewImageFiles/ActionButton/Delete.svg"

import format from 'date-fns/format'

const Events = ({ events, flag, action, del, selectedEvents }) => {
    return (
        events.map(events => {
            return (
                <tr key={events._id}>
                    <td>{events.eventTitle}</td>
                    <td>{format(new Date(events.eventDateTime.from), 'MMM dd, yyyy')} - {format(new Date(events.eventDateTime.to), 'MMM dd, yyyy')}</td>
                    <td>{format(new Date(events.eventDateTime.from), 'hh:mm aa')} - {format(new Date(events.eventDateTime.to), 'hh:mm aa')}</td>
                    <td>Ongoing</td>
                    <td>{events.noOfParticipants}</td>
                    <td className='residentActions actions'>
                        <div className='flex-row'>
                            <div style={{ marginRight: "16px" }} className="solidButton squareButton buttonGreen"
                                onClick={() => {
                                    flag(true)
                                    action("view")
                                    selectedEvents(events)
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
                                    action("edit")
                                    selectedEvents(events)
                                    document.getElementById("sideBlur").className += " blur";
                                    document.getElementById("topBlur").className += " blur";
                                    document.getElementById("headerBlur").className += " blur";
                                    document.getElementById("ResidentcontentBlur").className += " blur";
                                }}>
                                <img src={Update} alt="" />
                            </div>
                            <div className='delete squareButton'
                                onClick={() => {
                                    selectedEvents(events)
                                    del(true)
                                    action("delete")
                                    document.getElementById("sideBlur").className += " blur";
                                    document.getElementById("topBlur").className += " blur";
                                    document.getElementById("headerBlur").className += " blur";
                                    document.getElementById("ResidentcontentBlur").className += " blur";
                                }} >
                                <img src={Delete} alt="" />
                            </div>
                        </div>
                    </td>
                </tr>
            );
        }
        )
    );
};

export default Events;