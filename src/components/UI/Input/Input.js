import React from "react";
import classes from "./Input.css";
const input = (props) => {
  const input_classes = [classes.InputElement];
  if (props.invalid && props.should_validate && props.touched) {
    input_classes.push(classes.Invalid);
  }

  let input_element = null;
  switch (props.element_type) {
    case "input":
      input_element = (
        <input
          className={input_classes.join(" ")}
          {...props.element_config}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      input_element = (
        <textarea
          className={input_classes.join(" ")}
          {...props.element_config}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      input_element = (
        <select
          className={input_classes.join(" ")}
          {...props.element_config}
          value={props.value}
          onChange={props.changed}
        >
          {" "}
          {props.element_config.options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              onChange={props.changed}
            >
              {option.display_value}{" "}
            </option>
          ))}
        </select>
      );
      break;
    default:
      input_element = (
        <input
          className={input_classes.join(" ")}
          {...props.element_config}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {input_element}
    </div>
  );
};
export default input;
