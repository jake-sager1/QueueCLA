import React from 'react';
import Header from './RestaurantHeader';
import MainSection from './MainSection';
import Footer from '../../GlobalComponents/Footer';
import { Redirect } from 'react-router';

function RestaurantManagement(props) {

    let isLoggedIn = props.isLoggedIn;

    return (
        !isLoggedIn ? (
            <div class="page">
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