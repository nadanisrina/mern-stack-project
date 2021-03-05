import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
//pages
import Users from "./user/pages/Users";
import NewPlaces from "./places/pages/NewPlaces";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
//component
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Auth from "./user/pages/Auth";
//redux
import { Provider } from "react-redux";
//store
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MainNavigation />
        <main>
          <Switch>
            <Route exact path="/" component={Users} />
            <Route exact path="/:userId/places" component={UserPlaces} />
            <Route exact path="/places/new" component={NewPlaces} />
            <Route exact path="/places/:placeId" component={UpdatePlace} />
            <Route exact path="/auth" component={Auth} />
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </Provider>
  );
}

export default App;
