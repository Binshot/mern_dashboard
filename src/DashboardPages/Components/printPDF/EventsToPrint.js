import { format } from "date-fns";
import React from "react";
import Logo from "../NewImageFiles/Sidebar/Logo.svg";
export const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="PDFTemplate">
            <div className="headerTemplate">
                <img src={Logo} style={{ width: "100px", height: "100px" }} />
                <h2 style={{ textAlign: 'center' }}>Del Rosario Compound <br />Neighborhood Association Inc.</h2>
                <p>{format(new Date(), "Pp")}</p>
            </div>
            <div style={{ marginLeft: '10px' }}>
                <h2>Events</h2>
                <p>Total Events: {props.list.length}</p>
            </div>

            <table id="printTable" >
                <tr>
                    <th colSpan="3">Title</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Tag</th>
                    <th>Location</th>
                </tr>
                {props.list.map(event => {
                    return (
                        <tr key={event._id}>
                            <td colSpan="3">{event.eventTitle}</td>
                            <td>{format(new Date(event.eventDateTime.from), "PP")} - {format(new Date(event.eventDateTime.to), "PP")}</td>
                            <td>{format(new Date(event.eventDateTime.from.substr(0, 23)), 'hh:mm aa')} - {format(new Date(event.eventDateTime.to.substr(0, 23)), 'hh:mm aa')}</td>
                            <td>{event.eventTag}</td>
                            <td>{event.eventLocation}</td>
                        </tr>
                    );
                })}
            </table>
        </div>
    );
});