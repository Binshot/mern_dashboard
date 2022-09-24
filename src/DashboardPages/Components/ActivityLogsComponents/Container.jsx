import Header from "./Header"
import ResidentsTable from "./ActivityLogsTable"
import React, { useEffect, useState } from "react";
import { useActivityLogsContext } from "../../hooks/useActivtyLogsContext"
function ActivityLog() {
    const { activity, activityDispatch } = useActivityLogsContext()
    const [rows, setRows] = useState(null)
    const getRows = rows => setRows(rows)
    useEffect(() => {
        const fetchActivities = async () => {
            const response = await fetch('https://drims-demo.herokuapp.com/api/activity/')
            const json = await response.json()
            if (response.ok) {
                activityDispatch({ type: 'SET_ACTIVITY', payload: json })
                setRows(json)
            }
        }

        fetchActivities()
    }, [activityDispatch])

    if (activity) {
        return (
            <div className="content">
                <Header get={getRows} />
                <ResidentsTable list={rows}/>
            </div>
        );
    }
}

export default ActivityLog;