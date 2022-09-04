import './newStyle.css';
import { BrowserRouter as Router, Route, Routes, Navigate  } from "react-router-dom";

import { useAuthContext } from './hooks/useAuthContext'

import Login from "./Components/Pages/Login"
import Forgot from "./Components/Pages/ForgotPassword"
import MainPage from "./Components/Pages/MainPage"
import Settings from "./Components/Pages/ProfileSettings"
import Overview from "./Components/Pages/Overview";
import Organization from "./Components/Pages/Organization";
import Residents from "./Components/Pages/Residents";
import Announcement from "./Components/Pages/Announcement";
import Events from "./Components/Pages/Events";
import Project from "./Components/Pages/Projects"
import Messages from "./Components/Pages/Messages"
import Help from "./Components/Pages/Help";
import ActivityLogs from "./Components/Pages/ActivityLogs"

import DefaultPage from './defaultPage';

export default function App() {
  const flag = false
  
  const { user } = useAuthContext()

  return (
    <Router>
      <Routes>
        {/* <Route exact path='/' element={<DefaultPage/>} /> */}
        <Route exact path="login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route exact path="forgot_password" element={!user ? <Forgot /> : <Navigate to="/" />} />
        <Route exact path="/" element={ user ? <MainPage /> : <Navigate to="login" /> }>
          <Route exact path="overview" element={user ? <Overview /> : <Navigate to="/login" />} />
          <Route exact path="settings" element={user ? <Settings /> : <Navigate to="/login" />} />
          <Route exact path="organization" element={user ? <Organization /> : <Navigate to="/login" />} />
          <Route exact path="residents" element={user ?<Residents /> : <Navigate to="/login" />} />
          <Route exact path="announcement" element={user ?<Announcement /> : <Navigate to="/login" />} />
          <Route exact path="events" element={user ?<Events /> : <Navigate to="/login" />} />
          <Route exact path="project" element={user ?<Project /> : <Navigate to="/login" />} />
          <Route exact path="messages" element={user ?<Messages /> : <Navigate to="/login" />} />
          <Route exact path="help" element={user ?<Help /> : <Navigate to="/login" />} />
          <Route exact path="activity_logs" element={user ?<ActivityLogs /> : <Navigate to="/login" />} />
        </Route>
      </Routes>
    </Router>
  );
}