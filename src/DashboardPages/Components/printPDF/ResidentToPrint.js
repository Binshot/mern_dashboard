import { format } from "date-fns";
import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
    console.log(props.list)
    return (
        <div ref={ref} className="PDFTemplate">
            <h2>Residents</h2>
            <table style={{ width: "98%", margin: '10px' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Contact Number</th>
                        <th>Address</th>
                        <th>Occupation</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <td colSpan="2">Total Residents: {props.list.length}</td>
                    </tr>
                </tfoot>
                <tbody>
                    {props.list.map(resident => {
                        return (
                            <tr key={resident._id}>
                                <td>{resident.lastName}, {resident.firstName}</td>
                                <td>{resident.contactNumber}</td>
                                <td>{format(new Date(resident.birthday), "PP")}</td>
                                <td>{resident.address}</td>
                                <td>{resident.occupation}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
});