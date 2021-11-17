import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import CardPage from './pages/Card';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Signup from './pages/Signup/Signup'
import Student from './pages/Student/Student'
import NotFound from './pages/ErrorPages/NotFound'
import Restaurant from './pages/Restaurant/Restaurant';

class App extends React.Component {

  user = {
    name: "Jakub Hojsan",
    email: "jakubhojsan@g.ucla.edu",
    year: "2024",
    inLine: false,
    resturantID: 1,
    UUID: "901329021",
  }

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
      waitlist: {

      }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route exact path="/"><Home /></Route>
              <Route path="/card"><CardPage /></Route>
              <Route path="/login"><App /></Route>
              <Route path="/signup"><Signup /></Route>
              <Route path="/student"><Student /></Route>
              <Route path="/restaurants/:id" render={(props) => <Restaurant {...props}/>}></Route>
              <Route component={NotFound}></Route>
            </Switch>
          </Router>
        </ThemeProvider>
    );
  }
}

export default App;
