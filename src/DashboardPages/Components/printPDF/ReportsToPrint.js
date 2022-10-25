import React from "react";
import Logo from "../NewImageFiles/Sidebar/Logo.svg";
import { format } from "date-fns";
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
    Cell
} from "recharts";
export const ComponentToPrint = React.forwardRef((props, ref) => {
    const date = new Date()
    console.log(props.list.at(0))
    return (
        <div ref={ref} className="PDFTemplate">
            <div className="headerTemplate">
                <img src={Logo} style={{ width: "100px", height: "100px" }} />
                <h2 style={{ textAlign: 'center' }}>Del Rosario Compound <br />Neighborhood Association Inc.</h2>
                <p>{format(new Date(date), "Pp")}</p>
            </div>
            <div style={{ marginLeft: '10px' }}>
                <h2>Reports</h2>
            </div>
            <div className="pdfCharts">
                <div className="chartName">Residents Age Chart</div>
                <ResponsiveContainer width={1500} height={800}>
                    <BarChart
                        data={props.list.at(0)}
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
                        <Bar dataKey="value" fill="#288DD7" barSize={40} label={{ position: "top" }} isAnimationActive={false} />

                    </BarChart>
                </ResponsiveContainer>

                <div className="pageBreak">
                    <div className="chartName" style={{marginTop: "50px"}}>Residents Occupation Chart</div>
                    <ResponsiveContainer width={1500} height={800}>
                        <BarChart
                            data={props.list.at(1)}
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

                            <Bar dataKey="value" fill="#288DD7" barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="pageBreak">
                    <div className="chartName" style={{marginTop: "300px"}}>Resident's Educational Attainment Chart</div>
                    <ResponsiveContainer width={1500} height={800}>
                        <BarChart
                            data={props.list.at(2)}
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

                            <Bar dataKey="value" fill="#288DD7" barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="pageBreak">
                    <div className="chartName" style={{marginTop: "300px"}}>Resident's Monthly Income Chart</div>
                    <ResponsiveContainer width={1500} height={800}>
                        <BarChart
                            data={props.list.at(3)}
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

                            <Bar dataKey="value" fill="#288DD7" barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="pageBreak">
                    <div className="chartName" style={{marginTop: "300px"}}>Resident's Gender Piechart</div>
                    <ResponsiveContainer width={1500} height={500} >
                        <PieChart>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={props.list.at(4)}
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
                </div>
            </div>
        </div>
    );
});