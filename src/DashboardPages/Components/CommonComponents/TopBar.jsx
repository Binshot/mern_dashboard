import React from "react";
import { NavLink } from "react-router-dom";
import Settings from "../NewImageFiles/Topbar/Settings.svg"

//format date
import format from 'date-fns/format'

function TopBar() {

    const dateNow = new Date()

    return (
        <div id="topBlur" className="topbar flex-row">
            <div className="gretings" style={{ flexGrow: "1" }}>
                <p>DEL ROSARIO INFORMATION MANAGEMENT SYSTEM</p>
            </div>
            <div className="profile">
                <div className="profileName flex-column" style={{ marginRight: "28px" }}>
                    <h4>Welcome, Admin!</h4>
                    <p>Today it's {format(new Date(dateNow), 'MMM dd, yyyy')} </p>
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