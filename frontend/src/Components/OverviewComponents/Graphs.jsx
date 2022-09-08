import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const data = [
    {
        name: "Jan",
        2022: 10000,
        2021: 25000,
        amt: 2400
    },
    {
        name: "Feb",
        2022: 20000,
        2021: 26000,
        amt: 2210
    },
    {
        name: "Mar",
        2022: 32535,
        2021: 16329,
        amt: 2290
    },
    {
        name: "Apr",
        2022: 41000,
        2021: 16000,
        amt: 2000
    },
    {
        name: "May",
        2022: 48000,
        2021: 16000,
        amt: 2181
    },
    {
        name: "Jun",
        2022: 40000,
        2021: 22000,
        amt: 2500
    },
    {
        name: "Jul",
        2022: 35000,
        2021: 30000,
        amt: 2100
    }
];

export default function App() {
    return (
        <div>
            <ResponsiveContainer width='100%' height={500}>
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 40
                    }}
                >
                    <CartesianGrid strokeDasharray="2" />
                    <XAxis dataKey="name"/>
                    <YAxis />
                    <Tooltip />
                    <Legend  align="right" verticalAlign="bottom" iconSize={20}/>
                    <Bar dataKey="2022" fill="#288DD7" barSize={40}/>
                    <Bar dataKey="2021" fill="#D4E8F7" barSize={40}/>
                </BarChart>
            </ResponsiveContainer>
        </div>

    );
}