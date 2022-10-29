import Header from "../ProjectComponents/Header"
import Table from "../ProjectComponents/Table"
import ProjectList from "../dummyDB/Projects"
import React, { useEffect, useState, useRef } from "react";
import { Accordion, AccordionSummary, AccordionDetails, FormControlLabel, Checkbox, TextField, CircularProgress, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Print from "../NewImageFiles/Topbar/Print.svg"
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../printPDF/ProjectToPrint';
import useTitle from "../../hooks/useTitle"
function Projects() {

    useTitle("DRIMS | Projects")

    const [allProjects, setAllProjects] = useState(null)
    const [prescriptiveProjects, setPrescriptiveProjects] = useState(null)
    const [filteredRow, setfilteredRow] = useState(null)
    const [Counts, setCounts] = useState(null)

    useEffect(() => {
        const getAllPorjects = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/projects/')
            const json = await response.json()
            if (response.ok) {
                setAllProjects(json)
            }
        }
        const getPresciptivePorjects = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/projects/prescriptive')
            const json = await response.json()
            if (response.ok) {
                setPrescriptiveProjects(json)
                setfilteredRow(json)
            }
        }
        const getCounts = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/projects/count-data')
            const json = await response.json()
            if (response.ok) {
                setCounts(json)
            }
        }

        getCounts()
        getPresciptivePorjects()
        getAllPorjects()
    }, [])

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

    const [active, setactive] = useState(false)
    const [showDropDown, setshowDropDown] = useState(false)
    const [particiantsNum, setparticiantsNum] = useState(0)
    const [getFilters, setGetFilters] = useState([])

    const handleSave = () => {
        const checkboxLength = document.querySelectorAll('input[type=checkbox]:checked').length != 0
        setactive(particiantsNum != 0 || checkboxLength)
        setshowDropDown(false)

        requestSearch()
    }

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
        male: false,
        female: false,
        January: false,
        Febuary: false,
        March: false,
        April: false,
        May: false,
        June: false,
        July: false,
        August: false,
        September: false,
        October: false,
        November: false,
        December: false,
        no_formal: false,
        elementary: false,
        highschool: false,
        bachelor: false,
        master: false,
        doctorate: false
    })

    const handleChange = (event) => {
        event.target.checked
            ? setGetFilters([...getFilters, event.target.name == "below12"
                ? "<13"
                : event.target.name == "_13_21"
                    ? "13-21"
                    : event.target.name == "_22_30"
                        ? "21-30"
                        : event.target.name == "_31_40"
                            ? "30-40"
                            : event.target.name == "_41_50"
                                ? "40-50"
                                : event.target.name == "_51_60"
                                    ? "50-60"
                                    : event.target.name == "above60"
                                        ? ">60"
                                        : event.target.name])
            : setGetFilters(getFilters.filter(w => w != (event.target.name == "below12"
                ? "<13"
                : event.target.name == "_13_21"
                    ? "13-21"
                    : event.target.name == "_22_30"
                        ? "21-30"
                        : event.target.name == "_31_40"
                            ? "30-40"
                            : event.target.name == "_41_50"
                                ? "40-50"
                                : event.target.name == "_51_60"
                                    ? "50-60"
                                    : event.target.name == "above60"
                                        ? ">60"
                                        : event.target.name)))

        setcheckboxStates({
            ...checkboxStates,
            [event.target.name]: event.target.checked,
        });
    }

    const clearAll = () => {
        setactive(false)
        setparticiantsNum(0)
        setGetFilters([])
        setfilteredRow(prescriptiveProjects)
        setcheckboxStates({
            ...checkboxStates,
            ["below12"]: false,
            ["_13_21"]: false,
            ["_22_30"]: false,
            ["_31_40"]: false,
            ["_41_50"]: false,
            ["_51_60"]: false,
            ["above60"]: false,
            ["student"]: false,
            ["unemployed"]: false,
            ["employed"]: false,
            ["self_employed"]: false,
            ["male"]: false,
            ["female"]: false,
            ["January"]: false,
            ["Febuary"]: false,
            ["March"]: false,
            ["April"]: false,
            ["May"]: false,
            ["June"]: false,
            ["July"]: false,
            ["August"]: false,
            ["September"]: false,
            ["October"]: false,
            ["November"]: false,
            ["December"]: false,
            ["no_formal"]: false,
            ["elementary"]: false,
            ["highschool"]: false,
            ["bachelor"]: false,
            ["master"]: false,
            ["doctorate"]: false,
        });
    }

    const requestSearch = () => {
        const filteredRows = allProjects.filter((row) => {
            return (
                row.target.age.some(r => getFilters.includes(r))
                || row.target.education.some(r => getFilters.includes(r))
                || row.target.gender.some(r => getFilters.includes(r))
                || row.target.month.some(r => getFilters.includes(r))
                || row.target.occupation.some(r => getFilters.includes(r))
            )
        });

        filteredRows.length != 0 && setfilteredRow(filteredRows)
    };

    return (
        <>
            {Counts && filteredRow ?
                <>
                    <div id='headerBlur' className='header'>
                        <div className="flex-row borderBottom2 topHeader">
                            <h1>PROJECTS</h1>
                        </div>
                        <div className='header_actions'>
                            <div className="dropdown">
                                <button className={active ? 'filter active' : 'filter notActive'}
                                    onClick={() => {
                                        setshowDropDown(!showDropDown)
                                    }}>
                                    <div className={active ? 'filterIcon activeIcon' : "filterIcon notActiveIcon "}></div>
                                    Filter
                                </button>
                                <div className={showDropDown ? "dropdown-content show" : "dropdown-content hide"}>
                                    <div className='dropdown-content-header'>
                                        Filters
                                        <div>
                                            <button onClick={() => {
                                                setshowDropDown(false)
                                                clearAll()
                                            }}>Clear All</button>
                                            <button onClick={() => {
                                                handleSave()
                                                // requestSearch()
                                            }}>Save</button>
                                        </div>
                                    </div>
                                    <Box sx={{ width: 400, maxHeight: '50vh', overflow: 'auto' }}>
                                        <div style={{ padding: "24px" }}>
                                            Target Number of Participant
                                            <TextField
                                                type="number"
                                                value={particiantsNum}
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
                                                onChange={(e) => {
                                                    e.target.value >= 0 && setparticiantsNum(e.target.value)
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
                                                    control={<Checkbox className="box" checked={checkboxStates.male} onChange={handleChange} name="male" />}
                                                />
                                                <FormControlLabel
                                                    label={`Female (${Counts.count_female})`}
                                                    control={<Checkbox className="box" checked={checkboxStates.female} onChange={handleChange} name="female" />}
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
                                                    control={<Checkbox className="box" checked={checkboxStates.below12} onChange={handleChange} name="below12" />}
                                                />
                                                <FormControlLabel
                                                    label={`13 - 21 Years old (${Counts.count_from13_to21})`}
                                                    control={<Checkbox className="box" checked={checkboxStates._13_21} onChange={handleChange} name="_13_21" />}
                                                />
                                                <FormControlLabel
                                                    label={`22 - 30 Years old (${Counts.count_from21_to30})`}
                                                    control={<Checkbox className="box" checked={checkboxStates._22_30} onChange={handleChange} name="_22_30" />}
                                                />
                                                <FormControlLabel
                                                    label={`31 - 40 Years old (${Counts.count_from30_to40})`}
                                                    control={<Checkbox className="box" checked={checkboxStates._31_40} onChange={handleChange} name="_31_40" />}
                                                />
                                                <FormControlLabel
                                                    label={`41 - 50 Years old (${Counts.count_from40_to50})`}
                                                    control={<Checkbox className="box" checked={checkboxStates._41_50} onChange={handleChange} name="_41_50" />}
                                                />
                                                <FormControlLabel
                                                    label={`51 - 60 Years old (${Counts.count_from50_to60})`}
                                                    control={<Checkbox className="box" checked={checkboxStates._51_60} onChange={handleChange} name="_51_60" />}
                                                />
                                                <FormControlLabel
                                                    label={`Above 60 (${Counts.count_above60})`}
                                                    control={<Checkbox className="box" checked={checkboxStates.above60} onChange={handleChange} name="above60" />}
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
                                                    control={<Checkbox className="box" checked={checkboxStates.student} onChange={handleChange} name="student" />}
                                                />
                                                <FormControlLabel
                                                    label={`Unemplyed (${Counts.count_not_employed})`}
                                                    control={<Checkbox className="box" checked={checkboxStates.unemployed} onChange={handleChange} name="unemployed" />}
                                                />
                                                <FormControlLabel
                                                    label={`Employed (${Counts.count_employed})`}
                                                    control={<Checkbox className="box" checked={checkboxStates.employed} onChange={handleChange} name="employed" />}
                                                />
                                                <FormControlLabel
                                                    label={`Self-Employed (${Counts.count_self_employed})`}
                                                    control={<Checkbox className="box" checked={checkboxStates.self_employed} onChange={handleChange} name="self_employed" />}
                                                />
                                                {/* <FormControlLabel
                                                        label={`Not Applicable (${Counts.count_occupation_na})`}
                                                        control={<Checkbox className="box" checked={checkboxStates.occupation_not_applicable} onChange={handleChange} name="occupation_not_applicable" />}
                                                    /> */}
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
                                                    control={<Checkbox className="box" checked={checkboxStates.no_formal} onChange={handleChange} name="no_formal" />}
                                                />
                                                <FormControlLabel
                                                    label={`Elementary (${Counts.count_elementary})`}
                                                    control={<Checkbox className="box" checked={checkboxStates.elementary} onChange={handleChange} name="elementary" />}
                                                />
                                                <FormControlLabel
                                                    label={`High School (${Counts.count_highschool})`}
                                                    control={<Checkbox className="box" checked={checkboxStates.highschool} onChange={handleChange} name="highschool" />}
                                                />
                                                <FormControlLabel
                                                    label={`Bachelor’s Degree (${Counts.count_bachelor})`}
                                                    control={<Checkbox className="box" checked={checkboxStates.bachelor} onChange={handleChange} name="bachelor" />}
                                                />
                                                <FormControlLabel
                                                    label={`Master’s Degree (${Counts.count_master})`}
                                                    control={<Checkbox className="box" checked={checkboxStates.master} onChange={handleChange} name="master" />}
                                                />
                                                <FormControlLabel
                                                    label={`Doctorate or Higher (${Counts.count_doctorate})`}
                                                    control={<Checkbox className="box" checked={checkboxStates.doctorate} onChange={handleChange} name="doctorate" />}
                                                />
                                                {/* <FormControlLabel
                                                        label={`Not Applicable (${Counts.count_education_na})`}
                                                        control={<Checkbox className="box" checked={checkboxStates.education_not_applicable} onChange={handleChange} name="education_not_applicable" />}
                                                    /> */}
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
                                                        control={<Checkbox className="box" checked={checkboxStates.January} onChange={handleChange} name="January" />}
                                                    />
                                                    <FormControlLabel
                                                        label="Febuary"
                                                        control={<Checkbox className="box" checked={checkboxStates.Febuary} onChange={handleChange} name="Febuary" />}
                                                    />
                                                    <FormControlLabel
                                                        label="March"
                                                        control={<Checkbox className="box" checked={checkboxStates.March} onChange={handleChange} name="March" />}
                                                    />
                                                    <FormControlLabel
                                                        label="April"
                                                        control={<Checkbox className="box" checked={checkboxStates.April} onChange={handleChange} name="April" />}
                                                    />
                                                    <FormControlLabel
                                                        label="May"
                                                        control={<Checkbox className="box" checked={checkboxStates.May} onChange={handleChange} name="May" />}
                                                    />
                                                    <FormControlLabel
                                                        label="June"
                                                        control={<Checkbox className="box" checked={checkboxStates.June} onChange={handleChange} name="June" />}
                                                    />
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                    <FormControlLabel
                                                        label="July"
                                                        control={<Checkbox className="box" checked={checkboxStates.July} onChange={handleChange} name="July" />}
                                                    />
                                                    <FormControlLabel
                                                        label="August"
                                                        control={<Checkbox className="box" checked={checkboxStates.August} onChange={handleChange} name="August" />}
                                                    />
                                                    <FormControlLabel
                                                        label="September"
                                                        control={<Checkbox className="box" checked={checkboxStates.September} onChange={handleChange} name="September" />}
                                                    />
                                                    <FormControlLabel
                                                        label="October"
                                                        control={<Checkbox className="box" checked={checkboxStates.October} onChange={handleChange} name="October" />}
                                                    />
                                                    <FormControlLabel
                                                        label="November"
                                                        control={<Checkbox className="box" checked={checkboxStates.November} onChange={handleChange} name="November" />}
                                                    />
                                                    <FormControlLabel
                                                        label="December"
                                                        control={<Checkbox className="box" checked={checkboxStates.December} onChange={handleChange} name="December" />}
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
                            <div style={{ display: "none" }}><ComponentToPrint ref={componentRef} list={filteredRow} /></div>
                        </div>
                    </div>
                    <div id="mainContentBlur" className="content">
                        <Table prescriptiveList={filteredRow} counts={Counts} />
                    </div>
                </> :
                <div style={{ height: "calc(100vh - 160px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CircularProgress size={100} />
                </div>
            }
        </>
    );
}

export default Projects;