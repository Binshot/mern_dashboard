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
                <h2>Projects</h2>
                <p>Total Projects: {props.list.length}</p>
            </div>
            <table id="printTable" >
                <tr>
                    <th>TITLE</th>
                    <th>DESCRIPTION</th>
                    <th>TARGET BENEFICIARIES</th>
                    <th>TARGET MONTH</th>
                </tr>
                {props.list.map((project, index) => {
                    const partialJoin = []

                    const education = project.target.education
                    const age = project.target.age
                    const occupation = project.target.occupation
                    const gender = project.target.gender

                    if (age.includes("<13")) {
                        if (age.includes(">60")) {
                            console.log("anyone")
                        } else if (age.length != 1) {
                            partialJoin.push(`below ${age.at(age.length - 1).substring(3, 5)} years old`)
                        } else {
                            partialJoin.push("below 13 years old")
                        }
                    } else if (age.includes(">60")) {
                        partialJoin.push(`above ${age.at(0).substring(0, 2)} years old`)
                    }
                    gender.length == 1 && partialJoin.push(gender.join(', '))
                    occupation.length < 4 && occupation.length != 0 && !occupation.includes("student") && partialJoin.push(occupation.join(', '))
                    education.length < 6 && education.length != 0 && partialJoin.push(education.join(', '))

                    return (
                        <tr key={index}>
                            <td>{project.project_title}</td>
                            <td>{project.project_description}</td>
                            {<td>{partialJoin.length != 0 ? partialJoin.join(', ') : "Anyone"}</td>}
                            <td>{project.target.month.length != 0
                                ? project.target.month.join(', ')
                                : "Any Month"}</td>
                        </tr>
                    );
                })}
            </table>
        </div>
    );
});