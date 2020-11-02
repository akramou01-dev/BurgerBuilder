import React from "react";
import classes from "./BuildControl.css";
const buildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.remove_ingredients}
      disabled={props.disabled}
    >
      Less
    </button>
    <button className={classes.More} onClick={props.add_ingredient}>
      More
    </button>
  </div>
);

export default buildControl;
