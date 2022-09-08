import React from 'react'

import overviewFrame1 from "../NewImageFiles/Help/Overview/img1.svg"
import overviewFrame2 from "../NewImageFiles/Help/Overview/img2.svg"
import overviewFrame3 from "../NewImageFiles/Help/Overview/img3.svg"

import OrganizationFrame1 from "../NewImageFiles/Help/Organization/img1.svg"
import OrganizationFrame2 from "../NewImageFiles/Help/Organization/img2.svg"
import OrganizationFrame3 from "../NewImageFiles/Help/Organization/img3.svg"

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
import EventsFrame6 from "../NewImageFiles/Help/Events/img6.svg"

import Project from "../NewImageFiles/Help/Project/Projects.svg"

import MessagesFrame1 from "../NewImageFiles/Help/Messages/img1.svg"
import MessagesFrame2 from "../NewImageFiles/Help/Messages/img2.svg"

import ActivityFrame1 from "../NewImageFiles/Help/Activity/img1.svg"

import ProfileFrame1 from "../NewImageFiles/Help/Profile/img1.svg"


function Content() {
    return (
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
            <div>
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
            <div>
                <h2>Organization</h2>
                <p>The Organization module is the second page of the dashboard. The Organization allows you to view, add, update,
                    or delete an Official.</p>
                <img src={OrganizationFrame1} alt="" />
                <p>You can view an Official’s information by clicking on the View Button in their cards.</p>
                <img src={OrganizationFrame2} alt="" />
                <p>You can add and update an Official’s information. You can select a resident and select their position.</p>
                <img src={OrganizationFrame3} alt="" />
                <p>If you are going to delete an Official, a warning message is displayed. All official’s information are archived and can be restored.</p>
            </div>
            <div>
                <h2>Resdients</h2>
                <p>The Residents module is the third page of the dashboard. You can view, add, update, or delete a Resident.</p>
                <img src={ResidentsFrame1} alt="" />
                <p>You can add a Resident by clicking the button “Add Resident.” Information to be filled such as Personal, Background, and Family information.</p>
                <img src={ResidentsFrame2} alt="" />
                <p>You can view a Resident by clicking the button with an Eye Icon. </p>
                <img src={ResidentsFrame3} alt="" />
                <p>You can update the Resident’s information by clicking the button with an Edit Icon. </p>
                <img src={ResidentsFrame4} alt="" />
                <p>You can update the Resident’s information by clicking the button with an Edit Icon. </p>
                <img src={ResidentsFrame5} alt="" />
            </div>
            <div>
                <h2>Announcement</h2>
                <p>The Announcements module is the fourth page of the dashboard. You can view, add, update, or delete a announcement.</p>
                <img src={AnnouncementFrame1} alt="" />
                <p>You can add an announcement by clicking the button “Add Announcement.” You can write the title, description, and schedule the post of the announcement</p>
                <img src={AnnouncementFrame2} alt="" />
                <p>You can view an announcement by clicking the button with an Eye Icon. </p>
                <img src={AnnouncementFrame3} alt="" />
                <p>You can update the announcement’s detail by clicking the button with an Edit Icon. </p>
                <img src={AnnouncementFrame4} alt="" />
                <p>You can update the announcement’s detail by clicking the button with an Edit Icon. </p>
                <img src={AnnouncementFrame5} alt="" />
            </div>
            <div>
                <h2>Events</h2>
                <p>The Events module is the fourth page of the dashboard. You can view, add, update, or delete an Event.</p>
                <img src={EventsFrame1} alt="" />
                <p>You can add an Event by clicking the button “Add Event.” There are two types of Event, that is Event and Article</p>
                <p>When you press “Add Event” the Event tab is the first tab to appear. You can write the title, choose tag, write the location, and event detail, and upload an event banner . Events are posted in the mobile app, DRIMS.</p>
                <img src={EventsFrame2} alt="" />
                <p>Next the Article tab is posted in the website. The purpose of the article is to document what happened to event. By writing the title, tag, and location in the event tab, you write the detail of the article in the article tab, and upload pictures of the event. You are only allowed to upload one picture </p>
                <img src={EventsFrame3} alt="" />
                <p>You can view an event by clicking the button with an Eye Icon. </p>
                <img src={EventsFrame4} alt="" />
                <p>You can update an event  by clicking the button with an Edit Icon. </p>
                <img src={EventsFrame5} alt="" />
                <p>You can update an event  by clicking the button with an Edit Icon. </p>
                <img src={EventsFrame6} alt="" />
            </div>
            <div>
                <h2>Project</h2>
                <p>The Projects module is the fifth page of the dashboard. You choose target benficiary in “Choose Target Benfeciary” drop down field to filter projects according to target beneficiary.</p>
                <img src={Project} alt="" />
            </div>
            <div>
                <h2>Messages</h2>
                <p>The Messages module is the sixth page of the dashboard. You can message the resident and delete their inbox.</p>
                <p>Messages can be seen on your inbox. You can check for all inbox, new messages, and deleted </p>
                <img src={MessagesFrame1} alt="" />
                <p>You can view resident’s information by clicking on button with an Eye Icon.</p>
                <img src={MessagesFrame2} alt="" />
            </div>
            <div>
                <h2>Activity Logs</h2>
                <p>The Activity Logs module records all activities in the dashboard. Activities such as creation, deletion, updation, and messages are recorded here. </p>
                <img src={ActivityFrame1} alt="" />
            </div>
            <div>
                <h2>Profile Setting</h2>
                <p>The Profile setting is located in the header next to your avatar. Click on the Settings Icon then choose profile setting to open your profile menu.</p>
                <img src={ProfileFrame1} alt="" />
                <p>The settings  for your profile include the following items</p>
                <p>Account : Edit your Account Information, Change your Email or Password.</p>
                <p>Notifications : Update your email notification settings</p>
            </div>
            <div>
                <h2>Log Out</h2>
            </div>
        </div>
    )
}

export default Content
