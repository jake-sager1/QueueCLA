import React from "react";
import Header from "../../../GlobalComponents/GlobalHeader.js";
import UserDisplay from './UserDisplay';
import Footer from "../../../GlobalComponents/Footer";
import useStyles from "../user-styles";
import { Redirect } from "react-router";

function UserSettings(props) {
    const classes = useStyles();
    if (!props.isLoggedIn) {
        return <Redirect to="/" />;
    }
    return (
        <div className={classes.page}>
            <Header isLoggedIn={props.isLoggedIn} user={props.user} restaurants={props.restaurants} />
            <UserDisplay user={props.user} restaurants={props.restaurants} changeUserData={props.changeUserData} />
            <Footer />
        </div>
    );
}

export default UserSettings;
