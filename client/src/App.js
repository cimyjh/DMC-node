import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
// import { Router } from "express";

function App() {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Router exact path="/">
            <LandingPage />
          </Router>

          <Router exact path="/login">
            <LoginPage />
          </Router>

          <Router exact path="/register">
            <RegisterPage />
          </Router>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
