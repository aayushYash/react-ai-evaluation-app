import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import LandingScreen from "./screens/LandingScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
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
  faPen,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import VerifyUser from "./screens/VerifyUser";
import { auth, db } from "./firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import StudentDashboard from "./screens/Student/StudentDashboard";
import ManageProfile from "./screens/ManageProfile";
import { doc, getDoc } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { userState } from "./Atom/atom";
import { signOut } from "firebase/auth";
import TeacherDashboard from "./screens/Teacher/TeacherDashboard";
import TestAttemptPage from "./screens/Student/TestAttemptPage";
import NewTestAdd from "./screens/Teacher/NewTestAdd";

library.add(
  fas,
  fab,
  faLock,
  faSchool,
  faUser,
  faUserGroup,
  faEnvelope,
  faCaretRight,
  faEye,
  faEyeSlash,
  faCalendar,
  faPen,
  faExclamation
);

export default function App() {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState();
  const selectedUserType = useRecoilValue(userState);
  const navigate = useNavigate();

  console.log("apppppppppppppppppppp", selectedUserType);

  useEffect(() => {
    async function readData() {
      if (user && !userData) {
        console.log(user.uid);
        const docSnap = await getDoc(doc(db, "users", user.uid));
        console.log(docSnap.data(), "app line 65");
        setUserData(docSnap.data());
      }
    }

    console.log(userData?.profile, "profile line 70");

    console.log(userData, "useeeeeeeeerrrdata");
    console.log(user, "app line 73 user");

    readData();
  }, [user]);

  useEffect(() => {
    if (user && !user.emailVerified) {
      navigate("verifyEmail");
    }
    if (user && userData?.profile.institute.length === 0) {
      console.log(userData?.profile.institute);
      console.log("profileeeeeee");
      navigate("Profile");
    }
    if (
      user &&
      user.emailVerified &&
      userData?.profile.institute.length !== 0
    ) {
      navigate("StudentDashboard");
    }
    if (user && userData && selectedUserType !== userData?.profile.usertype) {
      console.log(selectedUserType, "app line 88");
      console.log(userData?.profile.usertype, "app line 89");
      console.log("heheheheheh");
      signOut(auth);
      navigate("login");
    }
    if (!user) {
      setUserData(null);
      navigate("/");
    }
  }, [userData, user]);

  return (
    <Routes>
      {/* <Route path="/" element={<LandingScreen />} /> */}
      {/* <Route path="/" element={<TestAttemptPage />} /> */}
      <Route path="/" element={<NewTestAdd />} />

      <Route path="login" element={<LoginScreen />} />
      <Route path="register" element={<RegisterScreen />} />
      <Route path="verifyEmail" element={<VerifyUser />} />
      <Route path="StudentDashboard" element={<StudentDashboard />} />
      <Route path="Profile" element={<ManageProfile />} />
      <Route path="TeacherDashboard" element={<TeacherDashboard />} />
    </Routes>
  );
}
