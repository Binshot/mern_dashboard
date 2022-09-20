import React from 'react';

const Projects = ({projects}) => {
    return (
        projects.map((project, index) => {
            return (
                <tr key={index}>
                    <td>{project.name}</td>
                    <td>{project.beneficiaries}</td>
                </tr>
            );
        }
        )
    );
};

export default Projects;