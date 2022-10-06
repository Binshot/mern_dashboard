import React, { useState } from 'react';

import View from "../NewImageFiles/ActionButton/View.svg"
import Update from "../NewImageFiles/ActionButton/Update.svg"
import Delete from "../NewImageFiles/ActionButton/Delete.svg"

import { compareAsc, format } from 'date-fns'

const Events = ({ events, flag, action, del, selectedEvents }) => {
    return (
        events.map(events => {

            const dateOne = compareAsc(new Date(events.eventDateTime.from.substr(0, 23)), new Date())
            const dateTwo = compareAsc(new Date(events.eventDateTime.to.substr(0, 23)), new Date())

            return (
                <tr key={events._id}>
                    <td>{events.eventTitle}</td>
                    <td>{format(new Date(events.eventDateTime.from), 'MMM dd, yyyy')} - {format(new Date(events.eventDateTime.to), 'MMM dd, yyyy')}</td>
                    <td>{format(new Date(events.eventDateTime.from.substr(0, 23)), 'hh:mm aa')} - {format(new Date(events.eventDateTime.to.substr(0, 23)), 'hh:mm aa')}</td>
                    <td>{dateOne === -1 && dateTwo === -1 ? "Finished" : dateOne === 1 && dateTwo === 1 ? "Planned" : "Ongoing"}</td>
                    <td>{events.noOfParticipants}</td>
                    <td className='residentActions actions'>
                        <div className='flex-row'>
                            <button style={{ marginRight: "16px" }} className="solidButton squareButton buttonGreen"
                                onClick={() => {
                                    flag(true)
                                    action("view")
                                    selectedEvents(events)
                                }}>
                                <img src={View} alt="" />
                            </button>
                            <button style={{ marginRight: "16px" }} className="solidButton squareButton buttonBlue"
                                onClick={() => {
                                    flag(true)
                                    action("edit")
                                    selectedEvents(events)
                                }}>
                                <img src={Update} alt="" />
                            </button>
                            <button className='delete squareButton'
                                onClick={() => {
                                    selectedEvents(events)
                                    del(true)
                                    action("delete")
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