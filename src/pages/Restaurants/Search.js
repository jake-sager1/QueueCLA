import React from 'react'
import Header from './Header';
import Footer from '../../GlobalComponents/Footer';
import GlobalHeader from '../../GlobalComponents/GlobalHeader';
import MainSearchSection from './MainSearchSection';
import { Redirect } from 'react-router';


class SearchPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.isLoggedIn) {
            return <Redirect exact to="/"></Redirect>;
        }
        if(!this.props.isSetup) {
            return <Redirect exact to="/user/create"/>
        }
        if(this.props.match.params.query === null) {
            return <Redirect exact to="/restaurants"></Redirect>
        }
        return (
            <div style={{
                backgroundColor: "#3d3d3d",
                height: "100vh"
            }}>

                <GlobalHeader restaurants={this.props.restaurants}
                    isLoggedIn={this.props.isLoggedIn} user={this.props.user}
                />
                <MainSearchSection restaurants={this.props.restaurants} query={this.props.match.params.query} />
                <Footer />
            </div>
        );
    }
}

export default SearchPage;
