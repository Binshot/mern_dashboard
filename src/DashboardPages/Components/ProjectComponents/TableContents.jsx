import React from 'react';
import View from "../NewImageFiles/ActionButton/View.svg"
import { Tooltip } from '@mui/material';
const Projects = ({ projects, actionButton }) => {
    return (
        projects.map((project, index) => {
            return (
                <tr key={index}>
                    <td>{project.name}</td>
                    <td>{project.beneficiaries}</td>
                    <td>10</td>
                    <td>January</td>
                    <td className='project_actions'>
                        <Tooltip title="View" arrow>
                            <button className="solidButton squareButton buttonGreen"
                                onClick={() => actionButton(true)}>
                                <img src={View} alt="" />
                            </button>
                        </Tooltip>
                    </td>
                </tr>
            );
        }
        )
    );
};

export default Projects;