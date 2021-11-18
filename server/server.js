const express = require('express');
const app = express();
const port = process.env.PORT || 5000; //use port 5000

const admin = require('firebase-admin');
const serviceAccount = require('../queuecla-firebase-adminsdk-dcsra-ae14b81ebf.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const usersDb = db.collection("users");

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', (req, res) => {
  res.send({ express: 'Hello, World' });
});

app.get('/test_firestore', (req, res) => {
  usersDb.doc("user1").set({
    "username": "aviiahuja",
    "email": "blah@gmail.com"
  });
  res.send({ "message": "created user" });

})