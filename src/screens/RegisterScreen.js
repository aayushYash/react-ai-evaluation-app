import React, { useState } from "react";
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import GoogleButton from "../components/ui/GoogleButton";
import Form from "../components/ui/Form";
import ToggleButton from "../components/ui/ToggleButton";
import InputText from "../components/ui/InputText";
import Button from "../components/ui/Button";
import DatePicker from "../components/ui/DatePicker";

export default function RegisterScreen() {
  const [emailId, setEmailId] = useState("");
  const [date, setDate] = useState(new Date());

  const ForgotHandler = () => {
    console.log("click forgot handler");
  };

  const OnChangeHandler = (e) => {
    setEmailId(e.target.value);
  };

  const radioChangeHandler = (e) => {
    console.log(e.target.value);
  };

  const ToggleHandler = (e) => {
    console.log(e.target.value);
  };

  const datePicker = (e) => {
    setDate(e.target.value);
    console.log(date);
  };
  console.log(emailId);
  return (
    <div>
      <Header />
      <div className="loginPageBody">
        <div className="leftBody">
          <img className=" w-full h-[400px]" src="/images/b4.gif" alt="" />
        </div>
        <div className="rightBody">
          <Form>
            <ToggleButton group="typeofuser" changeHandler={ToggleHandler} />
            <span style={{ fontWeight: 700, margin: "10px 0" }}>LOGIN</span>
            <GoogleButton text="Continue with" />
            <span>
              <legend>OR</legend>
            </span>
            <InputText
              val={emailId}
              onchange={OnChangeHandler}
              icon="envelope"
              type={"text"}
            />
            <InputText
              val={emailId}
              onchange={OnChangeHandler}
              icon="lock"
              type={"password"}
            />

            <DatePicker value={date} onChange={datePicker} />
            <p
              onClick={ForgotHandler}
              style={{ color: "#1947FF", cursor: "pointer", width: "200px" }}
            >
              Forgot Password ?
            </p>
            <Button text="Login" icon="caret-right" />
          </Form>
        </div>
      </div>
      <Footer position="absolute" />
    </div>
  );
}
