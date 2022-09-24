import Container from "../AnnouncementComponents/Container"
import React from "react";
import { AnnouncementContextProvider } from '../../context/AnnouncementContext'

function Announcement() {
    return (
        <AnnouncementContextProvider>
            <Container />
        </AnnouncementContextProvider>
    );
}

export default Announcement;