import { initializeApp } from "firebase/app";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAoUIuI8-MB_Ok6Xt6M9fu8jq_vjUVe43k",
  authDomain: "queuecla.firebaseapp.com",
  projectId: "queuecla",
  storageBucket: "queuecla.appspot.com",
  messagingSenderId: "908409587624",
  appId: "1:908409587624:web:b9908b74b6840cdb637f9d",
  measurementId: "G-BX8EFJK2V7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();

export const signInWithGoogle = () => signInWithRedirect(auth, provider);

// const admin = require('firebase-admin');
// const db = admin.firestore();
// export const usersDb = db.collection("users");