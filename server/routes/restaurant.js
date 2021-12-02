const { RestaurantTwoTone } = require("@mui/icons-material");
const { responsiveFontSizes } = require("@mui/material");
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

        //check if a user exists
        let userRef = db.collection("users").doc(id);
        let userDoc = await userRef.get();

        if (userDoc.exists) {
            const response = {
                message: `A user exists with same id ${id}, email ${email}`,
                statusCode: 403
            };
            res.status(response.statusCode).send(response);
            return;
        }

        console.log(`Creating restaurant with id ${id}, email ${email}`);
        //TODO:need to change this when restaurant account page is created
        const restaurantData = {
            type: "restaurant",
            email: email,
            name: "Sample Name",
            chips: ["vegetarian", "gluten-free"],
            description: "Sample Desc",
            hours: {
                "Monday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
                "Tuesday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
                "Wednesday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
                "Thursday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
                "Friday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
                "Saturday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
                "Sunday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
            },
            waitEnabled: false,
            avgTimePerCustomer: 3,
            phone: "Sample phone",
            profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            bannerImage: "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20208/5f735e982cfac252edce64a4_Royce+Hall/Royce+Hall_hero.jpg",
            waitlist: [],
            url: "https://ucla.edu",
            menu: "Sample Item 1\n Sample Item 2\n",
            setup: false,
            id: id
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

router.route("/edit").post(async (req, res, next) => {
    const body = req.body;
    const id = body.id;
    //need to check if restaurant already exists
    let restaurantRef = db.collection("restaurants").doc(id);
    let restaurantDoc = await restaurantRef.get();

    if (!restaurantDoc.exists) {
        console.log("No such restaurant");
        const response = {
            message: `Restaurant with ${id} not found`,
            statusCode: 401
        };
        res.status(response.statusCode).send(response);
    }
    else {
        //modify the fields that need to change
        const fieldsToModify = body.data;
        let restaurant = restaurantDoc.data();
        for (let field of Object.keys(fieldsToModify)) {
            restaurant[field] = fieldsToModify[field];
        }
        restaurantRef.set(restaurant, { merge: true })
            .then((data) => {
                const response = {
                    message: `Restaurant with id ${id} edited`,
                    statusCode: 200
                };
                res.status(response.statusCode).send(response);
            }).catch((e) => { console.log(e) });
    }
})

router.route("/get").post(async (req, res, next) => {
    const body = req.body;
    const id = body.id;
    //check if id in restaurant database
    let restaurantRef = db.collection("restaurants").doc(id);
    let restaurantDoc = await restaurantRef.get();

    if (restaurantDoc.exists) {
        const response = {
            data: {
                restaurant: restaurantDoc.data()
            },
            message: `Restaurant with id ${id} found`,
            statusCode: 200
        };
        res.status(response.statusCode).send(response);
    }
    else {
        const response = {
            message: `Restaurant with id ${id} NOT found!`,
            statusCode: 404
        };
        res.status(response.statusCode).send(response);
    }
});

router.route("/delete").post(async (req, res, next) => {
    const body = req.body
    const id = body.id

    let restaurantRef = db.collection("restaurants").doc(id);
    let restaurantDoc = await restaurantRef.get();

    // check if restaurant exists
    if (restaurantDoc.exists) {
        
        // remove this restaurant from every user's favorites
        let userSnapshot = await db.collection("users").get()
        userSnapshot.forEach(async (user) => {
            userID = user.data().id
            await db.collection("users").doc(userID).update({
                "favorites": user.data().favorites.filter(item => item !== id)
            })
        })

        // delete this restaurant
        await db.collection("restaurants").doc(id).delete()
        const response = {
            message: `Restaurant with id ${id} deleted`,
            statusCode: 200
        }
        res.status(response.statusCode).send(response)
    } else {
        const response = {
            message: `Restaurant with id ${id} does not exist`,
            statusCode: 404
        }
        res.status(response.statusCode).send(response)
    }

})

router.route("/all").get(async (req, res, next) => {
    //get all the restaurants in the database
    let restaurantRef = db.collection("restaurants");
    let snapshot = await restaurantRef.get();
    let response = {
        data: null,
        message: "All restaurants in database",
        statusCode: 200
    };
    let restaurantObj = {};
    snapshot.forEach((doc) => {
        let restaurant = doc.data();
        if (restaurant.setup)
            restaurantObj[doc.id] = restaurant;
    });
    response.data = restaurantObj;
    res.status(response.statusCode).send(response);
});


module.exports = router;