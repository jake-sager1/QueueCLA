const express = require('express');
const app = express();
const port = process.env.PORT || 5000; //use port 5000
const cors = require('cors');


const admin = require('firebase-admin');
const serviceAccount = require('./queuecla-firebase-adminsdk-dcsra-ae14b81ebf.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const usersDb = db.collection("users");

app.listen(port, () => console.log(`Listening on port ${port}`));
const allowedOrigins = ["http://localhost:3000", "http://localhost:8080"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  })
);

app.use(express.json());

app.get('/express_backend', (req, res) => {
  res.send({ express: 'Hello, World' });
});

app.post('/create_user', async (req, res) => {
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
    };
    //create the user
    const res = await userRef.set(userData);
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