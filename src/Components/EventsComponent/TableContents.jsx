import React, { useState } from 'react';

import View from "../NewImageFiles/ActionButton/View.svg"
import Update from "../NewImageFiles/ActionButton/Update.svg"
import Delete from "../NewImageFiles/ActionButton/Delete.svg"

import { compareAsc, format } from 'date-fns'

const Events = ({ events, flag, action, del, selectedEvents }) => {
    return (
        events.map(events => {
            // console.log(new Date("2022-09-14T11:00:00.000"))
            // console.log(events.eventDateTime.from.split(/[-:.TZ]/gm))
            // console.log(format(new Date(...(events.eventDateTime.from.split(/[-:.TZ]/gm))), 'hh:mm aa'))

            // console.log(compareAsc(new Date("2022-09-12T08:00:00.000"), new Date()))

            const dateOne = compareAsc(new Date("events.eventDateTime.from"), new Date())
            const dateTwo = compareAsc(new Date("events.eventDateTime.to"), new Date())
            
            const [status, setStatus] = useState(null)

            if (status) {
                if (dateOne === -1 && dateTwo === -1)
                    setStatus("Finished")
                else if (dateOne === 1 && dateTwo === 1)
                    setStatus("Planned")
                else
                    setStatus("Ongoing")
            }

            return (
                <tr key={events._id}>
                    <td>{events.eventTitle}</td>
                    <td>{format(new Date(events.eventDateTime.from), 'MMM dd, yyyy')} - {format(new Date(events.eventDateTime.to), 'MMM dd, yyyy')}</td>
                    <td>{format(new Date(events.eventDateTime.from), 'hh:mm aa')} - {format(new Date(events.eventDateTime.to), 'hh:mm aa')}</td>
                    <td>{status}</td>
                    <td>{events.noOfParticipants}</td>
                    <td className='residentActions actions'>
                        <div className='flex-row'>
                            <button style={{ marginRight: "16px" }} className="solidButton squareButton buttonGreen"
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
                            </button>
                            <button style={{ marginRight: "16px" }} className="solidButton squareButton buttonBlue"
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
                            </button>
                            <button className='delete squareButton'
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
                            </button>
                        </div>
                    </td>
                </tr>
            );
        }
        )
    );
};

export default Events;