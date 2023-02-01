import React, { useState } from "react";
import Button from "../ui/Button";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth' ;
import Avatar from "./Avatar";
import { signOut } from "firebase/auth";

export default function Header() {
  const navigate = useNavigate();

  const [user,loading,error] = useAuthState(auth);
  const [userProfileVisible, setUserProfileVisible] = useState(false);

  const UserProfileHander = () => {
    console.log(userProfileVisible)
    if(userProfileVisible === true){
      setUserProfileVisible(false)
    }
    else{
      setUserProfileVisible(true)
    }
  }

  const signout = () =>{
    setUserProfileVisible(false);
    signOut(auth)
  }

  const LoginButtonHandler = () => {
    navigate("/login");
  };

  const SignupButtonHandler = () => {
    navigate("/register");
  };
  return (
    <div className="header">
      <div className={"l"}>
        <h1 className=" font-bold text-2xl font-mono p-2 text-white">
          Weffe AI
        </h1>
        {/* <img src='.' />  */}
      </div>
      {!user ? 
      <div className="buttons">
        <Button text="Login" type="dark" onclick={LoginButtonHandler} />
        <Button text="Signup" type="light" onclick={SignupButtonHandler} />
      </div>:
      <Avatar loading={loading} user={user} onclick={UserProfileHander} />}
      {userProfileVisible && <UserProfile onclick={signout} />}
    </div>
  );
}

const UserProfile = ({onclick}) => {
  return <div className="UserProfile">
    <Button text='Sign Out' onclick={onclick} />
  </div>
}
