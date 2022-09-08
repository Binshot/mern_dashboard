import React from 'react'
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import Sidebar from "../CommonComponents/SideBar";
import Topbar from "../CommonComponents/TopBar";

function MainPage() {
    let pathname = useLocation().pathname
    return (
        <div style={{position: "absolute", height:"100%", width:"100%"}}>
            <div className='sideBar'>
                <Sidebar />
            </div>
            <div className='container'>
                <Topbar />
                <div className='contents'>
                {pathname === "/" && <Navigate to={"/overview"} replace={true}/>}
                <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MainPage
