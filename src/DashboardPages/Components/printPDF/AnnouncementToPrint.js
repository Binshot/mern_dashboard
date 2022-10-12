import { format } from "date-fns";
import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
    console.log(props.list)
    return (
        <div ref={ref} className="PDFTemplate">
            <h2>Announcements</h2>
            <table style={{ width: "98%", margin: '10px' }}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <td colSpan="2">Total Announcements: {props.list.length}</td>
                    </tr>
                </tfoot>
                <tbody>
                    {props.list.map(announcement => {
                        return (
                            <tr key={announcement._id}>
                                <td>{announcement.announcementTitle}</td>
                                <td>{format(new Date(announcement.announcementDateTime), "PP")}</td>
                                <td>{format(new Date(announcement.announcementDateTime.substr(0, 23)),'hh:mm aa')} </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
});