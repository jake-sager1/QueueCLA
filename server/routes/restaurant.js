const express = require("express");
let router = express.Router();

const firebaseInfo = require("../server");
const db = firebaseInfo.admin.firestore();

router.route("/create").post(async (req, res, next) => {
    const email = req.body.email;
    const id = req.body.id;
    //need to check if restaurant already exists
    let restaurantRef = db.collection("restaurants").doc(id);
    let restaurantDoc = await restaurantRef.get();
    //if restaurant already exists
    if (!restaurantDoc.exists) {
        console.log("No such restaurant");
        console.log(`Creating restaurant with id ${id}, email ${email}`);
        //TODO:need to change this when restaurant account page is created
        const restaurantData = {
            email: email,
        };
        //create the restaurant
        await restaurantRef.set(restaurantData);
        const response = {
            message: `Created restaurant with id ${id}, email ${email}`,
            statusCode: 201
        };
        res.status(response.statusCode).send(response);
    }
    //restaurant was found
    else {
        console.log("Restaurant found");
        const response = {
            message: `Restaurant already exists`,
            statusCode: 200
        };
        res.status(response.statusCode).send(response);
    }
});
module.exports = router;