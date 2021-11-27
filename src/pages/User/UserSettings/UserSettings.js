import React from "react";
import Header from "../../../GlobalComponents/GlobalHeader.js";
import UserDisplay from './UserDisplay';
import Footer from "../../../GlobalComponents/Footer";
import useStyles from "../user-styles";

function UserSettings(props) {

    const classes = useStyles();

    return (
        <div className={classes.page}>
            <Header isLoggedIn={props.isLoggedIn} user={props.user} restaurants={props.restaurants}/>
            <UserDisplay user={props.user}/>
            <Footer/>
        </div>
    );
}

export default UserSettings;
