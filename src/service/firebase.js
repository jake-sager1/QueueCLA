//import { initializeApp, applicationDefault, cert} from "firebase-admin/app";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
//import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult } from "firebase/auth";
//import { getFirestore } from 'firebase-admin/firestore';
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyAoUIuI8-MB_Ok6Xt6M9fu8jq_vjUVe43k",
  authDomain: "queuecla.firebaseapp.com",
  projectId: "queuecla",
  storageBucket: "queuecla.appspot.com",
  messagingSenderId: "908409587624",
  appId: "1:908409587624:web:b9908b74b6840cdb637f9d",
  measurementId: "G-BX8EFJK2V7"
};

//create database stuff
const express = require('express');
const app = express();
const port = process.env.PORT || 5000; //use port 5000
const admin = require('firebase-admin');
const serviceAccount = require('./queuecla-firebase-adminsdk-dcsra-ae14b81ebf.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', (req, res) => {
  res.send({ express: 'Hello, World' });
});

app.post('/create-user')

// export const usersDb = db.collection("users");

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const provider = new GoogleAuthProvider();
// export const auth = getAuth();

// export const signInWithGoogle = () => (signInWithRedirect(auth, provider));
