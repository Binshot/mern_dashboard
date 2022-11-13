import Header from "./Header"
import ResidentsTable from "./ActivityLogsTable"
import React, { useEffect, useState } from "react";
import { useActivityLogsContext } from "../../hooks/useActivtyLogsContext"
import CircularProgress from '@mui/material/CircularProgress';
import EmptyState_Activity from "../NewImageFiles/EmptyStates/Activity.svg"
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

    if (rows) {
        return (
            <div id="mainContentBlur" className="content">
                <Header get={getRows} />
                {rows.length != 0
                    ? <ResidentsTable list={rows} /> 
                    : <div className="emptyState">
                        <img src={EmptyState_Activity} />
                        <h2>No Activity Yet</h2>
                        <p>When you make changes to your site you'll be
                            able to see your activity history here</p>
                    </div>
                }
            </div>
        );
    } else {
        return (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress size={100} sx={{ color: "#0C1096" }} />
            </div>
        )
    }
}

export default ActivityLog;