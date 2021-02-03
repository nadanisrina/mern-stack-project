import React, { useState } from "react";

import MainHeader from "./MainHeader";
import "./MainNavigation.css";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop/Backdrop";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  return (
    <React.Fragment>
      {drawerIsOpen && (
        <React.Fragment>
          <Backdrop setDrawerIsOpen={() => setDrawerIsOpen(!drawerIsOpen)} />
          <SideDrawer show={drawerIsOpen}>
            <nav className="main-navigation__drawer-nav">
              <NavLinks />
            </nav>
          </SideDrawer>
        </React.Fragment>
      )}
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={() => setDrawerIsOpen(!drawerIsOpen)}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
