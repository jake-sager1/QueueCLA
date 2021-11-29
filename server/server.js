const express = require('express');
const app = express();
const port = process.env.PORT || 5001; //use port 5000
const cors = require('cors');

const admin = require('firebase-admin');
const serviceAccount = require('./queuecla-firebase-adminsdk-dcsra-ae14b81ebf.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = { admin: admin };

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

const userRoutes = require('./routes/user');
const restaurantRoutes = require('./routes/restaurant');
app.use("/user", userRoutes);
app.use("/restaurant", restaurantRoutes);


app.get('/', (req, res) => {
  res.send({ message: 'Hello, World' });
});

