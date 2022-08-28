import './newStyle.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<DefaultPage/>} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="forgot_password" element={<Forgot />} />
        <Route exact path="admin" element={<MainPage />}>
          <Route exact path="overview" element={<Overview />} />
          <Route exact path="settings" element={<Settings />} />
          <Route exact path="organization" element={<Organization />} />
          <Route exact path="residents" element={<Residents />} />
          <Route exact path="announcement" element={<Announcement />} />
          <Route exact path="events" element={<Events />} />
          <Route exact path="project" element={<Project />} />
          <Route exact path="messages" element={<Messages />} />
          <Route exact path="help" element={<Help />} />
          <Route exact path="activity_logs" element={<ActivityLogs />} />
        </Route>
      </Routes>
    </Router>
  );
}