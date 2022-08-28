import { Outlet, NavLink, useParams } from "react-router-dom";

function ResidentsInformation() {
    const { id } = useParams();
    return (
        <div className="content">
            <p className="breadcrumb">RESIDENTS / VIEW RESIDENT'S PROFILE</p>
            <div className="flex-item border-bottom">
                <h2>MANAGE RESIDENT'S LIST</h2>
                <div className="selectPeriod">
                    <p>Total residents: 20</p>
                </div>
            </div>
            <div>
                <ul className="resident">
                    <li><NavLink to={`/residents/resident_information/personal_information/${id}`}>Personal Information</NavLink></li>
                    <li><NavLink to={`/residents/resident_information/background_information/${id}`}>Background Information</NavLink></li>
                    <li><NavLink to={`/residents/resident_information/family_information/${id}`}>Family Information</NavLink></li>
                </ul>
            </div>
            <Outlet />
        </div>
    )
}

export default ResidentsInformation
