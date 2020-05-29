import React, { useState } from 'react';
import app from './app.css';
import { Main } from '@aragon/ui';
import { storePreference, getPreference } from './utils/storage';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import NavBar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Footer from "./components/layout/Footer";
import CreateProject from "./components/create-project";
import Portfolio from './components/portfolio';
import MyShip from './components/myship';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App()  {

  const storedTheme = getPreference('theme', 'light');

  const [theme, setTheme] = useState(storedTheme);

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    storePreference('theme', newTheme);
  };

    return (
      <Provider store={store}>
        <Router>
          <Main theme={theme}>
          <NavBar theme={theme} updateTheme={updateTheme} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/create" component={CreateProject} />
            <Route exact path="/portfolio" component={Portfolio} />
            <Route exact path="/myship" component={MyShip} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Footer theme={theme} />
          </Main>
        </Router>
      </Provider>
    );
  }

export default App;