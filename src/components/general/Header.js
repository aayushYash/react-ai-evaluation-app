import React from "react";
import Button from "../ui/Button";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

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
      <div className="buttons">
        <Button text="Login" type="dark" onclick={LoginButtonHandler} />
        <Button text="Signup" type="light" onclick={SignupButtonHandler} />
      </div>
    </div>
  );
}
