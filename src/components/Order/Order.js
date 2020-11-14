import React from "react";
import classes from "./Order.css";
const order = (props) => {
  const ingredients = [];
  for (let ingredient_name in props.ingredients) {
    ingredients.push({
      name: ingredient_name,
      amout: props.ingredients[ingredient_name],
    });
  }
  const ingredient_output = ingredients.map((ig) => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px ",
          border: "1px solid #ccc",
          padding: "5px",
        }}
      >
        {ig.name} ({ig.amout}){" "}
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredient_output} </p>
      <p>
        Price <strong> {Number.parseFloat(props.price).toFixed(2)} </strong>(1){" "}
      </p>
    </div>
  );
};
export default order;
