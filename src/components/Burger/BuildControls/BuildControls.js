import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
];
const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price : <strong>{props.price.toFixed(2)}</strong>{" "}
    </p>
    {controls.map((control) => (
      <BuildControl
        key={control.label}
        label={control.label}
        add_ingredient={() => props.add_ingredient(control.type)}
        remove_ingredients={() => {
          props.remove_ingredients(control.type);
        }}
        disabled={props.disabled[control.type]}
      />
    ))}
    <button className={classes.OrderButton} disabled={!props.purshasable} onClick={props.ordered}>
      ORDER NOW
    </button>
  </div>
);
export default buildControls;
