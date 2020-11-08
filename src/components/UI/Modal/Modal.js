import React, {Component} from "react";
import classes from "./Modal.css";
import Aux from "../../../hoc/Auxilary/auxilary";
import Backdrop from "../Backdrop/Backdrop";
class Modal extends Component {
  shouldComponentUpdate(next_props,next_state){
    // il faut checker tout les state qui se changent 
      return next_props.show !== this.props.show  || next_props.children !== this.props.children
  }
  // componentWillUpdate(){
  //   console.log("modal ")
  // }
  render() {  
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modal_closed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
