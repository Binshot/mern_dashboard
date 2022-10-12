import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="PDFTemplate">
            <h2>Officials</h2>
            <table style={{ width: "98%", margin: '10px' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <td colSpan="2">Total Officials: {props.list.length}</td>
                    </tr>
                </tfoot>
                <tbody>
                    {props.list.map(official => {
                        return (
                            <tr key={official._id}>
                                <td>{official.official.lastName}, {official.official.firstName}</td>
                                <td>{official.position}</td>
                                <td>{official.official.email}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
});