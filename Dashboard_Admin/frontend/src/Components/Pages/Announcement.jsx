import Header from "../AnnouncementComponents/Header"
import ResidentsTable from "../AnnouncementComponents/AnnouncementTable"

import AnnouncementList from "../dummyDB/Announcement";
import { useState } from "react";
function Announcement() {
    // const [announcementList, setAnnouncementList] = useState(AnnouncementList)

    // const getannouncement = announcemnt => setAnnouncementList(oldArray => [...oldArray, announcemnt])
    return (
        <div className="content">
            {/* <Header get={getannouncement} length={announcementList.length} /> */}
            <Header/>
            <ResidentsTable/>
        </div>
    );
}

export default Announcement;