const { connectFirestoreEmulator } = require("@firebase/firestore");
const express = require("express");
let router = express.Router();

const admin = require('firebase-admin');
const serviceAccount = require('../queuecla-firebase-adminsdk-dcsra-ae14b81ebf.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const usersDb = db.collection("users");

router.route("/create").post(async (req, res, next) => {
    const email = req.body.email;
    const id = req.body.id;
    //need to check if user already exists
    let userRef = db.collection("users").doc(id);
    let userDoc = await userRef.get();
    //if user already exists
    if (!userDoc.exists) {
        console.log("No such user");
        console.log(`Creating user with id ${id}, email ${email}`);
        const userData = {
            email: email,
            inLine: false
        };
        //create the user
        await userRef.set(userData);
        const response = {
            message: `Created user with id ${id}, email ${email}`,
            statusCode: 201
        };
        res.status(response.statusCode).send(response);
    }
    //user was found
    else {
        console.log("User found");
        const response = {
            message: `User already exists`,
            statusCode: 200
        };
        res.status(response.statusCode).send(response);
    }
});


router.route("/edit").post(async (req, res, next) => {
    const body = req.body;
    const id = body.id;
    //check if id in user database
    let userRef = db.collection("users").doc(id);
    let userDoc = await userRef.get();

    if (!userDoc.exists) {
        console.log("No such user");
        const response = {
            message: `User with id ${id} not found`,
            statusCode: 404
        };
        res.status(response.statusCode).send(response);
    }
    else {
        //modify the fields that need to change
        const fieldsToModify = body.data;
        let user = userDoc.data();
        console.log(userDoc);
        for (let field of Object.keys(fieldsToModify)) {
            user[field] = fieldsToModify[field];
        }
        await userRef.set(user, { merge: true }).catch((e) => { console.log(e) });

        const response = {
            message: `User with id ${id} edited`,
            statusCode: 200
        };
        res.status(response.statusCode).send(response);
    }
});

router.route("/get").post(async (req, res, next) => {
    console.log("hey");
    const body = req.body;
    const id = body.id;
    //check if id in user database
    let userRef = db.collection("users").doc(id);
    let userDoc = await userRef.get();

    if (userDoc.exists) {
        const response = {
            data: {
                user: userDoc.data()
            },
            message: `User with id ${id} found`,
            statusCode: 200
        };
        res.status(response.statusCode).send(response);
    }
    else {
        const response = {
            message: `User with id ${id} NOT found!`,
            statusCode: 404
        };
        res.status(response.statusCode).send(response);
    }
});

module.exports = router;