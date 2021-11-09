import React from 'react'
import Header from './Header';
import Footer from '../../GlobalComponents/Footer';
import BannerSection from './BannerSection';
import MainSection from './MainSection';

class Restaurant extends React.Component {

    restaurant = {
        name: "Bruin Plate",
        tags: ["Vegetarian", "Gluten-Free"],
        description: "A fun new restaurant for the fittest of Bruins!",
        id: 1,
    }
    
    render() {
    
        return (
            <div style={{backgroundColor: "#3d3d3d",
            height: "100vh"}}>
                <Header />
                <BannerSection restaurant={this.restaurant}/>
                <MainSection restaurant={this.restaurant}/>
                <Footer />
            </div>
        );
    }
}

export default Restaurant;

