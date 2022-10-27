import Container from "../AnnouncementComponents/Container"
import React from "react";
import { AnnouncementContextProvider } from '../../context/AnnouncementContext'
import useTitle from "../../hooks/useTitle"
function Announcement() {
    useTitle("DRIMS | Announcements")
    return (
        <AnnouncementContextProvider>
            <Container />
        </AnnouncementContextProvider>
    );
}

export default Announcement;