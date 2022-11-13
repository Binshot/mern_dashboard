import React from 'react'
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import Sidebar from "../CommonComponents/SideBar";
import Topbar from "../CommonComponents/TopBar";
import '../../adminWeb.css';
import { MessageContextProvider } from '../../context/messageContext'
function MainPage() {
    let pathname = useLocation().pathname
    return (
        <div style={{ position: "absolute", height: "100%", width: "100vw" }}>
            <MessageContextProvider>
                <div className='sideBar'>
                    <Sidebar />
                </div>

                <div className='container'>
                    <Topbar />
                    <div className='contents' id='contents'>
                        {(pathname === "/admin/") || (pathname === "/admin") && <Navigate to={"/admin/overview"} replace={true} />}
                        <Outlet />
                    </div>
                </div>
            </MessageContextProvider>
        </div>
    )
}

export default MainPage
