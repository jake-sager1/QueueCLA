import React from 'react'
import Header from './Header';
import Footer from '../../GlobalComponents/Footer';
import MainSection from './MainSection';

class Restaurants extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
        }
    }

    updateSearch(value) {
        this.setState({searchValue: value});
    }

    render() {

        return (
            <div style={{backgroundColor: "#3d3d3d",
            height: "100vh"}}>
                <Header restaurants={this.props.restaurants} updateSearch={(value) => this.updateSearch(value)} />
                <MainSection restaurants={this.props.restaurants} searchValue={this.state.searchValue}/>
                <Footer />
            </div>
        );
    }
}

export default Restaurants;
