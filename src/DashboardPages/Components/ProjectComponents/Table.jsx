import React, { useState } from 'react';
import Projects from './TableContents';
import PageNumber from './PageNumber';
import useFetch from "../usFetch";

const Table = (props) => {
    // const { data: projectList, error, isPending } = useFetch("http://localhost:8004/Logs");
    const projectList = props.list

    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 5;

    if (projectList) {

        const projects = projectList

        // Get current projects
        let indexOfLastProject = currentPage * projectsPerPage;
        let indexOfFirstProject = indexOfLastProject - projectsPerPage;
        let currentProjects;
        currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

        // Change page
        const paginate = pageNumber => setCurrentPage(pageNumber);

        return (

            <div>
                {/* {isPending && <div>Loading...</div>}
                    {error && <div>{error}</div>} */}
                <table className='Projects_table'>
                    <thead>
                        <tr>
                            <td><h4>PROJECT NAME</h4> </td>
                            <td><h4>TARGET BENEFICIARIES</h4></td>
                        </tr>
                    </thead>
                    <tbody>
                        <Projects
                            projects={currentProjects}
                        />
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <h4>Total Projects: {projects.length}</h4>
                            </td>
                            <td>
                                <PageNumber
                                    projectsPerPage={projectsPerPage}//ResidentPerPage
                                    totalProjects={projects.length}
                                    paginate={paginate}
                                />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
};

export default Table;