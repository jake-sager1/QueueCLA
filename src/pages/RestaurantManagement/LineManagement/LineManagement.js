import React from 'react';
import Header from '../RestaurantHeader';
import Footer from '../../../GlobalComponents/Footer';
import LineStatus from './LineStatus';
import useStyles from '../restaurant-styles';

function LineManagement(props) {

    const classes = useStyles();

    return (
        <div className={classes.page}>
            <Header/>
            <LineStatus restaurant={props.restaurant} users={props.users}/>
            <Footer/>
        </div> 
    );
}

export default LineManagement;