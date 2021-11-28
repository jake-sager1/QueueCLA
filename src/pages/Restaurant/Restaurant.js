import React from 'react'
import Header from './Header';
import Footer from '../../GlobalComponents/Footer';
import BannerSection from './BannerSection';
import MainSection from './MainSection';
import GlobalHeader from '../../GlobalComponents/GlobalHeader';
import { Redirect } from 'react-router';

class Restaurant extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            this.props.isLoggedIn ? (
                this.props.restaurants[this.props.match.params.id] ? (
                    <div style={{
                        backgroundColor: "#3d3d3d",
                        height: "100vh"
                    }}>
                        <GlobalHeader restaurants={this.props.restaurants}
                            isLoggedIn={this.props.isLoggedIn} user={this.props.user} />
                        <BannerSection restaurant={this.props.restaurants[this.props.match.params.id]} />
                        <MainSection restaurant={this.props.restaurants[this.props.match.params.id]} user={this.props.user} />
                        <Footer />
                    </div>
                ) : (
                    <Redirect to="/404"/>
                )
            ) : (
                <Redirect exact to="/"></Redirect>
            )
        );
    }
}

export default Restaurant;

