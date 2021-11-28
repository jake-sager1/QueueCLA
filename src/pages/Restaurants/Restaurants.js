import React from 'react'
import Header from './Header';
import Footer from '../../GlobalComponents/Footer';
import GlobalHeader from '../../GlobalComponents/GlobalHeader';
import MainSection from './MainSection';
import { Redirect } from 'react-router';


class Restaurants extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
        }
    }

    render() {
        if (!this.props.isLoggedIn) {
            return <Redirect exact to="/"></Redirect>;
        }
        return (
            <div style={{
                backgroundColor: "#3d3d3d",
                height: "100vh"
            }}>

                <GlobalHeader restaurants={this.props.restaurants}
                    isLoggedIn={this.props.isLoggedIn} user={this.props.user}
                />
                <MainSection restaurants={this.props.restaurants} searchValue={this.state.searchValue} />
                <Footer />
            </div>
        );
    }
}

export default Restaurants;
