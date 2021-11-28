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
    const uid = req.body.uid;
    //need to check if user already exists
    let userRef = db.collection("users").doc(uid);
    let userDoc = await userRef.get();
    //if user already exists
    if (!userDoc.exists) {
        console.log("No such user");
        console.log(`Creating user with uid ${uid}, email ${email}`);
        const userData = {
            email: email,
            inLine: false
        };
        //create the user
        await userRef.set(userData);
        const response = {
            message: `Created user with uid ${uid}, email ${email}`,
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

module.exports = router;