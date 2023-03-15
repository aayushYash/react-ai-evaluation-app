import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";

import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import Button from "../components/ui/Button";
import Form from "../components/ui/Form";
import GoogleButton from "../components/ui/GoogleButton";
import InputText from "../components/ui/InputText";
import ToggleButton from "../components/ui/ToggleButton";
import "./LoginScreen.css";
import { SignInWithEmailPassword } from "../firebase/firebaseFunctions";
import { auth } from "../firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginScreen() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const [popupVisible, setPopupVisible] = useState(false);
  const [id, setId] = useState();
  const [success, setSuccess] = useState();

  const onEmailChange = (e) => {
    setEmailId(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const ToggleHandler = (e) => {
    console.log(e.target.value);
  };

  // firebase functionality below 👇.

  const LoginHandler = () => {
    // implement firebase login with password
    SignInWithEmailPassword(emailId, password);
  };

  useEffect(() => {
    async function GetUserData() {
      if (signInWithEmailAndPasswordUser) {
        const docSnap = await getDoc(
          doc(db, "users", signInWithEmailAndPasswordUser?.user.uid)
        );
        if (docSnap.data()?.profile.usertype !== userType) {
          toast.error("Not Authorised User!");
          console.log("hhh");
        }
      }
      if (signInWithGoogleUser) {
        const docSnap = await getDoc(
          doc(db, "users", signInWithGoogleUser?.user.uid)
        );
        if (docSnap.data()?.profile.usertype !== userType) {
          toast.error("Not Authorised User!");
          console.log("hhh");
          // navigate(-1)
        }
      }
    }
    GetUserData();
  }, [signInWithEmailAndPasswordUser, signInWithGoogleUser]);

  const LoginWithGoogle = () => {
    console.log("Login with google");
  };

  const ForgotHandler = (email) => {
    setSuccess(async () => await sendPasswordResetEmail(email));
    setPopupVisible(false);
  };

  useEffect(() => {
    if (emailId.length > 0 && !emailId.includes("@")) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
    if (sending) {
      setId(() => toast.loading("Sending Mail, Wait"));
    } else if (error) {
      toast.update(id, {
        render: error?.code,
        type: "error",
        isLoading: false,
        autoClose: true,
      });
    } else if (success) {
      toast.update(id, {
        render: "Mail Sent Successfully",
        type: "success",
        isLoading: false,
        autoClose: true,
      });
    }
  }, [emailId, sending, error, success]);

  return (
    <div className="loginPage">
      <ToastContainer autoClose={2000} closeOnClick theme="colored" />
      {popupVisible && (
        <ResetPasswordPopup
          sendResetMailHandler={ForgotHandler}
          closePopup={() => setPopupVisible(false)}
        />
      )}
      <Header />
      <div className="loginPageBody">
        <div className="leftBody">
          <Player
            autoplay
            loop
            src="https://assets4.lottiefiles.com/packages/lf20_jcikwtux.json"
            style={{ height: "300px", width: "300px" }}
          ></Player>
        </div>
        <div className="rightBody">
          <Form>
            <ToggleButton group="typeofuser" changeHandler={ToggleHandler} />
            <GoogleButton
              text="Continue with"
              onClickHandler={LoginWithGoogle}
            />
            <span>
              <legend>OR</legend>
            </span>
            <InputText
              val={emailId}
              onchange={onEmailChange}
              icon="envelope"
              type={"text"}
              placeholder="Email"
              valid={validEmail}
              invalidMsg="Enter Valid Email"
            />

            <InputText
              val={password}
              onchange={onPasswordChange}
              icon="lock"
              type={"password"}
              placeholder="Password"
              valid={true}
            />

            <p
              onClick={() => setPopupVisible(true)}
              style={{ color: "#1947FF", cursor: "pointer", width: "300px" }}
            >
              Forgot Password ?
            </p>
            <Button text="Login" icon="caret-right" onclick={LoginHandler} />
          </Form>
        </div>
      </div>
      <Footer position="relative" />
    </div>
  );
}

const ResetPasswordPopup = ({ sendResetMailHandler, closePopup }) => {
  const [email, setEmail] = useState("");

  return (
    <div className="PopupBackGround">
      <div className="Closepopup" onClick={closePopup} />
      <div className="Popup" onClick={null}>
        <div style={{ marginBottom: "10px" }}>
          <h1 className="ResetTitle">Reset Password</h1>
          <InputText
            onchange={(e) => setEmail(e.target.value)}
            val={email}
            type={"email"}
            icon="envelope"
            placeholder="Enter Your Email"
            valid={true}
          />
        </div>
        <Button
          text={"Send Reset Email"}
          onclick={() => sendResetMailHandler(email)}
        />
      </div>
    </div>
  );
};
