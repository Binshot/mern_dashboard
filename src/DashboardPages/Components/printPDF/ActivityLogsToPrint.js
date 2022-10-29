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
                <h2>Activity Logs</h2>
                <p>Total Activities: {props.list.length}</p>
            </div>

            <table id="printTable" >
                <thead>
                    <tr>
                        <th>Date and Time</th>
                        <th colSpan="2">Activity</th>
                    </tr>
                </thead>
                <tbody>
                    {props.list.map(activity => {
                        return (
                            <tr key={activity._id}>
                                <td>{format(new Date(activity.activityDateTime.substr(0, 23)), 'PPp')}</td>
                                <td colSpan="2">{activity.activity}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
});