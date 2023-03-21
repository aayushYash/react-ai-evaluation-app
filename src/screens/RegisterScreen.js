import React, { useEffect, useState } from "react";
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import GoogleButton from "../components/ui/GoogleButton";
import Form from "../components/ui/Form";
import ToggleButton from "../components/ui/ToggleButton";
import InputText from "../components/ui/InputText";
import Button from "../components/ui/Button";
import RadioGroupButton from "../components/ui/RadioGroupButton";

// import { CreateUserWithEmailPassword } from "../firebase/firebaseFunctions";
import { auth, db } from "../firebase/firebase";
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from "react-firebase-hooks/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";

export default function RegisterScreen() {

  // States for different
  const [emailId, setEmailId] = useState("");
  const [fullName, setFullName] = useState("");
  const [password,setPassword] = useState('');
  const [confirmedPassword,setConfirmedPassword] = useState('');
  const [institute,setInstitute] = useState('');
  const [instituteRollNumber,setInstituteRollNumber] = useState('');
  const [branchDepartment,setBranchDepartment] = useState('')
  const [typeOfUser, setTypeOfUser] = useState('Student');
  const [gender,setGender] = useState(null)
  const [validEmail, setValidEmail] = useState(true);
  const [validConfirmPassword, setValidConfirmPassword] = useState(true);
  
  const [user,userloading,usererror] = useAuthState(auth)


  const [updateProfile, updating, updatingError] = useUpdateProfile(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
  const [
    createUserWithEmailAndPassword,
    emailandpasswordUser,
    emailandpasswordLoading,
    emaiandpasswordError,
  ] = useCreateUserWithEmailAndPassword(auth);

  const [userdata, setUserdata] = useState({})

  
  // Registration Firebase Funtion Link
  const RegisterHandler = async () => {

    if(emailId.length === 0 || fullName.trim().length === 0 || password.trim().length === 0 || confirmedPassword.trim().length ===0 || institute.trim().length ===0 || gender === null){
      if(typeOfUser === 'Student' && (branchDepartment.trim().length === 0 || instituteRollNumber.trim().length === 0)) {
        toast.error('Fill All the Field')   
        return 
      }
      toast.error('Fill All the Field')   
        return 
    }    

    if(password !== confirmedPassword){
      return  
    }
    createUserWithEmailAndPassword(emailId, password)
   
    
  }

  function SignUpWithGoogle() {
    signInWithGoogle()
  }


  // Adding User Data in firebase on google signup/signin
  useEffect(()=>{

    async function CheckAndAddDoc() {
      let docRef;
      let docSnap
      if(emailandpasswordUser){
        console.log(emailandpasswordUser)
        docRef = doc(db, "users", emailandpasswordUser?.user.uid);
        docSnap = await getDoc(docRef);
      }

    if(docSnap?.exists()){
      console.log('doc exist')
    }
    else if(typeOfUser === 'Student' && googleUser){
      console.log('doc does not exist')
      console.log('setting into db')
      setDoc(doc(db,'users',googleUser?.user.uid), {profile: {
        name: googleUser?.user.displayName,
        email: googleUser?.user.email,
        institute: '',
        photourl: googleUser?.user.photoURL,
        usertype: typeOfUser,
        branchDepartment : '',
        instituteRollNumber: '',
        session: '',
      }})
    }
    if(typeOfUser === 'Teacher' && googleUser){
      setDoc(doc(db,'users',googleUser?.user.uid), {profile: {
        name: googleUser?.user.displayName,
        email: googleUser?.user.email,
        institute: '',
        usertype: typeOfUser,
        photourl: googleUser?.user.photoURL,
        session: '  '
      }})
    }
  }
  CheckAndAddDoc();
  },[googleUser])


  // Adding User Data in firebase on Email-Password Signup  
  useEffect(()=>{

    async function CheckAndAddDoc() {

    let docRef;
    let docSnap
    if(emailandpasswordUser){
      console.log(emailandpasswordUser)
      docRef = doc(db, "users", emailandpasswordUser?.user.uid);
      docSnap = await getDoc(docRef);
    }

    console.log(docSnap,"docccccccccccccccccccc")
    if(docSnap?.exists()){
      console.log('doc exist')
    }
    else if(typeOfUser === 'Student' && emailandpasswordUser){
      console.log('doc does not exist')
      console.log('setting into db')
      setDoc(doc(db,'users',emailandpasswordUser?.user.uid), {profile: {
        name: fullName,
        email: emailId,
        institute: institute,
        usertype: typeOfUser,
        gender: gender,
        branchDepartment : branchDepartment,
        instituteRollNumber: instituteRollNumber
      }})
    }
    if(typeOfUser === 'Teacher' && emailandpasswordUser){
      console.log('doc does not exist')

      setDoc(doc(db,'users',emailandpasswordUser?.user.uid), {profile: {
        name: fullName,
        email: emailId,
        institute: institute,
        usertype: typeOfUser,
        gender: gender,
      }})
    }
  }
  CheckAndAddDoc();
  },[emailandpasswordUser])
  
  
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
  }, [emailId,confirmedPassword,password])



  // Pop Error For Google or Email-Password Signup
  useEffect(()=>{
    if(googleError){
      toast.error(googleError.code)
    }
    if(emaiandpasswordError){
      toast.error(emaiandpasswordError.code)
    }

  }, [googleError,emaiandpasswordError])


  return (
    // Registeration Page
    <div className="loginPage">
      {/* Header */}
      <Header />

      {/* Registration Body */}
      <div className="loginPageBody">
      <ToastContainer
       autoClose={2000}
       closeOnClick
       theme="colored"
        />

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
            <GoogleButton text="Continue with" onClickHandler={SignUpWithGoogle } />

            {/* Separator */}
            <span>
              <legend>OR</legend>
            </span>

             {/* Text Field Full Name */}
             <InputText
              val={fullName}
              onchange={(e) => setFullName(e.target.value)}
              icon="user"
              type={"text"}
              placeholder='Name'
              valid={true}
            />


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

           {typeOfUser === 'Student' && <InputText
              val={branchDepartment}
              onchange={(e) => setBranchDepartment(e.target.value)}
              icon="school"
              type={"text"}
              placeholder='Branch/Department'
              valid={true}
            />
            }
            { typeOfUser === 'Student' &&
            <InputText
              val={instituteRollNumber}
              onchange={(e) => setInstituteRollNumber(e.target.value)}
              icon="school"
              type={"text"}
              placeholder='Institute Roll Number'
              valid={true}
            />}
            
            {/* Radio buttons for Gender */}
            <RadioGroupButton
              legend="Gender"
              group="gender"
              changeHandler={(e) => setGender(e.target.value)}
              buttonsText={["male", "female"]}
            />

            

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
