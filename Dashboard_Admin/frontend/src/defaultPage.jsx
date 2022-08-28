import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function DefaultPage() {
    return (
     <Navigate to={"/login"} replace={true}/>   
    )
}

export default DefaultPage
