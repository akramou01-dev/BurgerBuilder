import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../../components/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from '../SideDrawer/DrowerToggle/DrawerToggle'
const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked = {props.open} />    
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);
export default toolbar;
