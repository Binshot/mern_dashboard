import React, { useEffect, useState } from 'react'

import overviewFrame1 from "../NewImageFiles/Help/Overview/img1.svg"
import overviewFrame2 from "../NewImageFiles/Help/Overview/img2.svg"
import overviewFrame3 from "../NewImageFiles/Help/Overview/img3.svg"

import OrganizationFrame1 from "../NewImageFiles/Help/Organization/img1.svg"
import OrganizationFrame2 from "../NewImageFiles/Help/Organization/img2.svg"
import OrganizationFrame3 from "../NewImageFiles/Help/Organization/img3.svg"
import OrganizationFrame4 from "../NewImageFiles/Help/Organization/img4.svg"

import ResidentsFrame1 from "../NewImageFiles/Help/Residents/img1.svg"
import ResidentsFrame2 from "../NewImageFiles/Help/Residents/img2.svg"
import ResidentsFrame3 from "../NewImageFiles/Help/Residents/img3.svg"
import ResidentsFrame4 from "../NewImageFiles/Help/Residents/img4.svg"
import ResidentsFrame5 from "../NewImageFiles/Help/Residents/img5.svg"

import AnnouncementFrame1 from "../NewImageFiles/Help/Announcement/img1.svg"
import AnnouncementFrame2 from "../NewImageFiles/Help/Announcement/img2.svg"
import AnnouncementFrame3 from "../NewImageFiles/Help/Announcement/img3.svg"
import AnnouncementFrame4 from "../NewImageFiles/Help/Announcement/img4.svg"
import AnnouncementFrame5 from "../NewImageFiles/Help/Announcement/img5.svg"

import EventsFrame1 from "../NewImageFiles/Help/Events/img1.svg"
import EventsFrame2 from "../NewImageFiles/Help/Events/img2.svg"
import EventsFrame3 from "../NewImageFiles/Help/Events/img3.svg"
import EventsFrame4 from "../NewImageFiles/Help/Events/img4.svg"
import EventsFrame5 from "../NewImageFiles/Help/Events/img5.svg"

import Project from "../NewImageFiles/Help/Project/img1.svg"

import MessagesFrame1 from "../NewImageFiles/Help/Messages/img1.svg"
import MessagesFrame2 from "../NewImageFiles/Help/Messages/img2.svg"

import ActivityFrame1 from "../NewImageFiles/Help/Activity/img1.svg"

import ProfileFrame1 from "../NewImageFiles/Help/Profile/img1.svg"

import LoginFrame1 from "../NewImageFiles/Help/Login/img1.svg"
import LoginFrame2 from "../NewImageFiles/Help/Login/img2.svg"

import LogoutFrame1 from "../NewImageFiles/Help/Logout/img1.svg"

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function Content() {
    const [showTopBtn, setShowTopBtn] = useState(false);
    document.getElementById('contents').addEventListener("scroll", () => {
        if (document.getElementById('contents').scrollTop > 600) {
            setShowTopBtn(true);
        } else {
            setShowTopBtn(false);
        }
    });
    const goToTop = () => {
        document.getElementById('contents').scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div className='helpContainer'>
            <div className="borderBottom2 topHeader">
                <h1>HELP & GETTING STARTED</h1>
            </div>
            <div className='helpContents'>
                <div style={{ flexGrow: "1" }}>
                    <div className='help'>
                        <p>In this module,  we will introduce you the modules and features of Del Rosario Management System Dashboard</p>
                        <ul>
                            <li>
                                Overview - includes an overview of the data collected in Del Rosario Community Neighborhood Association.
                                Data such as residents, users, families, and charts can be viewed.
                            </li>
                            <li>
                                Organization - In here you will find list of Officials who manage Del Rosario Community Neighborhood Association.
                                You can view, add, update, or delete an official.
                            </li>
                            <li>
                                Residents - In here you will find list of residents who lives in Del Rosario Community Neighborhood Association.
                                You can view, add, update, or delete a resident.
                            </li>
                            <li>
                                Announcements - In here you can create announcements for residents to remind them of events or sudden activities going on
                                in Del Rosario Community Neighborhood Association. You can view, add, update, or delete a announcement.
                            </li>
                            <li>
                                Events - In here you can create events for residents to participate. These events notify residents by using the mobile app,
                                DRIMS. You can view, add, update, or delete an event.
                            </li>
                            <li>
                                Projects - In here you can generate projects by using data analytics. Data such as resident’s information are used to
                                generate community projects for the Del Rosario Community Neighborhood Association.
                            </li>
                            <li>
                                Projects - In here you can generate projects by using data analytics. Data such as resident’s information are used to
                                generate community projects for the Del Rosario Community Neighborhood Association.
                            </li>
                            <li>
                                Activity Logs - In here you can view activities made by the admin. All activities are recorded.
                            </li>
                        </ul>
                        <div id='overview'>
                            <h2>Overview</h2>
                            <p>The Overview module is the first page you will land on upon successful login. The Overview gives you the
                                summary of information you collected. All these data can be created into a chart.</p>
                            <img src={overviewFrame1} alt="" />
                            <p>You can quickly view total number of users, residents, and families. You can also filter the data according
                                to a certain period and print the data.</p>
                            <img src={overviewFrame2} alt="" className='one' />
                            <p>Lastly, you can view charts according to category and the date period</p>
                            <img src={overviewFrame3} alt="" />
                        </div>
                        <div id='organization'>
                            <h2>Organization</h2>
                            <p>The Organization module is the second page of the dashboard. The Organization allows you to view, add, update,
                                or delete an Official.</p>
                            <img src={OrganizationFrame1} alt="" />
                            <p>You can view an Official’s information by clicking on the <span style={{ fontWeight: 'bold' }}>View Button</span> in their cards.</p>
                            <img src={OrganizationFrame2} alt="" />
                            <p>You can add and update an Official’s information. You can select a resident and select their position.</p>
                            <img src={OrganizationFrame3} alt="" />
                            <p>If you are going to delete an Official, a warning message is displayed. All data removed won't be restored.</p>
                            <img src={OrganizationFrame4} alt="" />
                        </div>
                        <div id='residents'>
                            <h2>Residents</h2>
                            <p>The Residents module is the third page of the dashboard. You can view, add, update, or delete a Resident.</p>
                            <img src={ResidentsFrame1} alt="" />
                            <p>You can add a Resident by clicking the div “Add Resident.” Information to be filled such as Personal, Background, and Family information.</p>
                            <img src={ResidentsFrame2} alt="" />
                            <p>You can view a Resident by clicking the div with an Eye Icon. </p>
                            <img src={ResidentsFrame3} alt="" />
                            <p>You can update the Resident’s information by clicking the div with an Edit Icon. </p>
                            <img src={ResidentsFrame4} alt="" />
                            <p>You can delete a resident by clicking the button with a Delete Icon. </p>
                            <img src={ResidentsFrame5} alt="" />
                        </div>
                        <div id='announcement'>
                            <h2>Announcement</h2>
                            <p>The Announcements module is the fourth page of the dashboard. You can view, add, update, or delete an announcement.</p>
                            <img src={AnnouncementFrame1} alt="" />
                            <p>You can add an announcement by clicking the div “Add Announcement.” You can write the title, and the description of the announcement</p>
                            <img src={AnnouncementFrame2} alt="" />
                            <p>You can view an announcement by clicking the div with an Eye Icon. </p>
                            <img src={AnnouncementFrame3} alt="" />
                            <p>You can update the announcement’s detail by clicking the div with an Edit Icon. </p>
                            <img src={AnnouncementFrame4} alt="" />
                            <p>You can delete an announcement by clicking the button with a Delete Icon. </p>
                            <img src={AnnouncementFrame5} alt="" />
                        </div>
                        <div id='events'>
                            <h2>Events</h2>
                            <p>The Events module is the fourth page of the dashboard. You can view, add, update, or delete an Event.</p>
                            <img src={EventsFrame1} alt="" />
                            <p>
                                You can add an Event by clicking the button “Add Event.”You can write the title, choose tag,
                                write the location, and event detail, and upload an event banner . Events are posted in the mobile app, DRIMS.
                            </p>
                            <img src={EventsFrame2} alt="" />
                            <p>You can view an event by clicking the div with an Eye Icon. </p>
                            <img src={EventsFrame3} alt="" />
                            <p>You can update an event  by clicking the div with an Edit Icon. </p>
                            <img src={EventsFrame4} alt="" />
                            <p>You can update an event  by clicking the div with an Edit Icon. </p>
                            <img src={EventsFrame5} alt="" />
                        </div>
                        <div id='projects'>
                            <h2>Project</h2>
                            <p>The Projects module is the fifth page of the dashboard. You choose target benficiary in “Choose Target Benfeciary” drop down field to filter projects according to target beneficiary.</p>
                            <img src={Project} alt="" />
                        </div>
                        <div id='messages'>
                            <h2>Messages</h2>
                            <p>The Messages module is the sixth page of the dashboard. You can message the resident and view their information</p>
                            <p>Messages can be seen on your inbox. You can check for all inbox, new messages</p>
                            <img src={MessagesFrame1} alt="" />
                            <p>You can view resident’s information by clicking on the button with an Eye Icon.</p>
                            <img src={MessagesFrame2} alt="" />
                        </div>
                        <div id='activity'>
                            <h2>Activity Logs</h2>
                            <p>The Activity Logs module records all activities in the dashboard. Activities such as creation, deletion, updation, and messages are recorded here. </p>
                            <img src={ActivityFrame1} alt="" />
                        </div>
                        <div id='profile'>
                            <h2>Profile Setting</h2>
                            <p>The Profile setting is located in the right side of the header.
                                Click on the Settings Icon then choose profile setting to open your profile menu.</p>
                            <img src={ProfileFrame1} alt="" />
                        </div>
                        <div id='login'>
                            <h2>Log In</h2>
                            <p>To log in DRIMS, go to DRIMS website and press the ‘LOGIN’ Button. Then input your username and password.</p>
                            <img src={LoginFrame1} alt="" />
                            <p>If the password is forgotten. The Admin can send its email to reset its password</p>
                            <img src={LoginFrame2} alt="" />

                        </div>
                        <div id='logout'>
                            <h2>Log Out</h2>
                            <p>To log out to DRIMS, press the 'Logout' button in the sidebar.</p>
                            <img src={LogoutFrame1} alt="" />
                        </div>
                    </div>
                </div>
                <div className='sections'>
                    <p>SECTIONS</p>
                    <div onClick={() => document.getElementById('overview').scrollIntoView({ behavior: "smooth" })}>Overview</div>
                    <div onClick={() => document.getElementById('organization').scrollIntoView({ behavior: "smooth" })}>Organization</div>
                    <div onClick={() => document.getElementById('residents').scrollIntoView({ behavior: "smooth" })}>Residents</div>
                    <div onClick={() => document.getElementById('announcement').scrollIntoView({ behavior: "smooth" })}>Announcements</div>
                    <div onClick={() => document.getElementById('events').scrollIntoView({ behavior: "smooth" })}>Events</div>
                    <div onClick={() => document.getElementById('projects').scrollIntoView({ behavior: "smooth" })}>Projects</div>
                    <div onClick={() => document.getElementById('messages').scrollIntoView({ behavior: "smooth" })}>Messages</div>
                    <div onClick={() => document.getElementById('activity').scrollIntoView({ behavior: "smooth" })}>Activity Logs</div>
                    <div onClick={() => document.getElementById('profile').scrollIntoView({ behavior: "smooth" })}>Profile Settings</div>
                    <div onClick={() => document.getElementById('login').scrollIntoView({ behavior: "smooth" })}>Log In</div>
                    <div onClick={() => document.getElementById('logout').scrollIntoView({ behavior: "smooth" })}>Log Out</div>
                </div>
            </div>
            {showTopBtn && (
                <div className='backToTop' onClick={() => goToTop()}>
                    <ArrowUpwardIcon sx={{ color: "#0C1096" }} />
                </div>
            )}
        </div>

    )
}

export default Content
