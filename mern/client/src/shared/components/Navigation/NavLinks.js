import React from "react";

import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const NavLinks = () => {
  const isLogin = useSelector((state) => state.Login.login);
  return (
    <ul className="nav-links">
      {isLogin && (
        <React.Fragment>
          <li>
            <NavLink exact to="/">
              ALL USERS
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/p1/places">
              MY PLACES
            </NavLink>
          </li>
          <li>
            <NavLink to="/places/new" exact>
              ADD PLACE
            </NavLink>
          </li>
        </React.Fragment>
      )}
      {/* if system not yet login */}
      {!isLogin && (
        <li>
          <NavLink to="/auth" exact>
            AUTHENTICATE
          </NavLink>
        </li>
      )}
      {/* if system have login */}
      {isLogin && (
        <li>
          <NavLink to="/auth" exact>
            LOGOUT
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
