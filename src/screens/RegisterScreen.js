import React, { useEffect, useState } from "react";
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import GoogleButton from "../components/ui/GoogleButton";
import Form from "../components/ui/Form";
import ToggleButton from "../components/ui/ToggleButton";
import InputText from "../components/ui/InputText";
import Button from "../components/ui/Button";
import RadioGroupButton from "../components/ui/RadioGroupButton";

import { CreateUserWithEmailPassword } from "../firebase/firebaseFunctions";

export default function RegisterScreen() {

  // States for different
  const [emailId, setEmailId] = useState("");
  const [password,setPassword] = useState('');
  const [confirmedPassword,setConfirmedPassword] = useState('');
  const [institute,setInstitute] = useState('');
  const [typeOfUser, setTypeOfUser] = useState('Student');
  const [gender,setGender] = useState(null)
  const [validEmail, setValidEmail] = useState(true);
  const [validConfirmPassword, setValidConfirmPassword] = useState(true);

  // Registration Firebase Funtion Link
  const RegisterHandler = () => {

    const userDate = {
      email: emailId,
      password: password,
      institute: institute,
      usertype: typeOfUser,
      gender: gender 
    }

    if(password !== confirmedPassword){
      console.log('Enter correct password');
      return
    }

    CreateUserWithEmailPassword(emailId,password,userDate);
  }
  
  // Forgot Firebase Function Link
  const ForgotHandler = () => {
    console.log('Forgot Password')
  }

  // UseEffect for validation of fields
  useEffect(() => {
    if(emailId.length > 0 && !(emailId.includes('@'))){
      setValidEmail(false)
    }
    else{
      setValidEmail(true)
    }
    if((confirmedPassword.length === password.length || confirmedPassword.length > password.length )&& confirmedPassword !== password){
      setValidConfirmPassword(false)
    }
    else{
      setValidConfirmPassword(true)
    }
  }, [emailId,confirmedPassword])

  
  
  
  return (
    // Registeration Page
    <div className="loginPage">
      {/* Header */}
      <Header />

      {/* Registration Body */}
      <div className="loginPageBody">

        {/* Registration Left Body */}
        <div className="leftBody">
          {/* Image in left side */}
          <img className=" w-full h-[400px]" src="/images/b4.gif" alt="" />
        </div>

        {/* Registration Right Body */}
        <div className="rightBody">

          {/* Form */}
          <Form>
            {/* Toggle Button For type of user */}
            <ToggleButton group="typeofuser" changeHandler={(e) => setTypeOfUser(e.target.value)} />
            {/* Signup With Google */}
            <GoogleButton text="Continue with" />

            {/* Separator */}
            <span>
              <legend>OR</legend>
            </span>

            {/* Text Field Email */}
            <InputText
              val={emailId}
              onchange={(e) => setEmailId(e.target.value)}
              icon="envelope"
              type={"text"}
              placeholder='Email'
              valid={validEmail}
              invalidMsg='Enter a Valid Email.'
            />

            {/* Text Field Password */}
            <InputText
              val={password}
              onchange={(e) => setPassword(e.target.value)}
              icon="lock"
              type={"password"}
              placeholder='Password'
              valid={true}
            />
            
            {/* Text Field Confirm Password */}
            <InputText
              val={confirmedPassword}
              onchange={(e) => setConfirmedPassword(e.target.value)}
              icon="lock"
              type={"password"}
              placeholder='Confirm Password'
              valid={validConfirmPassword}
              invalidMsg='Password Does Not Match.'
            />

            {/* Text Field Institute */}
            <InputText
              val={institute}
              onchange={(e) => setInstitute(e.target.value)}
              icon="school"
              type={"text"}
              placeholder='Institute'
              valid={true}
            />
            
            {/* Radio buttons for Gender */}
            <RadioGroupButton
              legend="Gender"
              group="gender"
              changeHandler={(e) => setGender(e.target.value)}
              buttonsText={["male", "female"]}
            />
            {/* <DatePicker value={date} onChange={datePicker} /> */}

            {/* Forgot Password */}
            <p
              onClick={ForgotHandler}
              style={{ color: "#1947FF", cursor: "pointer", width: "200px" }}
            >
              Forgot Password ?
            </p>

            {/* Registration Button */}
            <Button text="Register" icon="caret-right" onclick={RegisterHandler} />
          </Form>
        </div>
      </div>

      {/* Footer */}
      <Footer position="relative" /> 
    </div>
  );
}
