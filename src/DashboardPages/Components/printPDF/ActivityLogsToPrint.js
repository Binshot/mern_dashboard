import { format } from "date-fns";
import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
    console.log(props.list)
    return (
        <div ref={ref} className="PDFTemplate">
            <h2>Activity Logs</h2>
            <table style={{ width: "98%", margin: '10px' }}>
                <thead>
                    <tr>
                        <th>Date and Time</th>
                        <th>Activity</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <td colSpan="2">Total Activities: {props.list.length}</td>
                    </tr>
                </tfoot>
                <tbody>
                    {props.list.map(activity => {
                        return (
                            <tr key={activity._id}>
                                <td>{format(new Date(activity.activityDateTime.substr(0, 23)), 'PPp')}</td>
                                <td>{activity.activity}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
});