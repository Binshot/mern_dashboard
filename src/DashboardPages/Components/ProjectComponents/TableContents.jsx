import React from 'react';
import View from "../NewImageFiles/ActionButton/View.svg"
import { Tooltip } from '@mui/material';
const Projects = ({ projects, actionButton, getSelectedProject, getBeneficiary }) => {
    return (
        projects.map((project, index) => {
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
                    {<td>{partialJoin.length != 0 ? partialJoin.join(', ') : "Anyone"}</td>}
                    <td>{project.target.month.length != 0
                        ? project.target.month.join(', ')
                        : "Any Month"}</td>
                    <td className='project_actions'>
                        <Tooltip title="View" arrow>
                            <button className="solidButton squareButton buttonGreen"
                                onClick={() => {
                                    getSelectedProject(project)
                                    getBeneficiary(partialJoin.length != 0 ? partialJoin.join(', ') : "Anyone")
                                    actionButton(true)
                                }}>
                                <img src={View} alt="" />
                            </button>
                        </Tooltip>
                    </td>
                </tr>
            );
        })
    )
};

export default Projects;