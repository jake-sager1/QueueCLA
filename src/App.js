import React, { useState, useEffect } from 'react';
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
import Terms from './pages/TermsOfService/Terms'
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
import { signOut } from '@firebase/auth';
import SearchPage from './pages/Restaurants/Search';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Web } from '@mui/icons-material';

function UserPrivateRoute({ component, isLoggedIn, isSetup, userType, ...rest }) {
  return (
    <Route {...rest} render={(props) => {
      if (!isLoggedIn) {
        return <Redirect exact to="/" />;
      }
      else {
        if (isSetup) {
          if (userType === "student")
            return component;
          else {
            return <Redirect exact to="/" />;
          }
        }
        else {
          if (userType === "student")
            return <Redirect exact to="/user/create" />;
          else
            return <Redirect exact to="/" />;
        }
      }
    }} />
  )
}

function RestaurantPrivateRoute({ component, isLoggedIn, isSetup, userType, ...rest }) {
  return (
    <Route {...rest} render={(props) => {
      if (!isLoggedIn) {
        return <Redirect exact to="/manage" />;
      }
      else {
        if (isSetup) {
          if (userType === "restaurant")
            return component;
          else {
            return <Redirect exact to="/" />;
          }
        }
        else {
          if (userType === "restaurant")
            return <Redirect exact to="/manage/create" />;
          else
            return <Redirect exact to="/" />;
        }
      }
    }} />
  )
}


function PublicRoute({ component, isLoggedIn, isSetup, userType, ...rest }) {
  return (
    <Route {...rest} render={(props) => {
      if (!isLoggedIn) {
        return component;
      }
      else {
        if (isSetup) {
          if (userType === "student")
            return <Redirect exact to="/restaurants" />;
          else {
            return <Redirect exact to="/manage/line" />;
          }
        }
        else {
          if (userType === "student")
            return <Redirect exact to="/user/create" />;
          else {
            return <Redirect exact to="/manage/create" />;
          }
        }
      }
    }} />
  )
}

function UserSetupRoute({ component, isLoggedIn, isSetup, ...rest }) {
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

function RestaurantSetupRoute({ component, isLoggedIn, isSetup, ...rest }) {
  return (
    <Route {...rest} render={(props) => {
      if (!isLoggedIn) {
        return <Redirect exact to="/" />;
      }
      else {
        if (isSetup) {
          return <Redirect exact to="/manage/line" />;
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
    super();
    this.state = {
      userType: null,
      loggedIn: false,
      signOutClicked: false,
      loggingIn: false,
      user: null,
      restaurants: [],
      ws: null
    }
  }

  loggingInToggle = () => {
    let loggingIn = this.state.loggingIn;
    this.setState({ loggingIn: !loggingIn });
  }

  getRestaurants = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch("http://localhost:5001/restaurant/all", requestOptions)
      .then(response => response.json())
      .then(data => {
        let restaurantObj = data.data;
        this.setState({
          restaurants: restaurantObj
        })
      });
  }

  getUserAgain = async (userType) => {
    if (this.state.user === null) return;
    let body = {
      id: this.state.user.id
    };
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    if (userType === "student") {
      setTimeout(() => {
        fetch('http://localhost:5001/user/get', requestOptions)
          .then(response => response.json())
          .then(data => {
            if (data.statusCode === 200) {
              let userState = data.data.user;
              this.setState({
                user: userState,
              });
            }
          });
      }, 2000);
    }
    else if (userType === "restaurant") {
      setTimeout(() => {
        fetch('http://localhost:5001/restaurant/get', requestOptions)
          .then(response => response.json())
          .then(data => {
            if (data.statusCode === 200) {
              let userState = data.data.restaurant;
              this.setState({
                user: userState,
              });
            }
          });
      }, 2000);
      // let waitlist = this.state.user.waitlist;
      // setTimeout(() => {
      //   for (let i = 0; i < waitlist.length; i++) {
      //     body.id = waitlist[i].id;
      //     requestOptions.body = JSON.stringify(body);
      //     fetch('http://localhost:5001/user/get', requestOptions)
      //       .then(response => response.json())
      //       .then(data => {
      //         if (data.statusCode === 200) {
      //           let uid = data.data.user.uid;
      //           let id = data.data.user.id;
      //           let name = data.data.user.name;
      //           waitlist[i].id = id;
      //           waitlist[i].uid = uid;
      //           waitlist[i].name = name;
      //           let oldUser = this.state.user;
      //           oldUser.waitlist = waitlist;
      //           this.setState({
      //             user: oldUser
      //           });
      //         }
      //       })
      //   }
      // }, 2000);
    }
  }

  //connect function
  socketConnect = () => {
    let ws = new WebSocket("ws://localhost:8080");
    let that = this; // cache the current properties
    let connectInterval;

    // websocket onopen event listener
    ws.onopen = () => {
      console.log("Websocket connection established");

      //set state of the websocket
      this.setState({ ws: ws });

      that.timeout = 250; // reset timer to 250 on open of websocket connection 
      clearTimeout(connectInterval); // clear Interval on onopen of websocket connection
    };

    //on receiving a message
    ws.onmessage = async (evt) => {
      evt.data.text().then(
        (msg) => {
          let data = JSON.parse(msg);
          console.log(data);
          setTimeout(() => {
            this.getUserAgain(this.state.userType);
            this.getRestaurants();
          }, 1000);
        });
    }

    // websocket onclose event listener
    ws.onclose = e => {
      console.log(
        `Socket is closed. Reconnect will be attempted in ${Math.min(
          10000 / 1000,
          (that.timeout + that.timeout) / 1000
        )} second.`,
        e.reason
      );

      that.timeout = that.timeout + that.timeout; //increment retry interval
      connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
    };

    // websocket onerror event listener
    ws.onerror = err => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );

      ws.close();
    };
  };

  //check if the websocket conenction is closed or has not been setup
  check = () => {
    const { ws } = this.state;
    if (!ws || ws.readyState == WebSocket.CLOSED) this.socketConnect(); //check if websocket instance is closed, if so call `connect` function.
  };

  componentWillUnmount() {
    this.state.ws.close();
    this.setState({ ws: null });
  }
  async componentDidMount() {
    this.socketConnect();
    this.getRestaurants();

    //track auth
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
              if (data.statusCode === 200) {
                let userState = data.data.user;
                userState.id = user.uid;
                this.setState({
                  user: userState,
                  loggedIn: true,
                  signOutClicked: false,
                  userType: userState.type
                });
                this.loggingInToggle();
              }
            });
        }, 2000);
        setTimeout(() => {
          fetch('http://localhost:5001/restaurant/get', requestOptions)
            .then(response => response.json())
            .then(data => {
              if (data.statusCode === 200) {
                let userState = data.data.restaurant;
                userState.id = user.uid;
                this.setState({
                  user: userState,
                  loggedIn: true,
                  signOutClicked: false,
                  userType: userState.type
                });
                this.loggingInToggle();
              }
            });
        }, 2000);
        //get the list of all the restaurants
      } else {
        this.setState({
          user: null,
          loggedIn: false,
          loggingIn: false,
          signOutClicked: true,
          userType: null
        });
        console.log("no user");
      }
    })
  }

  broadcastMessage = (userType, id, changes) => {
    this.state.ws.send(JSON.stringify({
      data: {
        id: id,
        userType: userType,
        changes: changes
      }
    }));
  }

  changeUserData = (changes) => {
    let changedUser = Object.assign({}, this.state.user, changes);
    this.setState({ user: changedUser });
    this.broadcastMessage(this.state.userType, this.state.user.id, changes);
  }

  changeRestaurantData = (id, changes) => {
    let changedRestaurant = Object.assign({}, this.state.restaurants[id], changes);
    let oldRestaurants = this.state.restaurants;
    oldRestaurants[id] = changedRestaurant;
    this.setState({
      restaurants: oldRestaurants
    });
    this.broadcastMessage(this.state.userType, this.state.user.id, changes);
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
    if (this.state.user === null && (this.state.loggingIn || !this.state.signOutClicked)) return (
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
              isLoggedIn={this.state.loggedIn}
              isSetup={this.state.user ? this.state.user.setup : false}
              userType={this.state.userType}
              component={<Home isLoggedIn={this.state.loggedIn} user={this.state.user} restaurants={this.state.restaurants}
                loggingInToggle={this.loggingInToggle}
              />} />
            <Route path="/card"><CardPage /></Route>
            <PublicRoute path="/signup"
              isLoggedIn={this.state.loggedIn}
              isSetup={this.state.user ? this.state.user.setup : false}
              component={<Signup />} />
            <UserSetupRoute path="/user/create"
              isLoggedIn={this.state.loggedIn}
              isSetup={this.state.user ? this.state.user.setup : false}
              component={<UserSignup user={this.state.user} changeUserData={this.changeUserData} />} />
            <RestaurantSetupRoute path="/manage/create"
              isLoggedIn={this.state.loggedIn}
              isSetup={this.state.user ? this.state.user.setup : false}
              component={<RestaurantSignup restaurant={this.state.user} changeUserData={this.changeUserData} />} />
            <Route path="/restaurants/:id" render={(props) => <Restaurant {...props}
              isLoggedIn={this.state.loggedIn}
              restaurants={this.state.restaurants}
              changeUserData={this.changeUserData}
              changeRestaurantData={this.changeRestaurantData}
              user={this.state.user} />}></Route>
            <Route path="/search/:query" render={(props) => <SearchPage {...props}
              isLoggedIn={this.state.loggedIn}
              isSetup={this.state.user ? this.state.user.setup : false}
              changeUserData={this.changeUserData}
              changeRestaurantData={this.changeRestaurantData}
              restaurants={this.state.restaurants}
              user={this.state.user}
            />} />
            <Route path="/search"><Redirect to="/restaurants" /></Route>
            <UserPrivateRoute path="/restaurants"
              isLoggedIn={this.state.loggedIn}
              isSetup={this.state.user ? this.state.user.setup : false}
              userType={this.state.userType}
              component={<Restaurants isLoggedIn={this.state.loggedIn} user={this.state.user} restaurants={this.state.restaurants} />} />
            <UserPrivateRoute path="/user"
              isLoggedIn={this.state.loggedIn}
              isSetup={this.state.user ? this.state.user.setup : false}
              userType={this.state.userType}
              component={<UserSettings isLoggedIn={this.state.loggedIn} user={this.state.user} restaurants={this.state.restaurants} changeUserData={this.changeUserData} />} />
            <RestaurantPrivateRoute path="/manage/line"
              isLoggedIn={this.state.loggedIn}
              isSetup={this.state.user ? this.state.user.setup : false}
              userType={this.state.userType}
              component={<LineManagement
                users={this.users}
                restaurant={this.state.user}
                isLoggedIn={this.state.loggedIn}
                changeUserData={this.changeUserData}
                changeRestaurantData={this.changeRestaurantData}
              />} />
            <RestaurantPrivateRoute path="/manage/settings"
              isLoggedIn={this.state.loggedIn}
              isSetup={this.state.user ? this.state.user.setup : false}
              userType={this.state.userType}
              component={<RestaurantSettings restaurant={this.state.user} isLoggedIn={this.state.loggedIn} changeUserData={this.changeUserData} />} />
            <PublicRoute exact path="/manage"
              isLoggedIn={this.state.loggedIn}
              isSetup={this.state.user ? this.state.user.setup : false}
              userType={this.state.userType}
              component={<RestaurantManagement restaurant={this.state.user}
                isLoggedIn={this.loggedIn}
                loggingInToggle={this.loggingInToggle}
              />} />
            <Route path="/about"><About /></Route>
            <Route path="/termsofservice"><Terms /></Route>
            <Route path="/404" component={NotFound}></Route>
            <Redirect to="/404" />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
