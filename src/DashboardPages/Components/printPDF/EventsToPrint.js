import { format } from "date-fns";
import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="PDFTemplate">
            <h2>Events</h2>
            <table style={{ width: "98%", margin: '10px' }}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Tag</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <td colSpan="2">Total Events: {props.list.length}</td>
                    </tr>
                </tfoot>
                <tbody>
                    {props.list.map(event => {
                        return (
                            <tr key={event._id}>
                                <td>{event.eventTitle}</td>
                                <td>{format(new Date(event.eventDateTime.from), "PP")} - {format(new Date(event.eventDateTime.to), "PP")}</td>
                                <td>{format(new Date(event.eventDateTime.from.substr(0, 23)),'hh:mm aa')} - {format(new Date(event.eventDateTime.to.substr(0, 23)),'hh:mm aa')}</td>
                                <td>{event.eventTag}</td>
                                <td>{event.eventLocation}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
});