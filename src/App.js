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
import { faAdd, faBackward, faCheck, faFilter, faForward, faRepeat, fas, faSort, faTimesCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
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
import TeacherDashboard from "./screens/Teacher/TeacherDashboard";
import TestAttemptPage from "./screens/Student/TestAttemptPage";
import NewTestAdd from "./screens/Teacher/NewTestAdd";
import EvaluateTest from "./screens/Teacher/EvaluateTest";
import TestSubmitted from "./screens/Student/TestSubmitted";
import CheckResult from "./screens/Student/CheckResult";
import Group from "./screens/Teacher/Group";
import EditTest from "./screens/Teacher/EditTest";

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
  faExclamation,
  faAdd,
  faBackward,
  faForward,
  faTimesCircle,
  faCheck,
  faTrash,
  faSort,
  faFilter,
  faRepeat
);

export default function App() {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState();
  const selectedUserType = useRecoilValue(userState);
  const navigate = useNavigate();


  useEffect(() => {
    async function readData() {
      if (user && !userData) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        setUserData(docSnap.data());
      }
    }

    readData();
  }, [user]);

  useEffect(() => {
    if (user && !user.emailVerified) {
      navigate(`${user.uid}/${user.usertype}/verifyEmail`);
    }
    if (user && userData?.profile.institute.length === 0) {
      console.log(userData?.profile.institute);
      navigate(`${user.uid}/${user.usertype}/Profile`);
    }
    if (
      user &&
      user.emailVerified &&
      userData?.profile.institute.length !== 0 && userData?.profile.usertype === 'Student' && !loading
    ) {
      navigate(`${user.uid}/Student/Dashboard`);
    }
    if (
      user &&
      user.emailVerified &&
      userData?.profile.institute.length !== 0 && userData?.profile.usertype === 'Teacher' && !loading
    ) {
      navigate(`${user.uid}/Teacher/Dashboard`);
    }
    if (user && userData && selectedUserType !== userData?.profile.usertype) {
      console.log(selectedUserType, "app line 88");
      console.log(userData?.profile.usertype, "app line 89");
      console.log("heheheheheh");
      // signOut(auth);
      // navigate("login");
    }
    if (!user) {
      setUserData(null);
      navigate("/");
    }
  }, [userData, user]);

  if(loading){
    return <p>LOADING....................</p>
  }

  

  // console.log()

  return (
    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route path="login" element={<LoginScreen />} />
      <Route path="register" element={<RegisterScreen />} />
      <Route path=":userid" >
        <Route path=":usertype">
          <Route path="group" element={<Group />} />
          <Route path="Dashboard" element={userData?.profile.usertype === 'Student' ? <StudentDashboard />:<TeacherDashboard />} />
          <Route path="verifyEmail" element={<VerifyUser />} />
          <Route path="Profile" element={<ManageProfile />} />
          <Route path="AddTest" element={<NewTestAdd />} />
          <Route path="test">
            <Route path=":testid" element={<TestAttemptPage />}  />
          </Route>
          <Route path="ResponseSubmitted">
            <Route path=":testid" element={<TestSubmitted />}  />
          </Route>
          <Route path="evaluatetest">
            <Route path=":testid" element={<EvaluateTest />}  />
          </Route>
          <Route path="editTest">
            <Route path=":testid" element={<EditTest />} />
          </Route>
          <Route path="checkresult">
            <Route path=":testid" element={<CheckResult />}  />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
