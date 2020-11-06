import React, {Component} from "react";
import Aux from "../Auxilary/auxilary";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
class Layout extends Component {
  state={
    show_sidedrawer : false,
  }
  sidedrawer_closed_handler = () =>{
    this.setState({
      show_sidedrawer : false,
    })    
  }
  sidedrawer_open_handler = () =>{
    this.setState((prev_state,props)=> {
      return {
        show_sidedrawer : !prev_state.show_sidedrawer
      }
    })    
  }
  render(props) {
    return (
      <Aux>
        <Toolbar open = {this.sidedrawer_open_handler}/>
        <SideDrawer show ={this.state.show_sidedrawer} closed = {this.sidedrawer_closed_handler}/>
        {/* <div>Toolbar , SideDrawer , Backdrop</div> */}
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
