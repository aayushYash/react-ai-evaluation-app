import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  setDoc
} from 'firebase/firestore';

import { auth,db } from "./firebase";

async function CreateUserWithEmailPassword(email, password, data) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      return setDoc(doc(db, 'users', userCredential.user.uid), data)

    })
    .catch((e) => {
      console.log(e)
    });
}

async function SignInWithEmailPassword(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
    })
    .catch((e) => alert('wowoww'));
}

export { CreateUserWithEmailPassword, SignInWithEmailPassword };
