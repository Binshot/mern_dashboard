import { format } from "date-fns";
import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="PDFTemplate">
            <h2>Residents</h2>
            <table style={{ width: "98%", margin: '10px' }}>
                <thead>
                    <tr>
                        <th colSpan="2">Name</th>
                        <th>Age</th>
                        <th>Contact Number</th>
                        <th colSpan="2">Address</th>
                        <th>Occupation</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <td colSpan="6">Total Residents: {props.list.length}</td>
                    </tr>
                </tfoot>
                <tbody>
                    {props.list.map(resident => {
                        return (
                            <tr key={resident._id}>
                                <td colSpan="2">{resident.lastName}, {resident.firstName}</td>
                                <td>{resident.contactNumber}</td>
                                <td>{format(new Date(resident.birthday), "PP")}</td>
                                <td colSpan="2">{resident.address}</td>
                                <td>{resident.occupation}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
});