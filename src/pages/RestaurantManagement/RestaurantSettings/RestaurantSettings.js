import React from "react";
import Header from "../RestaurantHeader";
import SettingsDisplay from './SettingsDisplay';
import Footer from "../../../GlobalComponents/Footer";
import useStyles from "../restaurant-styles";

function RestaurantSettings(props) {

    const classes = useStyles();

    return (
        <div className={classes.page}>
            <Header restaurant={props.restaurant} isLoggedIn={props.isLoggedIn} />
            <SettingsDisplay restaurant={props.restaurant} users={props.users} changeUserData={props.changeUserData} />
            <Footer />
        </div>
    );
}

export default RestaurantSettings;