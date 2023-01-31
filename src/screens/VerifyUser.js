import React from "react";
import Button from "../components/ui/Button";

function VerifyUser() {
  return (
    <div className="w-full flex justify-center items-center h-screen bg-gray-100">
      <div className=" w-[300px] flex justify-center space-y-4 items-center flex-col md:w-[500px] h-[400px] md:h-[300px] bg-gray-200 border shadow-lg">
        <img className=" w-[100px]" src="/images/c.gif" alt="" />
        <h1 className=" text-3xl font-bold ">Verify With Email </h1>
        <p className=" px-10 text-center font-light ">
          Checking for the Credential Data and a Verification email is send in
          your Mail Box Please verify
        </p>
      </div>
    </div>
  );
}

export default VerifyUser;
