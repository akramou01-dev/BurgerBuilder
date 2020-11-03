import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.css";
const navigationitmes = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active>
      Burger Builder
    </NavigationItem>
    <NavigationItem link='/'>Checkout</NavigationItem>
  </ul>
);

export default navigationitmes;
