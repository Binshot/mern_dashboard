import React, { useState, useEffect, useRef } from "react";
import { CircularProgress, Autocomplete, TextField } from '@mui/material';
import Print from "../NewImageFiles/Topbar/Print.svg"
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../printPDF/ReportsToPrint';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Label,
    LabelList
} from "recharts";

export default function App() {
    const [gender, setGender] = useState(null)
    const [education, seteducation] = useState(null)
    const [age, setage] = useState(null)
    const [occupation, setoccupation] = useState(null)
    const [income, setincome] = useState(null)
    const [selectCategory, setselectCategory] = useState(null)
    useEffect(() => {
        const getGenderResults = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/residents/overview/gender')
            const json = await response.json()
            if (response.ok) {
                setGender(json)
            }
        }
        const getEducationResults = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/residents/overview/education')
            const json = await response.json()
            if (response.ok) {
                seteducation(json)
            }
        }
        const getAgeResults = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/residents/overview/age')
            const json = await response.json()
            if (response.ok) {
                setage(json)
            }
        }
        const getOccupationResults = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/residents/overview/occupation')
            const json = await response.json()
            if (response.ok) {
                setoccupation(json)
            }
        }
        const getIncomeResults = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/residents/overview/income')
            const json = await response.json()
            if (response.ok) {
                setincome(json)
            }
        }
        getIncomeResults()
        getAgeResults()
        getOccupationResults()
        getGenderResults()
        getEducationResults()
    }, [])

    const tagOption = ['Age', 'Occupation', 'Education Attainment', 'Monthly Income', "Gender"];

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

    return (
        <>
            {gender && education && age && occupation ?
                <div>
                    <div className='flex-row graphHeader space-between'>
                        <h1>Report</h1>
                        <div className="rightAlign actions" style={{ cursor: "pointer" }} onClick={() => handlePrint()} >
                            <img src={Print} alt="" className="export" />
                        </div>
                        <div style={{ display: "none" }}><ComponentToPrint ref={componentRef} list={[age,occupation,education, income,gender]}/></div>
                    </div>
                    <div className='flex-row' style={{ marginBottom: " 24px" }}>
                        <div style={{ width: "30%", marginRight: "24px" }}>
                            <h4 style={{ marginBottom: "8px" }}>Category</h4>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={tagOption}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} placeholder="Choose Category" />}
                                onChange={(e, value) => {
                                    setselectCategory(value)
                                }}
                            />
                        </div>
                        {/* <div>
                            <h4 style={{ marginBottom: "8px" }}>From</h4>
                            <TextField
                                id="date"
                                type="date"
                                inputProps={{
                                    max: new Date().toISOString().slice(0, 10)
                                }}
                                sx={{ width: '100%' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div style={{ fontWeight: "bolder", padding: "40px 16px 0 " }}>
                            __
                        </div>
                        <div>
                            <h4 style={{ marginBottom: "8px" }}>To</h4>
                            <TextField
                                id="date"
                                type="date"
                                inputProps={{
                                    max: new Date().toISOString().slice(0, 10)
                                }}
                                sx={{ width: '100%' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div> */}
                    </div>


                    {(selectCategory == null || selectCategory == "Age") && (
                        <>
                            <div className="chartName">Residents Age Chart</div>
                            <ResponsiveContainer width='100%' height={500}>
                                <BarChart
                                    data={age}
                                    margin={{
                                        top: 5,
                                        right: 100,
                                        left: 100,
                                        bottom: 40
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="5" />
                                    <XAxis dataKey="name" />
                                    <YAxis width={10} allowDecimals={false} />
                                    <Tooltip />
                                    {/* <Legend align="right" verticalAlign="bottom" iconSize={20} /> */}
                                    <Bar dataKey="value" fill="#288DD7" barSize={40} isAnimationActive={false}/>
                                        
                                </BarChart>
                            </ResponsiveContainer>
                        </>
                    )}
                    {(selectCategory == null || selectCategory == "Occupation") && (
                        <>
                            <div className="chartName">Residents Occupation Chart</div>
                            <ResponsiveContainer width='100%' height={500}>
                                <BarChart
                                    data={occupation}
                                    margin={{
                                        top: 5,
                                        right: 100,
                                        left: 100,
                                        bottom: 40
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="5" />
                                    <XAxis dataKey="name" />
                                    <YAxis width={10} allowDecimals={false} />
                                    <Tooltip />
                                    {/* <Legend align="right" verticalAlign="bottom" iconSize={20} /> */}
                                    <Bar dataKey="value" fill="#288DD7" barSize={40} isAnimationActive={false} />
                                </BarChart>
                            </ResponsiveContainer>
                        </>
                    )}
                    {(selectCategory == null || selectCategory == "Education Attainment") && (
                        <>
                            <div className="chartName">Resident's Educational Attainment Chart</div>
                            <ResponsiveContainer width='100%' height={500}>
                                <BarChart
                                    data={education}
                                    margin={{
                                        top: 5,
                                        right: 100,
                                        left: 100,
                                        bottom: 40
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="5" />
                                    <XAxis dataKey="name" />
                                    <YAxis width={10} allowDecimals={false} />
                                    <Tooltip />
                                    {/* <Legend align="right" verticalAlign="bottom" iconSize={20} /> */}
                                    <Bar dataKey="value" fill="#288DD7" barSize={40} isAnimationActive={false} />
                                </BarChart>
                            </ResponsiveContainer>
                        </>
                    )}
                    {(selectCategory == null || selectCategory == "Monthly Income") && (
                        <>
                            <div className="chartName">Resident's Monthly Income Chart</div>
                            <ResponsiveContainer width='100%' height={500}>
                                <BarChart
                                    data={income}
                                    margin={{
                                        top: 5,
                                        right: 100,
                                        left: 100,
                                        bottom: 40
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="5" />
                                    <XAxis dataKey="name" />
                                    <YAxis width={10} allowDecimals={false} />
                                    <Tooltip />
                                    {/* <Legend align="right" verticalAlign="bottom" iconSize={20} /> */}
                                    <Bar dataKey="value" fill="#288DD7" barSize={40} isAnimationActive={false} />
                                </BarChart>
                            </ResponsiveContainer>
                        </>
                    )}
                    {(selectCategory == null || selectCategory == "Gender") && (
                        <>
                            <div className="chartName">Resident's Gender Piechart</div>
                            <ResponsiveContainer width="100%" height={500} >
                                <PieChart>
                                    <Pie
                                        dataKey="value"
                                        isAnimationActive={false}
                                        data={gender}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={180}
                                        fill="#8884d8"
                                        label
                                    >
                                        <Cell key={'cell-1'} fill={"#288DD7"} />
                                        <Cell key={'cell-2'} fill={"#FC46AA"} />
                                    </Pie>
                                    <Legend align="right" verticalAlign="bottom" iconSize={40} />
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </>
                    )}
                </div> :
                <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CircularProgress size={100} sx={{color: "#0C1096"}}/>
                </div>
            }
        </>
    );
}