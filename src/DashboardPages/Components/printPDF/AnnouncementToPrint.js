import { format } from "date-fns";
import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="PDFTemplate">
            <h2>Announcements</h2>
            <table style={{ width: "98%", margin: '10px' }}>
                <thead>
                    <tr>
                        <th colSpan="4">Title</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <td colSpan="6">Total Announcements: {props.list.length}</td>
                    </tr>
                </tfoot>
                <tbody>
                    {props.list.map(announcement => {
                        return (
                            <tr key={announcement._id}>
                                <td colSpan="4">{announcement.announcementTitle}</td>
                                <td>{format(new Date(announcement.announcementDateTime), "PP")}</td>
                                <td>{format(new Date(announcement.announcementDateTime.substr(0, 23)), 'hh:mm aa')} </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
});