import React from 'react'
import Header from './Header';
import Footer from '../../GlobalComponents/Footer';
import MainSection from './MainSection';

class Student extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
        }
    }

    updateSearch(value) {
        console.log(value);
        this.setState({searchValue: value});
    }

    cards = [
        {id: 1,
            heading: "Bruin Cafe",
            text: "Soups, salads, and sandwiches!",
            image: "https://source.unsplash.com/random",
            chip1: "Vegan",
            chip2: "Good sandwiches"
            },
        {id: 2,
            heading: "Bruin Bowl",
            text: "A takeout place to grab a variety of bowls!",
            image: "https://source.unsplash.com/random",
            chip1: "Healthy",
            chip2: "Mediterranean"
            },
        {id: 3,
            heading: "Bruin Plate",
            text: "Organics...",
            image: "https://source.unsplash.com/random",
            chip1: "Vegetarian",
            chip2: "Vegan"
         },
        {id: 4,
            heading: "De Neve",
            text: "Unhealthy as hell.",
            image: "https://source.unsplash.com/random",
            chip1: "Unhealthy",
            chip2: "Tastes good"
        },
        {id: 5,
            heading: "De Neve",
            text: "Unhealthy as hell.",
            image: "https://source.unsplash.com/random",
            chip1: "Unhealthy",
            chip2: "Tastes good"
        },
        {id: 6,
            heading: "Epicuria",
            text: "Mediterranean food!",
            image: "https://source.unsplash.com/random",
            chip1: "Vegan",
            chip2: "Mediterranean"
        }
    ]

    render() {

        return (
            <div style={{backgroundColor: "#3d3d3d",
            height: "100vh"}}>
                <Header cards={this.cards} updateSearch={(value) => this.updateSearch(value)} />
                <MainSection cards={this.cards} searchValue={this.state.searchValue}/>
                <Footer />
            </div>
        );
    }
}

export default Student;
