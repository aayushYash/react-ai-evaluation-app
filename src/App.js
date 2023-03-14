import React, { useEffect,useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import LandingScreen from "./screens/LandingScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {fas} from '@fortawesome/free-solid-svg-icons'
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
import StudentDashboard from "./screens/StudentDashboard";
import ManageProfile from "./screens/ManageProfile";
import { doc, getDoc } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { userState } from "./Atom/atom";
import { signOut } from "firebase/auth";

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

  const [verifiedEmail,setVerifiedEmail] = useState(auth.currentUser?.emailVerified)

  const [user, loading, error] = useAuthState(auth);
  const [userData,setUserData] = useState();
  const selectedUserType = useRecoilValue(userState)
  const navigate = useNavigate();

  console.log('apppppppppppppppppppp',selectedUserType)

  useEffect(() => {

    async function readData(){

      if(user && !userData){
        console.log(user.uid)
        const docSnap = await getDoc(doc(db,'users',user.uid));
        console.log(docSnap.data())
        setUserData(docSnap.data())
      }
    }

    console.log(userData?.profile, 'profile')

    console.log(userData,'useeeeeeeeerrrdata')

    readData()
    if(user && !user.emailVerified){
      navigate('verifyEmail')
    }
    if(user && userData?.profile.institute.length === 0){
      console.log(userData?.profile.institute)
      console.log('profileeeeeee')
      navigate('Profile')
    }
    if(user && user.emailVerified && userData?.profile.institute.length !== 0){
      navigate('StudentDashboard')
    }
    if(user && selectedUserType !== userData?.profile.usertype){
      signOut(auth)
      navigate('login')
    }
    if(!user){
      navigate('/')
    }

    
  }, [user,userData])



  return (
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="login" element={<LoginScreen />} />
        <Route path="register" element={<RegisterScreen />} />
        <Route path="verifyEmail" element={<VerifyUser />} />
        <Route path='StudentDashboard' element={<StudentDashboard />}/>
        <Route path='Profile' element={<ManageProfile />}/>

      </Routes>
  );
}
