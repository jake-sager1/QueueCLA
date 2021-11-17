import React from 'react';
import Header from './RestaurantHeader';
import MainSection from './MainSection';
import Footer from '../../GlobalComponents/Footer';

function RestaurantManagement(props) {
    return (
        <div class="page">
             <Header/>
             <MainSection/>
             <Footer/>
        </div> 
    );
}

export default RestaurantManagement;