import React from 'react'
import Header from './Header';
import Footer from '../../GlobalComponents/Footer';
import BannerSection from './BannerSection';
import MainSection from './MainSection';

class Restaurant extends React.Component {

    restaurant = {
        name: "Bruin Plate",
        chips: ["Vegetarian", "Gluten-Free"],
        description: "A fun new restaurant for the fittest of Bruins!",
        hours: {
            "Monday": "9:00am - 6:00pm",
            "Tuesday": "9:00am - 6:00pm",
            "Wednesday": "9:00am - 6:00pm",
            "Thursday": "5:00am - 8:00pm",
            "Friday": "9:00am - 6:00pm",
            "Saturday": "6:00am - 9:00pm",
            "Sunday": "9:00am - 6:00pm",
        },
        waitEnabled: false,
        avgTimePerCustomer: 3,
        phone: "(760) 123-4567",
        profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        bannerImage: "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20208/5f735e982cfac252edce64a4_Royce+Hall/Royce+Hall_hero.jpg",
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

