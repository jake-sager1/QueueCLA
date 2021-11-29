import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import CardPage from './pages/Card';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Signup from './pages/Signup/Signup'
import UserSignup from './pages/Signup/UserSignup'
import About from './pages/AboutUs/AboutUs'
import RestaurantSignup from './pages/Signup/RestaurantSignup'
import Restaurants from './pages/Restaurants/Restaurants'
import NotFound from './pages/ErrorPages/NotFound'
import Restaurant from './pages/Restaurant/Restaurant';
import LineManagement from './pages/RestaurantManagement/LineManagement/LineManagement';
import RestaurantManagement from './pages/RestaurantManagement/RestaurantManagement';
import RestaurantSettings from './pages/RestaurantManagement/RestaurantSettings/RestaurantSettings';
import UserSettings from './pages/User/UserSettings/UserSettings.js'
import { Redirect } from 'react-router';
import { auth, signOutWithGoogle } from './service/firebase';
import Loader from "react-loader-spinner";


function PrivateRoute({ component, isLoggedIn, isSetup, ...rest }) {
  return (
    <Route {...rest} render={(props) => {
      if (!isLoggedIn) {
        return <Redirect exact to="/" />;
      }
      else {
        if (isSetup) {
          return component;
        }
        else {
          return <Redirect exact to="/user/create" />;
        }
      }
    }} />
  )
}

function PublicRoute({ component, isLoggedIn, isSetup, ...rest }) {
  return (
    <Route {...rest} render={(props) => {
      if (!isLoggedIn) {
        return component;
      }
      else {
        if (isSetup) {
          return <Redirect exact to="/restaurants" />;
        }
        else {
          return <Redirect exact to="/user/create" />;
        }
      }
    }} />
  )
}

function SetupRoute({ component, isLoggedIn, isSetup, ...rest }) {
  return (
    <Route {...rest} render={(props) => {
      if (!isLoggedIn) {
        return <Redirect exact to="/" />;
      }
      else {
        if (isSetup) {
          return <Redirect exact to="/restaurants" />;
        }
        else {
          return component;
        }
      }
    }} />
  )
}



class App extends React.Component {

  constructor() {
    super()
    this.state = {
      userType: null,
      userLoggedIn: false,
      signOutClicked: false,
      userLoggingIn: false,
      user: null
    }
  }

  userLoggingInToggle = () => {
    let loggingIn = this.state.userLoggingIn;
    this.setState({ userLoggingIn: !loggingIn });
  }

  async componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user !== null) {
        let body = {
          id: user.uid
        };
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        };
        setTimeout(() => {
          fetch('http://localhost:5001/user/get', requestOptions)
            .then(response => response.json())
            .then(data => {
              let userState = data.data.user;
              userState.id = user.uid;
              this.setState({
                user: userState,
                userLoggedIn: true,
                signOutClicked: false,
                userType: "student"
              });
              this.userLoggingInToggle();
            });
        }, 2000);
      } else {
        this.setState({
          user: null,
          userLoggedIn: false,
          userLoggingIn: false,
          signOutClicked: true,
          userType: null
        });
        console.log("no user");
      }
    })
  }

  changeUserData = (changes) => {
    let changedUser = Object.assign({}, this.state.user, changes);
    this.setState({ user: changedUser });
  }

  users = {
    "901329021": {
      name: "Jakub Hojsan",
      email: "jakubhojsan@g.ucla.edu",
      year: "2024",
      inLine: true,
      restaurantID: 1,
      uid: "901329021",
      favorites: [1, 2],
      id: "abcdef"
    },
    "205488283": {
      name: "Jake Sager",
      email: "jakesager@g.ucla.edu",
      year: "2024",
      inLine: true,
      restaurantID: 1,
      uid: "205488283",
      favorites: [1],
      id: "abcdef"
    },
    "305531276": {
      name: "Avii Ahuja",
      email: "avii.ahuja@gmail.com",
      year: "2024",
      inLine: true,
      restaurantID: 1,
      uid: "305531276",
      favorites: [1, 2],
      id: "aGakoB5JznQl3AvqWpB0fU56hdu2"
    }
  }

  restaurants = {
    1: {
      name: "Bruin Plate",
      chips: ["vegetarian", "gluten-free"],
      description: "A fun new restaurant for the fittest of Bruins!",
      hours: {
        "Monday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Tuesday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Wednesday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Thursday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Friday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Saturday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Sunday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
      },
      waitEnabled: true,
      avgTimePerCustomer: 3,
      phone: "(760) 123-4567",
      profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      bannerImage: "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20208/5f735e982cfac252edce64a4_Royce+Hall/Royce+Hall_hero.jpg",
      id: 1,
      waitlist: ["205488283", "901329021"],
      email: "bplate@dining.ucla.edu",
      url: "http://bplate.com",
      menu: "Taquitos\nA great dish for friends and family!\n\nNachos\nBest for the doggies.",
    },
    2: {
      name: "De Neve",
      chips: ["vegetarian", "vegan"],
      description: "A restaurant that prides itself on being mediocre.",
      hours: {
        "Monday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Tuesday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Wednesday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Thursday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Friday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Saturday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Sunday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
      },
      waitEnabled: false,
      avgTimePerCustomer: 3,
      phone: "(760) 123-4123",
      profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      bannerImage: "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20208/5f735e982cfac252edce64a4_Royce+Hall/Royce+Hall_hero.jpg",
      id: 2,
      waitlist: [],
      email: "deneve@dining.ucla.edu",
      url: "http://deneve.com",
      menu: "Taquitos\nA great dish for friends and family!\n\nNachos\nBest for the doggies.",
    },
    3: {
      name: "Rendezvous West",
      chips: ["takeout", "fast-food"],
      description: "We have really good burritos. We don't give enough guac.",
      hours: {
        "Monday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Tuesday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Wednesday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Thursday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Friday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Saturday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Sunday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
      },
      waitEnabled: true,
      avgTimePerCustomer: 3,
      phone: "(760) 123-4567",
      profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      bannerImage: "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20208/5f735e982cfac252edce64a4_Royce+Hall/Royce+Hall_hero.jpg",
      id: 3,
      waitlist: [],
      email: "rendewest@dining.ucla.edu",
      url: "http://rendewest.com",
      menu: "Taquitos\nA great dish for friends and family!\n\nNachos\nBest for the doggies.",
    },
    4: {
      name: "Bruin Plate",
      chips: ["vegetarian", "gluten-free"],
      description: "A fun new restaurant for the fittest of Bruins!",
      hours: {
        "Monday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Tuesday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Wednesday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Thursday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Friday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Saturday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Sunday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
      },
      waitEnabled: true,
      avgTimePerCustomer: 3,
      phone: "(760) 123-4567",
      profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      bannerImage: "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20208/5f735e982cfac252edce64a4_Royce+Hall/Royce+Hall_hero.jpg",
      id: 4,
      waitlist: [],
      email: "bplateagain@dining.ucla.edu",
      url: "http://anotherrestaurant.com",
      menu: "Taquitos\nA great dish for friends and family!\n\nNachos\nBest for the doggies.",
    },
    5: {
      name: "Bruin Plate",
      chips: ["vegetarian", "gluten-free"],
      description: "A fun new restaurant for the fittest of Bruins!",
      hours: {
        "Monday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Tuesday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Wednesday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Thursday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Friday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Saturday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Sunday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
      },
      waitEnabled: true,
      avgTimePerCustomer: 3,
      phone: "(760) 123-4567",
      profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      bannerImage: "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20208/5f735e982cfac252edce64a4_Royce+Hall/Royce+Hall_hero.jpg",
      id: 5,
      waitlist: [],
      email: "morebplate@dining.ucla.edu",
      url: "http://yeehaw.com",
      menu: "Taquitos\nA great dish for friends and family!\n\nNachos\nBest for the doggies.",
    },
    6: {
      name: "Bruin Plate",
      chips: ["vegetarian", "gluten-free"],
      description: "A fun new restaurant for the fittest of Bruins!",
      hours: {
        "Monday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Tuesday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Wednesday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Thursday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Friday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Saturday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
        "Sunday": { open: "9:00", openHalf: "am", close: "6:00", closeHalf: "pm", },
      },
      waitEnabled: true,
      avgTimePerCustomer: 3,
      phone: "(760) 123-4567",
      profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      bannerImage: "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20208/5f735e982cfac252edce64a4_Royce+Hall/Royce+Hall_hero.jpg",
      id: 6,
      waitlist: [],
      email: "againbplate@dining.ucla.edu",
      url: "http://uhhuh.com",
      menu: "Taquitos\nA great dish for friends and family!\n\nNachos\nBest for the doggies.",
    },
  }

  render() {
    console.log(this.state);
    if (this.state.user === null && (this.state.userLoggingIn || !this.state.signOutClicked)) return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
        />
      </div>
    );
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <PublicRoute exact path="/"
              isLoggedIn={this.state.userLoggedIn}
              isSetup={this.state.user ? this.state.user.setup : false}
              component={<Home isLoggedIn={this.state.userLoggedIn} user={this.state.user} restaurants={this.restaurants} userLoggingInToggle={this.userLoggingInToggle} />} />
            <Route path="/card"><CardPage /></Route>
            <PublicRoute path="/signup"
              isLoggedIn={this.state.userLoggedIn}
              isSetup={this.state.user ? this.state.user.setup : false}
              component={<Signup />} />
            <SetupRoute path="/user/create"
              isLoggedIn={this.state.userLoggedIn}
              isSetup={this.state.user ? this.state.user.setup : false}
              component={<UserSignup user={this.state.user} changeUserData={this.changeUserData} />} />
            <Route path="/manage/create"><RestaurantSignup restaurant={this.restaurants[1]} /></Route>
            <Route path="/restaurants/:id" render={(props) => <Restaurant {...props} isLoggedIn={this.state.userLoggedIn} restaurants={this.restaurants} user={this.state.user} />}></Route>
            <PrivateRoute path="/restaurants"
              isLoggedIn={this.state.userLoggedIn}
              isSetup={this.state.user ? this.state.user.setup : false}
              component={<Restaurants isLoggedIn={this.state.userLoggedIn} user={this.state.user} restaurants={this.restaurants} />} />
            <PrivateRoute path="/user"
              isLoggedIn={this.state.userLoggedIn}
              isSetup={this.state.user ? this.state.user.setup : false}
              component={<UserSettings isLoggedIn={this.state.userLoggedIn} user={this.state.user} restaurants={this.restaurants} changeUserData={this.changeUserData} />} />
            <Route path="/manage/line"><LineManagement users={this.users} restaurant={this.restaurants[1]} /></Route>
            <Route path="/manage/settings"><RestaurantSettings restaurant={this.restaurants[1]} /></Route>
            <Route path="/manage"><RestaurantManagement restaurant={this.restaurants[1]} /></Route>
            <Route path="/about"><About /></Route>
            <Route path="/404" component={NotFound}></Route>
            <Redirect to="/404" />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
