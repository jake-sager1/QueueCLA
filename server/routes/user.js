const { CountertopsOutlined } = require("@mui/icons-material");
const express = require("express");
let router = express.Router();

const firebaseInfo = require("../server");
const db = firebaseInfo.admin.firestore();

router.route("/create").post(async (req, res, next) => {
    const email = req.body.email;
    const id = req.body.id;
    //need to check if user already exists
    let userRef = db.collection("users").doc(id);
    let userDoc = await userRef.get();
    //if user already exists
    if (!userDoc.exists) {
        console.log("No such user");
        //check if a restaurant exists
        let restaurantRef = db.collection("restaurants").doc(id);
        let restaurantDoc = await restaurantRef.get();

        if (restaurantDoc.exists) {
            const response = {
                message: `A restaurant exists with same id ${id}, email ${email}`,
                statusCode: 403
            };
            res.status(response.statusCode).send(response);
            return;
        }
        console.log(`Creating user with id ${id}, email ${email}`);
        //TODO:need to change this when user account page is created
        const userData = {
            email: email,
            inLine: false,
            name: req.body.name,
            favorites: [],
            type: "student",
            setup: false,
            uid: "",
            restaurantID: {},
            id: id,
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

    //console.log(req.body);

    if (!userDoc.exists) {
        console.log("No such user");
        const response = {
            message: `User with id ${id} not found`,
            statusCode: 404
        };
        res.status(response.statusCode).send(response);
    } else {
        // if there exists a user with the same uid, don't merge:
        const fieldsToModify = body.data;
        if (Object.keys(fieldsToModify).includes("uid")) {
            let found_user_with_uid = false
            const user_with_same_uid = await db.collection("users").where("uid", "==", body.data.uid).get()
            if (!user_with_same_uid.empty) {
                console.log("Printing user with same uid: ", user_with_same_uid)
                found_user_with_uid = true
                console.log("Found a user with same uid.")
                const response = {
                    message: `User with uid ${body.data.uid} found.`,
                    statusCode: 409
                };
                res.status(response.statusCode).send(response);
                return;
            }
        }
        let user = userDoc.data();
        console.log(userDoc);
        console.log("Fields to modify: ", fieldsToModify)
        for (let field of Object.keys(fieldsToModify)) {
            user[field] = fieldsToModify[field];
        }
        console.log("user: ", user)
        userRef.set(user, { merge: true })
            .then((data) => {
                const response = {
                    message: `User with id ${id} edited`,
                    statusCode: 200
                };
                res.status(response.statusCode).send(response);
            })
            .catch((e) => { console.log(e) });
    }
});

router.route("/get").post(async (req, res, next) => {
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

router.route('/delete').post(async(req, res, next) => {
    console.log('entered /delete request')
    const body = req.body
    const id = body.id
    //check if id in user database
    let userRef = db.collection("users").doc(id);
    let userDoc = await userRef.get();
    // check if user exists
    if (userDoc.exists) {
        // remove user if they're in any waitlist
        restaurantID = userDoc.data().restaurantID.id

        // find restaurant with id restaurantID and remove user with 'id' from that restaurant's waitlist
        let restaurantRef = await db.collection("restaurants").doc(restaurantID)
        let restaurantDoc = await restaurantRef.get()

        await db.collection("restaurants").doc(restaurantID).update({
            "waitlist": restaurantDoc.data().waitlist.filter(item => item.id !== id)
        })

        await db.collection("users").doc(id).delete()
        const response = {
            message: `User with id ${id} deleted`,
            statusCode: 200
        }
        res.status(response.statusCode).send(response)
    } else {
        const response = {
            message: `User with id ${id} not found`,
            statusCode: 404
        }
        res.status(response.statusCode).send(response)
    }
})

module.exports = router;