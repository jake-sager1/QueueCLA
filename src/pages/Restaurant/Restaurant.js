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
                this.props.isSetup ? (
                    this.props.restaurants[this.props.match.params.id] ? (
                        <div style={{
                            backgroundColor: "#3d3d3d",
                            height: "100vh"
                        }}>
                            <GlobalHeader restaurants={this.props.restaurants}
                                isLoggedIn={this.props.isLoggedIn} user={this.props.user} />
                            <BannerSection restaurant={this.props.restaurants[this.props.match.params.id]} />
                            <MainSection restaurant={this.props.restaurants[this.props.match.params.id]} id={this.props.match.params.id}
                                restaurants={this.props.restaurants} user={this.props.user}
                                changeUserData={this.props.changeUserData}
                                changeRestaurantData={this.props.changeRestaurantData}
                                index={this.props.match.params.id}
                            />
                            <Footer />
                        </div>
                    ) : (
                        <Redirect to="/404" />
                    )
                ) : (
                    <Redirect exact to="/user/create"/>
                )
            ) : (
                <Redirect exact to="/"></Redirect>
            )
        );
    }
}

export default Restaurant;

