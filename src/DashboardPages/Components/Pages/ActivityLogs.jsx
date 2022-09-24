import Container from "../ActivityLogsComponents/Container"
import React from "react";
import { ActivityLogsContextProvider } from "../../context/ActivityLogsContext"
function ActivityLog() {
    return (
        <ActivityLogsContextProvider>
            <Container />
        </ActivityLogsContextProvider>
    );
}

export default ActivityLog;