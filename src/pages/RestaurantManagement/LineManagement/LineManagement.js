import React from 'react';
import Header from '../RestaurantHeader';
import Footer from '../../../GlobalComponents/Footer';
import LineStatus from './LineStatus';
import useStyles from '../restaurant-styles';

function LineManagement(props) {

    const classes = useStyles();

    return (
        <div className={classes.page}>
            <Header restaurant={props.restaurant} page="line" isLoggedIn={props.isLoggedIn} />
            <LineStatus restaurant={props.restaurant} users={props.users} changeUserData={props.changeUserData} changeRestaurantData={props.changeRestaurantData} />
            <Footer />
        </div>
    );
}

export default LineManagement;