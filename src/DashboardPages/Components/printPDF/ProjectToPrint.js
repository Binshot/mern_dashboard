import { format } from "date-fns";
import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="PDFTemplate">
            <h2>Events</h2>
            <table style={{ width: "98%", margin: '10px' }}>
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Target Beneficiaries</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <td colSpan="2">Total Events: {props.list.length}</td>
                    </tr>
                </tfoot>
                <tbody>
                    {props.list.map((project, index) => {
                        return (
                            <tr key={index}>
                                <td>{project.name}</td>
                                <td>{project.beneficiaries}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
});