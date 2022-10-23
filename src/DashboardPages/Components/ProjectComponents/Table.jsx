import React, { useState, useRef, useEffect } from 'react';
import Projects from './TableContents';
import PageNumber from './PageNumber';
import Print from "../NewImageFiles/Topbar/Print.svg"
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../printPDF/ProjectToPrint';
import { Accordion, AccordionSummary, AccordionDetails, FormControlLabel, Checkbox, TextField, CircularProgress, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Table = (props) => {
    // const { data: projectList, error, isPending } = useFetch("http://localhost:8004/Logs");
    const projectList = props.list

    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 5;

    const [Counts, setCounts] = useState(null)

    useEffect(() => {
        const getCounts = async () => {
            const response = await fetch('https://drims-demo.herokuapp.com/api/projects/count-data')
            const json = await response.json()
            if (response.ok) {
                setCounts(json)
            }
        }
        getCounts()
    }, [])

    if (projectList) {

        const projects = projectList

        // Get current projects
        let indexOfLastProject = currentPage * projectsPerPage;
        let indexOfFirstProject = indexOfLastProject - projectsPerPage;
        let currentProjects;
        currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

        // Change page
        const paginate = pageNumber => setCurrentPage(pageNumber);

        const pageStyle = `
                        @page {
                            size: landscape;
                            margin: 10mm 10mm 10mm 10mm
                        }                        
                    `;

        const componentRef = useRef();
        const handlePrint = useReactToPrint({
            content: () => componentRef.current,
            pageStyle: pageStyle,
        });

        // const [filterCount, setfilterCount] = useState(0)
        const [showDropDown, setshowDropDown] = useState(false)
        let filterCount = document.querySelectorAll('input[type=checkbox]:checked').length

        const [checkboxStates, setcheckboxStates] = useState({
            below12: false,
            _13_21: false,
            _22_30: false,
            _31_40: false,
            _41_50: false,
            _51_60: false,
            above60: false,
            student: false,
            unemployed: false,
            employed: false,
            self_employed: false,
            occupation_not_applicable: false,
            male: false,
            female: false,
            jan: false,
            feb: false,
            mar: false,
            apr: false,
            may: false,
            june: false,
            july: false,
            aug: false,
            sept: false,
            oct: false,
            nov: false,
            dec: false,
            noEd: false,
            elem: false,
            highSchool: false,
            bachelor: false,
            master: false,
            doctorate: false,
            education_not_applicable: false
        })

        const handleChange = (event) => {
            setcheckboxStates({
                ...checkboxStates,
                [event.target.name]: event.target.checked,
            });
        }
        console.log(Counts)
        return (
            <>
                {Counts ?
                    <>
                        <div id='headerBlur' className='header'>
                            <div className="flex-row borderBottom2 topHeader">
                                <h1>PROJECTS</h1>
                            </div>
                            <div className='header_actions'>
                                <div className="dropdown">
                                    <button className={filterCount == 0 ? 'filter notActive' : 'filter active'}
                                        onClick={() => setshowDropDown(!showDropDown)}>
                                        <div className={filterCount == 0 ? 'filterIcon notActiveIcon' : "filterIcon activeIcon"}></div>
                                        Filter
                                        {filterCount != 0 && <div className='filterCount'>{filterCount}</div>}
                                    </button>
                                    <div className={showDropDown ? "dropdown-content show" : "dropdown-content hide"}>
                                        <div className='dropdown-content-header'>Filters</div>
                                        <Box sx={{ width: 400, maxHeight: '50vh', overflow: 'auto' }}>
                                            <div style={{ padding: "24px" }}>
                                                Target Number of Participant
                                                <TextField
                                                    type="number"
                                                    fullWidth
                                                    placeholder='Input number of participants'
                                                    sx={{
                                                        marginTop: "16px",
                                                        backgroundColor: "white",
                                                        "& .MuiOutlinedInput-root:hover": {
                                                            "& > fieldset": {
                                                                borderColor: "#7175F4"
                                                            }
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <Accordion disableGutters elevation={0}
                                                sx={{
                                                    '&:before': {
                                                        backgroundColor: 'white',
                                                    },
                                                }}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    Gender
                                                </AccordionSummary>
                                                <AccordionDetails sx={{ background: "#F8F8F8", display: "flex", flexDirection: "column" }}>
                                                    <FormControlLabel
                                                        label={`Male (${Counts.count_male})`}
                                                        control={<Checkbox checked={checkboxStates.male} onChange={handleChange} name="male" />}
                                                    />
                                                    <FormControlLabel
                                                        label={`Female (${Counts.count_female})`}
                                                        control={<Checkbox checked={checkboxStates.female} onChange={handleChange} name="female" />}
                                                    />
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion disableGutters elevation={0}
                                                sx={{ '&:before': { backgroundColor: 'white', } }}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    Age Group
                                                </AccordionSummary>
                                                <AccordionDetails sx={{ background: "#F8F8F8", display: "flex", flexDirection: "column" }}>
                                                    <FormControlLabel
                                                        label={`Below 12 (${Counts.count_below_13})`}
                                                        control={<Checkbox checked={checkboxStates.below12} onChange={handleChange} name="below12" />}
                                                    />
                                                    <FormControlLabel
                                                        label={`13 - 21 Years old (${Counts.count_from13_to21})`}
                                                        control={<Checkbox checked={checkboxStates._13_21} onChange={handleChange} name="_13_21" />}
                                                    />
                                                    <FormControlLabel
                                                        label={`22 - 30 Years old (${Counts.count_from21_to30})`}
                                                        control={<Checkbox checked={checkboxStates._22_30} onChange={handleChange} name="_22_30" />}
                                                    />
                                                    <FormControlLabel
                                                        label={`31 - 40 Years old (${Counts.count_from30_to40})`}
                                                        control={<Checkbox checked={checkboxStates._31_40} onChange={handleChange} name="_31_40" />}
                                                    />
                                                    <FormControlLabel
                                                        label={`41 - 50 Years old (${Counts.count_from40_to50})`}
                                                        control={<Checkbox checked={checkboxStates._41_50} onChange={handleChange} name="_41_50" />}
                                                    />
                                                    <FormControlLabel
                                                        label={`51 - 60 Years old (${Counts.count_from50_to60})`}
                                                        control={<Checkbox checked={checkboxStates._51_60} onChange={handleChange} name="_51_60" />}
                                                    />
                                                    <FormControlLabel
                                                        label={`Above 60 (${Counts.count_above60})`}
                                                        control={<Checkbox checked={checkboxStates.above60} onChange={handleChange} name="above60" />}
                                                    />
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion disableGutters elevation={0}
                                                sx={{
                                                    '&:before': {
                                                        backgroundColor: 'white',
                                                    }
                                                }}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    Occupation
                                                </AccordionSummary>
                                                <AccordionDetails sx={{ background: "#F8F8F8", display: "flex", flexDirection: "column" }}>
                                                    <FormControlLabel
                                                        label={`Student (${Counts.count_student})`}
                                                        control={<Checkbox checked={checkboxStates.student} onChange={handleChange} name="student" />}
                                                    />
                                                    <FormControlLabel
                                                        label={`Unemplyed (${Counts.count_not_employed})`}
                                                        control={<Checkbox checked={checkboxStates.unemployed} onChange={handleChange} name="unemployed" />}
                                                    />
                                                    <FormControlLabel
                                                        label={`Employed (${Counts.count_employed})`}
                                                        control={<Checkbox checked={checkboxStates.employed} onChange={handleChange} name="employed" />}
                                                    />
                                                    <FormControlLabel
                                                        label={`Self-Employed (${Counts.count_self_employed})`}
                                                        control={<Checkbox checked={checkboxStates.self_employed} onChange={handleChange} name="self_employed" />}
                                                    />
                                                    <FormControlLabel
                                                        label={`Not Applicatble (${Counts.count_occupation_na})`}
                                                        control={<Checkbox checked={checkboxStates.occupation_not_applicable} onChange={handleChange} name="occupation_not_applicable" />}
                                                    />
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion disableGutters elevation={0}
                                                sx={{
                                                    '&:before': {
                                                        backgroundColor: 'white',
                                                    }
                                                }}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"

                                                >
                                                    Educational Attainment
                                                </AccordionSummary>
                                                <AccordionDetails sx={{ background: "#F8F8F8", display: "flex", flexDirection: "column" }}>
                                                    <FormControlLabel
                                                        label={`No Formal Education (${Counts.count_no_formal})`}
                                                        control={<Checkbox checked={checkboxStates.noEd} onChange={handleChange} name="noEd" />}
                                                    />
                                                    <FormControlLabel
                                                        label={`Elementary (${Counts.count_elementary})`}
                                                        control={<Checkbox checked={checkboxStates.elem} onChange={handleChange} name="elem" />}
                                                    />
                                                    <FormControlLabel
                                                        label={`High School (${Counts.count_highschool})`}
                                                        control={<Checkbox checked={checkboxStates.highSchool} onChange={handleChange} name="highSchool" />}
                                                    />
                                                    <FormControlLabel
                                                        label={`Bachelor’s Degree (${Counts.count_bachelor})`}
                                                        control={<Checkbox checked={checkboxStates.bachelor} onChange={handleChange} name="bachelor" />}
                                                    />
                                                    <FormControlLabel
                                                        label={`Master’s Degree (${Counts.count_master})`}
                                                        control={<Checkbox checked={checkboxStates.master} onChange={handleChange} name="master" />}
                                                    />
                                                    <FormControlLabel
                                                        label={`Doctorate or Higher (${Counts.count_doctorate})`}
                                                        control={<Checkbox checked={checkboxStates.doctorate} onChange={handleChange} name="doctorate" />}
                                                    />
                                                    <FormControlLabel
                                                        label={`Not Applicable (${Counts.count_education_na})`}
                                                        control={<Checkbox checked={checkboxStates.education_not_applicable} onChange={handleChange} name="education_not_applicable" />}
                                                    />
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion disableGutters elevation={0}
                                                sx={{
                                                    '&:before': {
                                                        backgroundColor: 'white',
                                                    }
                                                }}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    Month
                                                </AccordionSummary>
                                                <AccordionDetails sx={{ background: "#F8F8F8", display: "flex", flexDirection: "row" }}>
                                                    <div style={{ display: "flex", flexDirection: "column", marginRight: "40px" }}>
                                                        <FormControlLabel
                                                            label="January"
                                                            control={<Checkbox checked={checkboxStates.jan} onChange={handleChange} name="jan" />}
                                                        />
                                                        <FormControlLabel
                                                            label="Febuary"
                                                            control={<Checkbox checked={checkboxStates.feb} onChange={handleChange} name="feb" />}
                                                        />
                                                        <FormControlLabel
                                                            label="March"
                                                            control={<Checkbox checked={checkboxStates.mar} onChange={handleChange} name="mar" />}
                                                        />
                                                        <FormControlLabel
                                                            label="April"
                                                            control={<Checkbox checked={checkboxStates.apr} onChange={handleChange} name="apr" />}
                                                        />
                                                        <FormControlLabel
                                                            label="May"
                                                            control={<Checkbox checked={checkboxStates.may} onChange={handleChange} name="may" />}
                                                        />
                                                        <FormControlLabel
                                                            label="June"
                                                            control={<Checkbox checked={checkboxStates.june} onChange={handleChange} name="june" />}
                                                        />
                                                    </div>
                                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                                        <FormControlLabel
                                                            label="July"
                                                            control={<Checkbox checked={checkboxStates.july} onChange={handleChange} name="july" />}
                                                        />
                                                        <FormControlLabel
                                                            label="August"
                                                            control={<Checkbox checked={checkboxStates.aug} onChange={handleChange} name="aug" />}
                                                        />
                                                        <FormControlLabel
                                                            label="September"
                                                            control={<Checkbox checked={checkboxStates.sept} onChange={handleChange} name="sept" />}
                                                        />
                                                        <FormControlLabel
                                                            label="October"
                                                            control={<Checkbox checked={checkboxStates.oct} onChange={handleChange} name="oct" />}
                                                        />
                                                        <FormControlLabel
                                                            label="November"
                                                            control={<Checkbox checked={checkboxStates.nov} onChange={handleChange} name="nov" />}
                                                        />
                                                        <FormControlLabel
                                                            label="December"
                                                            control={<Checkbox checked={checkboxStates.dec} onChange={handleChange} name="dec" />}
                                                        />
                                                    </div>
                                                </AccordionDetails>
                                            </Accordion>
                                        </Box>
                                    </div>
                                </div>
                                <div className="print" style={{ cursor: "pointer" }} onClick={() => handlePrint()} >
                                    <img src={Print} alt="" className="export" />
                                </div>
                                <div style={{ display: "none" }}><ComponentToPrint ref={componentRef} list={props.list} /></div>
                            </div>
                        </div>
                        <table className='Projects_table'>
                            <thead>
                                <tr>
                                    <td><h4>PROJECT</h4> </td>
                                    <td><h4>TARGET BENEFICIARIES</h4></td>
                                    <td><h4>TARGET PARTICIPANTS</h4></td>
                                    <td><h4>TARGET MONTH</h4></td>
                                    <td><h4>ACTION</h4></td>
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
                                    <td colSpan={4}>
                                        <PageNumber
                                            projectsPerPage={projectsPerPage}//ResidentPerPage
                                            totalProjects={projects.length}
                                            paginate={paginate}
                                        />
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </> :
                    <div style={{ height: "calc(100vh - 160px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <CircularProgress size={100} />
                    </div>
                }
            </>
        );
    }
};

export default Table;