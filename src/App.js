import React, { useEffect,useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
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
import { auth } from "./firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import StudentDashboard from "./screens/StudentDashboard";

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

  const [verifiedEmail,setVerifiedEmail] = useState(auth.currentUser?.emailVerified)

  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();
  useEffect(() => {
    if(user && !user.emailVerified){
      navigate('verifyEmail')
    }
    else{
      navigate('StudentDashboard')
    }
    if(!user){
      navigate('/')
    }

    
  }, [user])



  return (
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="login" element={<LoginScreen />} />
        <Route path="register" element={<RegisterScreen />} />
        <Route path="verifyEmail" element={<VerifyUser />} />
        <Route path='StudentDashboard' element={<StudentDashboard />}/>
      </Routes>
  );
}
