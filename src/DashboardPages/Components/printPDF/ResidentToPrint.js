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
                <h2>Residents</h2>
                <p>Total Residents: {props.list.length}</p>
            </div>
            <table id="printTable" >
                <thead>
                    <tr>
                        <th colSpan="2">Name</th>
                        <th>Birthday</th>
                        <th>Contact Number</th>
                        <th colSpan="2">Address</th>
                        <th>Occupation</th>
                    </tr>
                </thead>
                <tbody>
                    {props.list.map(resident => {
                        return (
                            <tr key={resident._id}>
                                <td colSpan="2">{resident.lastName}, {resident.firstName}</td>
                                <td>{format(new Date(resident.birthday), "PP")}</td>
                                <td>{resident.contactNumber ? resident.contactNumber : "None"}</td>
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