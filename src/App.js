import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import { useAuthContext } from './DashboardPages/hooks/useAuthContext'

import Login from "./DashboardPages/Components/Pages/Login"
import Forgot from "./DashboardPages/Components/Pages/ForgotPassword"
import MainPage from "./DashboardPages/Components/Pages/MainPage"
import Settings from "./DashboardPages/Components/Pages/ProfileSettings"
import Overview from "./DashboardPages/Components/Pages/Overview";
import Organization from "./DashboardPages/Components/Pages/Organization";
import Residents from "./DashboardPages/Components/Pages/Residents";
import Announcement from "./DashboardPages/Components/Pages/Announcement";
import Events from "./DashboardPages/Components/Pages/Events";
import Project from "./DashboardPages/Components/Pages/Projects"
import Messages from "./DashboardPages/Components/Pages/Messages"
import Help from "./DashboardPages/Components/Pages/Help";
import ActivityLogs from "./DashboardPages/Components/Pages/ActivityLogs"
import ResetPassword from './DashboardPages/Components/Pages/ResetPassword';

//information pages
import InformationMainPage from './InformationPage/pages/MainPage';
import HomePage from './InformationPage/pages/HomePage';
import AboutPage from './InformationPage/pages/AboutPage';
import ContactPage from './InformationPage/pages/ContactPage';
import NotFound from './InformationPage/pages/NotFound';
import ScrollToTop from './InformationPage/components/scrollToTop';
import CircularProgress from '@mui/material/CircularProgress';

export default function App() {

  const { user, dispatch } = useAuthContext()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({ type: 'LOGIN', payload: user })
    }
    setIsLoading(false)
  }, [])

  return (
    isLoading
      ? <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress size={100} sx={{color: "#0C1096"}} />
      </div>
      : <Router>
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<InformationMainPage />}>
            <Route exact path="home" element={<HomePage />} />
            <Route exact path="about" element={<AboutPage />} />
            <Route exact path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route exact path="reset-password/:id/:token" element={<ResetPassword />} />
          <Route exact path="login" element={!user ? <Login /> : <Navigate to="/admin" />} />
          <Route exact path="forgot_password" element={!user ? <Forgot /> : <Navigate to="/admin" />} />
          <Route path="/admin" element={<MainPage />}>
            <Route exact path="overview" element={user ? <Overview /> : <Navigate to="/login" />} />
            <Route exact path="settings" element={user ? <Settings /> : <Navigate to="/login" />} />
            <Route exact path="organization" element={user ? <Organization /> : <Navigate to="/login" />} />
            <Route exact path="residents" element={user ? <Residents /> : <Navigate to="/login" />} />
            <Route exact path="announcement" element={user ? <Announcement /> : <Navigate to="/login" />} />
            <Route exact path="events" element={user ? <Events /> : <Navigate to="/login" />} />
            <Route exact path="project" element={user ? <Project /> : <Navigate to="/login" />} />
            <Route exact path="messages" element={user ? <Messages /> : <Navigate to="/login" />} />
            <Route exact path="help" element={user ? <Help /> : <Navigate to="/login" />} />
            <Route exact path="activity_logs" element={user ? <ActivityLogs /> : <Navigate to="/login" />} />
          </Route>
        </Routes>
      </Router>
  );
}