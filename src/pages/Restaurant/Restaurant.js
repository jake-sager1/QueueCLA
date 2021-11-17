import React from 'react'
import Header from './Header';
import Footer from '../../GlobalComponents/Footer';
import BannerSection from './BannerSection';
import MainSection from './MainSection';

class Restaurant extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
    
        return (
            <div style={{backgroundColor: "#3d3d3d",
            height: "100vh"}}>
                <Header />
                <BannerSection restaurant={this.props.restaurants[this.props.match.params.id]}/>
                <MainSection restaurant={this.props.restaurants[this.props.match.params.id]}/>
                <Footer />
            </div>
        );
    }
}

export default Restaurant;

