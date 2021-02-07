import React from "react";

import "./NavLinks.css";
import { NavLink } from "react-router-dom";
const NavLinks = () => {
  return (
    <ul className="nav-links">
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
      <li>
        <NavLink to="/auth" exact>
          AUTHENTICATE
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
