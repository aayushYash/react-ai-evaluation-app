import React from "react";
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";

export default function LoginScreen() {
  return (
    <div className="loginPage">
      <Header />
      <div className="loginPageBody h-screen">
        <div className="leftBody">
          <img src="" alt="" />
        </div>
        <div>
          <div className="socialMediaAuth">
            <span>
              <img alt="" />
            </span>
            <span>
              <img alt="" />
            </span>
          </div>
          {/* <form onSubmit={submitHandler}>

                </form> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
