import { format } from "date-fns";
import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="PDFTemplate">
            <h2>Activity Logs</h2>
            <table style={{ width: "98%", margin: '10px' }}>
                <thead>
                    <tr>
                        <th>Date and Time</th>
                        <th colSpan="2">Activity</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <td colSpan="3">Total Activities: {props.list.length}</td>
                    </tr>
                </tfoot>
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