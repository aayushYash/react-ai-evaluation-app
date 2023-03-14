import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  updateProfile
} from "firebase/auth";


import {
  doc,
  setDoc
} from 'firebase/firestore';

import { auth,db } from "./firebase";



async function CreateUserWithEmailPassword(email, password, data) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential, "HELLO");
        console.log('hehe')
      
        console.log(data.name)
        updateProfile(auth, {displayName: data.name})
        setDoc(doc(db, 'users', userCredential.user.uid), data) 
      

    })
    .catch((e) => {
      console.log(e)
    });
}

async function SignInWithEmailPassword(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential)
    })
    .catch((e) => console.log(e));
}

async function SendVerificationMail(){
  sendEmailVerification(auth.currentUser).then(() => {
    console.log('email sent...')
  })
}


export { CreateUserWithEmailPassword, SignInWithEmailPassword, SendVerificationMail };
