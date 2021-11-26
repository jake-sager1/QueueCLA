import { initializeApp, applicationDefault, cert } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult, signInWithPopup } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

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
const db = getFirestore();
export const provider = new GoogleAuthProvider();
export const auth = getAuth();


export const signInWithGoogle = async () => {
  signInWithPopup(auth, provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

    //now send this user to backend
    let body = {
      email: user.email,
      uid: user.uid
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    fetch('http://localhost:5000/create_user', requestOptions)
      .then(response => response.json())
      .then(data => { console.log(data) });
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
};