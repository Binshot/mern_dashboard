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
                <h2>Announcements</h2>
                <p>Total Announcements: {props.list.length}</p>
            </div>

            <table id="printTable" >
                <tr>
                    <th colSpan="4">Title</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>

                {props.list.map(announcement => {
                    return (
                        <tr key={announcement._id}>
                            <td colSpan="4">{announcement.announcementTitle}</td>
                            <td>{format(new Date(announcement.announcementDateTime), "PP")}</td>
                            <td>{format(new Date(announcement.announcementDateTime.substr(0, 23)), 'hh:mm aa')} </td>
                        </tr>
                    );
                })}
            </table>
        </div>
    );
});