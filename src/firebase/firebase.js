// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBIIqcPi5I02kPuLs5Y8SUzkCLjD9CzZw",
  authDomain: "ai-evaluation-74936.firebaseapp.com",
  projectId: "ai-evaluation-74936",
  storageBucket: "ai-evaluation-74936.appspot.com",
  messagingSenderId: "560483961339",
  appId: "1:560483961339:web:455990b2540ae70deea35e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export {auth, db};