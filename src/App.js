import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import CardPage from './pages/Card';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Signup from './pages/Signup/Signup'
import Restaurants from './pages/Restaurants/Restaurants'
import NotFound from './pages/ErrorPages/NotFound'
import Restaurant from './pages/Restaurant/Restaurant';
import LineManagement from './pages/RestaurantManagement/LineManagement/LineManagement';
import RestaurantManagement from './pages/RestaurantManagement/RestaurantManagement';
import RestaurantSettings from './pages/RestaurantManagement/RestaurantSettings/RestaurantSettings';
import { Redirect } from 'react-router';

class App extends React.Component {

  users = {
    "901329021": {
      name: "Jakub Hojsan",
      email: "jakubhojsan@g.ucla.edu",
      year: "2024",
      inLine: false,
      resturantID: 1,
    },
    "205488283": {
      name: "Jake Sager",
      email: "jakesager@g.ucla.edu",
      year: "2024",
      inLine: true,
      resturantID: 1,
    } 
  }

  restaurants = {
    1: {
        name: "Bruin Plate",
        chips: ["Vegetarian", "Gluten-Free"],
        description: "A fun new restaurant for the fittest of Bruins!",
        hours: {
          "Monday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
          "Tuesday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
          "Wednesday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
          "Thursday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
          "Friday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
          "Saturday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
          "Sunday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        },
        waitEnabled: true,
        avgTimePerCustomer: 3,
        phone: "(760) 123-4567",
        profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        bannerImage: "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20208/5f735e982cfac252edce64a4_Royce+Hall/Royce+Hall_hero.jpg",
        id: 1,
        waitlist: ["901329021", "205488283"],
        email: "bplate@dining.ucla.edu",
    },
    2: {
      name: "De Neve",
      chips: ["Gross", "Yucky"],
      description: "A restaurant that prides itself on being mediocre.",
      hours: {
        "Monday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Tuesday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Wednesday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Thursday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Friday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Saturday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Sunday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
      },
      waitEnabled: false,
      avgTimePerCustomer: 3,
      phone: "(760) 123-4123",
      profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      bannerImage: "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20208/5f735e982cfac252edce64a4_Royce+Hall/Royce+Hall_hero.jpg",
      id: 2,
      waitlist: [],
      email: "deneve@dining.ucla.edu",
    },
    3: {
      name: "Rendezvous West",
      chips: ["Mexican", "Create-Your-Own"],
      description: "We have really good burritos. We don't give enough guac.",
      hours: {
        "Monday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Tuesday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Wednesday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Thursday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Friday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Saturday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Sunday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
      },
      waitEnabled: true,
      avgTimePerCustomer: 3,
      phone: "(760) 123-4567",
      profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      bannerImage: "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20208/5f735e982cfac252edce64a4_Royce+Hall/Royce+Hall_hero.jpg",
      id: 3,
      waitlist: ["901329021", "205488283"],
      email: "rendewest@dining.ucla.edu",
    },
    4: {
      name: "Bruin Plate",
      chips: ["Vegetarian", "Gluten-Free"],
      description: "A fun new restaurant for the fittest of Bruins!",
      hours: {
        "Monday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Tuesday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Wednesday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Thursday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Friday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Saturday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Sunday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
      },
      waitEnabled: true,
      avgTimePerCustomer: 3,
      phone: "(760) 123-4567",
      profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      bannerImage: "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20208/5f735e982cfac252edce64a4_Royce+Hall/Royce+Hall_hero.jpg",
      id: 4,
      waitlist: ["901329021", "205488283"],
      email: "bplateagain@dining.ucla.edu",
    },
    5: {
      name: "Bruin Plate",
      chips: ["Vegetarian", "Gluten-Free"],
      description: "A fun new restaurant for the fittest of Bruins!",
      hours: {
        "Monday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Tuesday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Wednesday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Thursday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Friday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Saturday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Sunday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
      },
      waitEnabled: true,
      avgTimePerCustomer: 3,
      phone: "(760) 123-4567",
      profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      bannerImage: "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20208/5f735e982cfac252edce64a4_Royce+Hall/Royce+Hall_hero.jpg",
      id: 5,
      waitlist: ["901329021", "205488283"],
      email: "morebplate@dining.ucla.edu",
    },
    6: {
    name: "Bruin Plate",
    chips: ["Vegetarian", "Gluten-Free"],
    description: "A fun new restaurant for the fittest of Bruins!",
    hours: {
        "Monday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Tuesday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Wednesday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Thursday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Friday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Saturday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
        "Sunday": {open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm",},
    },
    waitEnabled: true,
    avgTimePerCustomer: 3,
    phone: "(760) 123-4567",
    profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    bannerImage: "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20208/5f735e982cfac252edce64a4_Royce+Hall/Royce+Hall_hero.jpg",
    id: 6,
    waitlist: ["901329021", "205488283"],
    email: "againbplate@dining.ucla.edu",
    },
}   

  render() {
    return (
      <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route exact path="/"><Home user={this.users["901329021"]}/></Route>
              <Route path="/card"><CardPage /></Route>
              <Route path="/login"><App /></Route>
              <Route path="/signup"><Signup /></Route>
              <Route path="/restaurants/:id" render={(props) => <Restaurant {...props} restaurants={this.restaurants}/>}></Route>
              <Route path="/restaurants"><Restaurants restaurants={this.restaurants}/></Route>
              <Route path="/manage/line"><LineManagement users={this.users} restaurant={this.restaurants[1]}/></Route>
              <Route path="/manage/settings"><RestaurantSettings restaurant={this.restaurants[1]}/></Route>
              <Route path="/manage"><RestaurantManagement restaurant={this.restaurants[1]}/></Route>
              <Route path="/404" component={NotFound}></Route>
              <Redirect to="/404"/>
            </Switch>
          </Router>
        </ThemeProvider>
    );
  }
}

export default App;
