import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxilary/auxilary";
const sideDrawer = (props) => {
    let attached_classes= [classes.SideDrawer , classes.Close];
    if (props.show){
        attached_classes = [classes.SideDrawer , classes.Open]
    }
  return (
    <Aux>
      <Backdrop show={props.show} clicked ={props.closed} />
      <div className={attached_classes.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
