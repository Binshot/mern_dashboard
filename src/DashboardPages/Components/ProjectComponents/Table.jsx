import React, { useState, useRef, useEffect } from 'react';
import Projects from './TableContents';
import PageNumber from './PageNumber';
import Print from "../NewImageFiles/Topbar/Print.svg"
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../printPDF/ProjectToPrint';
import { Accordion, AccordionSummary, AccordionDetails, FormControlLabel, Checkbox, TextField, CircularProgress, Box } from '@mui/material';

import Modal from '../CommonComponents/Modal';

const Table = (props) => {
    const projectList = props.prescriptiveList    // const [projectList, setProjectList] = useState(null)

    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 10;

    if (projectList) {

        const projects = projectList

        // Get current projects
        let indexOfLastProject = currentPage * projectsPerPage;
        let indexOfFirstProject = indexOfLastProject - projectsPerPage;
        let currentProjects;
        currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

        // Change page
        const paginate = pageNumber => setCurrentPage(pageNumber);

        const [showModal, setshowmodal] = useState(false)
        const [selectedProject, setselectedProject] = useState(null)
        const [beneficiary, setbeneficiary] = useState(null)
        const getActionButton = get => setshowmodal(get)
        const getProjects = get => setselectedProject(get)
        const getBeneficiary = get => setbeneficiary(get)
        return (
            <>
                <Modal
                    shown={showModal}
                    close={() => {
                        setshowmodal(false);
                    }}
                    align="center">
                    {selectedProject && beneficiary && (
                        <div style={{ width: "500px" }}>
                            <div className="modalheader">
                                <label className='label'>View Project</label><br />
                            </div>
                            <div className="details leftAlign">
                                <div className="flex-row borderBottom1 marginTop paddingBottom">
                                    <h4 style={{ width: 180, textAlign: "left" }}>Title:</h4>
                                    <p style={{ width: 230, textAlign: "left" }}>
                                        {selectedProject.project_title}
                                    </p>
                                </div>
                                <div className="flex-row borderBottom1 marginTop paddingBottom">
                                    <h4 style={{ width: 180, textAlign: "left" }}>Description:</h4>
                                    <p style={{ width: 230, textAlign: "left" }}>
                                        {selectedProject.project_description}
                                    </p>
                                </div>
                                <div className="flex-row borderBottom1 marginTop paddingBottom">
                                    <h4 style={{ width: 180, textAlign: "left" }}>Target Beneficiary:</h4>
                                    <p style={{ width: 230, textAlign: "left" }}>
                                        {beneficiary}
                                    </p>
                                </div>
                                {/* <div className="flex-row borderBottom1 marginTop paddingBottom">
                                    <h4 style={{ width: 180, textAlign: "left" }}>Target Participant:</h4>
                                    <p style={{ width: 230, textAlign: "left" }}>43</p>
                                </div> */}
                                <div className="flex-row borderBottom1 marginTop paddingBottom">
                                    <h4 style={{ width: 180, textAlign: "left" }}>Target Month:</h4>
                                    <p style={{ width: 230, textAlign: "left" }}>
                                        {selectedProject.target.month.length != 0
                                            ? selectedProject.target.month.join(', ')
                                            : "Any Month"
                                        }
                                    </p>
                                </div>
                                <div className="flex-row marginTop paddingBottom">
                                    <h4 style={{ width: 180, textAlign: "left" }}>Reference: </h4>
                                    <div className="flex-column">
                                        {selectedProject.reference.map((reference, index) => {
                                            return (
                                                <a href={reference} target="_blank" style={{ color: "#0C1096", fontWeight: "500", fontSize: "16px", marginBottom: "8px" }}>
                                                    {`Reference ${index + 1}`}
                                                </a>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <button
                                // type='button'
                                className='borderedButton exit marginTop'
                                onClick={() => {
                                    setshowmodal(false)
                                }}>
                                EXIT
                            </button>
                        </div>
                    )}
                </Modal>
                <table className='Projects_table'>
                    <thead>
                        <tr>
                            <td><h4>TITLE</h4> </td>
                            <td><h4>TARGET BENEFICIARIES</h4></td>
                            {/* <td><h4>TARGET PARTICIPANTS</h4></td> */}
                            <td><h4>TARGET MONTH</h4></td>
                            <td><h4>ACTION</h4></td>
                        </tr>
                    </thead>
                    <tbody>
                        <Projects
                            projects={currentProjects}
                            actionButton={getActionButton}
                            getSelectedProject={getProjects}
                            getBeneficiary={getBeneficiary}
                        />
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <h4>Total Projects: {projects.length}</h4>
                            </td>
                            <td colSpan={3}>
                                <PageNumber
                                    projectsPerPage={projectsPerPage}//ResidentPerPage
                                    totalProjects={projects.length}
                                    paginate={paginate}
                                />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </>
        );
    } else {
        return null;
    }
};

export default Table;