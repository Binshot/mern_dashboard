import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Pages from "./Components/Pages/Login"
import Pagess from "./App"

function Login() {
    return (
        <Router>
            <Routes>
                <Route exact path="login" element={<Pages />} />
                <Route exact path="/" element={<Pagess />} />
            </Routes>
        </Router>
    )
}

export default Login
