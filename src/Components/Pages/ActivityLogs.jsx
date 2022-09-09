import Header from "../ActivityLogsComponents/Header"
import ResidentsTable from "../ActivityLogsComponents/ActivityLogsTable"
import ActivityList from "../dummyDB/Activity";
import React from "react";
function ActivityLog() {
    return (
        <div className="content">
            <Header />
            <ResidentsTable list={ActivityList}/>
        </div>
    );
}

export default ActivityLog;