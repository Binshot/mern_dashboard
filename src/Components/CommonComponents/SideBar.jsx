import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../NewImageFiles/Sidebar/Logo.svg";

import { useLogout } from '../../hooks/useLogout'

//Active Icons
import ActiveOverview from "../NewImageFiles/Sidebar/ActiveOverview.svg";
import ActiveOrganization from "../NewImageFiles/Sidebar/ActiveOrganization.svg";
import ActiveResident from "../NewImageFiles/Sidebar/ActiveResident.svg";
import ActiveAnnouncement from "../NewImageFiles/Sidebar/ActiveAnnouncement.svg";
import ActiveEvent from "../NewImageFiles/Sidebar/ActiveEvents.svg";
import ActiveProject from "../NewImageFiles/Sidebar/ActiveProjects.svg";
import ActiveMessage from "../NewImageFiles/Sidebar/ActiveMessage.svg";
import ActiveHelp from "../NewImageFiles/Sidebar/ActiveHelp.svg";
import ActiveActivityLogs from "../NewImageFiles/Sidebar/ActiveActivityLogs.svg";

//Unactive Icons
import Overview from "../NewImageFiles/Sidebar/Overview.svg";
import Organization from "../NewImageFiles/Sidebar/Organization.svg";
import Residents from "../NewImageFiles/Sidebar/Residents.svg";
import Announcement from "../NewImageFiles/Sidebar/Announcement.svg";
import Events from "../NewImageFiles/Sidebar/Events.svg";
import Projects from "../NewImageFiles/Sidebar/Projects.svg";
import Messages from "../NewImageFiles/Sidebar/Messages.svg";
import Help from "../NewImageFiles/Sidebar/Help.svg";
import Activity from "../NewImageFiles/Sidebar/Activity.svg";
import LogOut from "../NewImageFiles/Sidebar/Logout.svg";

export default function SideBar() {
    const path = useLocation().pathname

    const { logout } = useLogout()

    const handleLogout = () => {
        logout()
    }

    return (
        <div id='sideBlur' className="sidebar">
            <div className="logo flex-row">
                <img src={Logo} alt="" />
                <p>DRIMS </p>
            </div>
            <div className="navbar">
                <NavLink to="/overview">
                    <div className="flex-row navLinks">
                        <img src={(path === "/overview") ? ActiveOverview : Overview} alt="" />
                        <p>Overview</p>
                    </div>
                </NavLink>
                <NavLink to="/organization">
                    <div className="flex-row navLinks">
                        <img src={(path === "/organization") ? ActiveOrganization : Organization} alt="" />
                        Organization
                    </div>
                </NavLink>
                <NavLink to="/residents">
                    <div className="flex-row navLinks">
                        <img src={(path === "/residents") ? ActiveResident : Residents} alt="" />
                        Residents
                    </div>

                </NavLink>
                <NavLink to="/announcement">
                    <div className="flex-row navLinks">
                        <img src={(path === "/announcement") ? ActiveAnnouncement : Announcement} alt="" />
                        Announcements
                    </div>

                </NavLink>
                <NavLink to="/events">
                    <div className="flex-row navLinks">
                        <img src={(path === "/events") ? ActiveEvent : Events} alt="" />
                        Events
                    </div>
                </NavLink>
                <NavLink to="/project">
                    <div className="flex-row navLinks">
                        <img src={(path === "/project") ? ActiveProject : Projects} alt="" />
                        Projects
                    </div>
                </NavLink>
                <NavLink to="/messages">
                    <div className="flex-row navLinks">
                        <img src={(path === "/messages") ? ActiveMessage : Messages} alt="" />
                        Messages
                        <div className="messageNotif">
                            1
                        </div>
                    </div>
                </NavLink>
                <div className="lowerNav">
                    <NavLink to="/help">
                        <div className="flex-row navLinks">
                            <img src={(path === "/help") ? ActiveHelp : Help} alt="" />
                            Help
                        </div>
                    </NavLink>
                    <NavLink to="/activity_logs">
                        <div className="flex-row navLinks">
                            <img src={(path === "/activity_logs") ? ActiveActivityLogs : Activity} alt="" />
                            Activity Logs
                        </div>
                    </NavLink>
                    <NavLink to="/login">
                        <div className="flex-row navLinks" onClick={handleLogout}>
                            <img src={LogOut} alt="" />
                            Logout
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
