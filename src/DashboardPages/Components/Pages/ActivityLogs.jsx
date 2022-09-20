import Header from "../ActivityLogsComponents/Header"
import ResidentsTable from "../ActivityLogsComponents/ActivityLogsTable"
import React from "react";
import { ActivityLogsContextProvider } from "../../context/ActivityLogsContext"
function ActivityLog() {
    return (
        <ActivityLogsContextProvider>
            <div className="content">
                <Header />
                <ResidentsTable />
            </div>
        </ActivityLogsContextProvider>
    );
}

export default ActivityLog;