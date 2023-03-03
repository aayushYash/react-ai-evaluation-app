import React from "react";
import Button from "../components/ui/Button";
import { useSendEmailVerification } from 'react-firebase-hooks/auth';
import {auth} from '../firebase/firebase'
import Header from "../components/general/Header";

function VerifyUser() {

  const [sendEmailVerification, sending, error] = useSendEmailVerification(
    auth
  );

  return (
    <div className="w-full flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex justify-center items-center h-[100%]">
      <div className=" w-[300px] flex justify-center space-y-4 items-center flex-col md:w-[500px] h-[400px] md:h-[300px] bg-gray-200 border shadow-lg ">
        <img className=" w-[100px]" src="/images/c.gif" alt="" />
        <h1 className=" text-3xl font-bold ">Verify Your Email </h1>
        <p className=" px-10 text-center font-light ">
          Please Verify Your Email Before Proceeding!
        </p>
        <Button text={'Send Verification Email'} onclick={async () => {
          const success = await sendEmailVerification();
          if (success) {
            alert('Email Sent. Check Your Email to Proceed');
          }
        }} />
      </div>
      </div>
    </div>
  );
}

export default VerifyUser;
