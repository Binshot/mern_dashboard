import React from "react";
import { NavLink } from "react-router-dom";

import ProfilePic from "../NewImageFiles/Topbar/Avatar.svg";
import Settings from "../NewImageFiles/Topbar/Settings.svg"

function TopBar() {
    return (
        <div id='topBlur' className="topbar flex-row">
            <div className="gretings" style={{ flexGrow: "1" }}>
                <p>DEL ROSARIO INFORMATION MANAGEMENT SYSTEM</p>
            </div>
            <div className="profile">
                <div className="profilePic">
                    <img src={ProfilePic} alt="" className="center" />
                    <div className="profileName flex-column">
                        <h4>Welcome, Dave!</h4>
                        <p>Employee</p>
                    </div>
                </div>
                <NavLink to="/admin/settings">
                    <div className="settings">
                        <img src={Settings} alt="" className="center" />
                    </div>
                </NavLink>
            </div>
        </div>
    );
}
export default TopBar;