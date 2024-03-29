import React from "react";
import classes from "./Button.css";
const button = (props) => (
  <button
    onClick={props.clicked}
    className={[classes.Button, classes[props.btn_type]].join(' ')}
  >
    {props.children}
  </button>
);
export default button;
