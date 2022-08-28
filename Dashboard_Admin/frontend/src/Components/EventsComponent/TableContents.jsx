import React from 'react';

import View from "../NewImageFiles/ActionButton/View.svg"
import Update from "../NewImageFiles/ActionButton/Update.svg"
import Delete from "../NewImageFiles/ActionButton/Delete.svg"

const Events = ({ events, id, flag, action, del, title }) => {
    function tConvert(time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }

    function dConvert(d) {
        let date = new Date(d); // 2020-06-21
        let longMonth = date.toLocaleString('en-us', { month: 'long' }).substring(0,3);
        return longMonth + " " + date.getDate() + ", " + date.getFullYear()
    }

    return (
        events.map(events => {
            return (
                <tr key={events.id}>
                    <td>{events.title}</td>
                    <td>{dConvert(events.date.startDate)} - {dConvert(events.date.endDate)}</td>
                    <td>{tConvert(events.time.startTime)} - {tConvert(events.time.endTime)}</td>
                    <td className='residentActions actions'>
                        <div className='flex-row'>
                            <div style={{ marginRight: "16px" }} className="solidButton squareButton buttonGreen"
                                onClick={() => {
                                    id(events.id)
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
                                    id(events.id)
                                    flag(true)
                                    action("edit")
                                    document.getElementById("sideBlur").className += " blur";
                                    document.getElementById("topBlur").className += " blur";
                                    document.getElementById("headerBlur").className += " blur";
                                    document.getElementById("ResidentcontentBlur").className += " blur";
                                }}>
                                <img src={Update} alt="" />
                            </div>
                            <div className='delete squareButton'
                                onClick={() => {
                                    id(events.id)
                                    del(true)
                                    action("delete")
                                    title(events.title)
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