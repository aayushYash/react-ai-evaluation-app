import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingScreen from "./screens/LandingScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faUser,
  faLock,
  faSchool,
  faUserGroup,
  faEnvelope,
  faCaretRight,
  faEye,
  faEyeSlash,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import VerifyUser from "./screens/VerifyUser";

library.add(
  fab,
  faLock,
  faSchool,
  faUser,
  faUserGroup,
  faEnvelope,
  faCaretRight,
  faEye,
  faEyeSlash,
  faCalendar
);

export default function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<LandingScreen />} />
        <Route path="login" element={<LoginScreen />} />
        <Route path="register" element={<RegisterScreen />} /> */}
        <Route path="/" element={<VerifyUser />} />

        {/* <Route path='StudentDashboard' element={<StudentDashboard />}/> */}
      </Routes>
    </Router>
  );
}
