import React from 'react';
import Header from './RestaurantHeader';
import MainSection from './MainSection';
import Footer from '../../GlobalComponents/Footer';
import { Redirect } from 'react-router';
import useStyles from './restaurant-styles';

function RestaurantManagement(props) {

    const classes = useStyles();

    let isLoggedIn = props.isLoggedIn;

    return (
        !isLoggedIn ? (
            <div className={classes.page}>
                <Header restaurant={props.restaurant} loggingInToggle={props.loggingInToggle}
                />
                <MainSection />
                <Footer />
            </div>
        ) :
            (
                <Redirect to="/manage/line" />
            )
    );
}

export default RestaurantManagement;
