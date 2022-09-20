import React from 'react'
import { Outlet, useLocation, Navigate } from "react-router-dom";
import "../informationWeb.css"
import NavBar from '../components/NavBar';
import Footer from '../components/footer';
function MainPage() {
    let pathname = useLocation().pathname
    return (
        <div>
            <NavBar />
            {pathname === "/" && <Navigate to={"/home"} replace={true} />}
            <Outlet />
            <Footer />
        </div>
    )
}

export default MainPage