const express = require("express");
let router = express.Router();

const admin = require('firebase-admin');
const serviceAccount = require('../queuecla-firebase-adminsdk-dcsra-ae14b81ebf.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = router;