import Header from "../AnnouncementComponents/Header"
import ResidentsTable from "../AnnouncementComponents/AnnouncementTable"
import React from "react";
import { AnnouncementContextProvider } from '../../context/AnnouncementContext'

function Announcement() {
    return (
        <AnnouncementContextProvider>
            <div className="content">
                <Header />
                <ResidentsTable />
            </div>
        </AnnouncementContextProvider>
    );
}

export default Announcement;