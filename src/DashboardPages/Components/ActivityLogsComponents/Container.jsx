import Header from "./Header"
import ResidentsTable from "./ActivityLogsTable"
import React, { useEffect, useState } from "react";
import { useActivityLogsContext } from "../../hooks/useActivtyLogsContext"
import CircularProgress from '@mui/material/CircularProgress';
function ActivityLog() {
    const { activity, activityDispatch } = useActivityLogsContext()
    const [rows, setRows] = useState(null)
    const getRows = rows => setRows(rows)
    useEffect(() => {
        const fetchActivities = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/activity/')
            const json = await response.json()
            if (response.ok) {
                activityDispatch({ type: 'SET_ACTIVITY', payload: json })
                setRows(json)
            }
        }

        fetchActivities()
    }, [])

    if (activity) {
        return (
            <div id="mainContentBlur" className="content">
                <Header get={getRows} />
                <ResidentsTable list={rows} />
            </div>
        );
    } else {
        return (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress size={100} sx={{color: "#0C1096"}}/>
            </div>
        )
    }
}

export default ActivityLog;