import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "./firebase";

async function CreateUserWithEmailPassword(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
    })
    .catch((e) => {
        console.log('helow world')
      alert('wowowow');
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
