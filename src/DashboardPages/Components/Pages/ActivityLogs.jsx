import Container from "../ActivityLogsComponents/Container"
import React from "react";
import { ActivityLogsContextProvider } from "../../context/ActivityLogsContext"
import useTitle from "../../hooks/useTitle"
function ActivityLog() {
    useTitle("DRIMS | Activity logs")
    return (
        <ActivityLogsContextProvider>
            <Container />
        </ActivityLogsContextProvider>
    );
}

export default ActivityLog;