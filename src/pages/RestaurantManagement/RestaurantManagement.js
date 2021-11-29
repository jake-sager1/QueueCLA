import React from 'react';
import Header from './RestaurantHeader';
import MainSection from './MainSection';
import Footer from '../../GlobalComponents/Footer';
import { Redirect } from 'react-router';

function RestaurantManagement(props) {

    return (
        <div class="page">
            <Header restaurant={props.restaurant} isLoggedIn={props.isLoggedIn} />
            <MainSection />
            <Footer />
        </div>
    );
}

export default RestaurantManagement;