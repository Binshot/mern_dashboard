import React from "react";
import Logo from "../NewImageFiles/Sidebar/Logo.svg";
import { format } from "date-fns";
export const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="PDFTemplate">
            <div className="headerTemplate">
                <img src={Logo} style={{ width: "100px", height: "100px" }} />
                <h2 style={{ textAlign: 'center' }}>Del Rosario Compound <br />Neighborhood Association Inc.</h2>
                <p>{format(new Date(), "Pp")}</p>
            </div>
            <div style={{ marginLeft: '10px' }}>
                <h2>Officials</h2>
                <p>Total Officials: {props.list.length}</p>
            </div>

            <table id="printTable" >
                <tr>
                    <th colSpan="2">Name</th>
                    <th>Position</th>
                    <th>Email</th>
                </tr>
                {props.list.map(official => {
                    return (
                        <tr key={official._id}>
                            <td colSpan="2">{official.official.lastName}, {official.official.firstName}</td>
                            <td>{official.position}</td>
                            <td>{official.official.email}</td>
                        </tr>
                    );
                })}
            </table>
        </div>
    );
});