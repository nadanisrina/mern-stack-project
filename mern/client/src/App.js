import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import "./index.css";
//pages
import Users from "./user/pages/Users";
import NewPlaces from "./places/pages/NewPlaces";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
//component
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Auth from "./user/pages/Auth";
//redux
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.Login.login);
  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route exact path="/" component={Users} />
        <Route exact path="/:userId/places" component={UserPlaces} />
        <Route exact path="/places/new" component={NewPlaces} />
        <Route exact path="/places/:placeId" component={UpdatePlace} />
        <Route exact path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={Users} />
        <Route exact path="/:userId/places" component={UserPlaces} />
        <Route exact path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <Router>
      <MainNavigation />
      <main>{routes}</main>
    </Router>
  );
}

export default App;
