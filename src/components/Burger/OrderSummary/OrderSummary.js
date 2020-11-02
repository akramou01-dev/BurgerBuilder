import React from "react";
import Aux from "../../../hoc/auxilary";
import Button from "../../UI/Button/Button";
const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((ingr) => {
    return (
      <li key={ingr}>
        <span style={{ textTransform: "capitalize" }}> {ingr} </span>:{" "}
        {props.ingredients[ingr]}{" "}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delecious Burger with the folowing ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong> Total Price :{props.total_price.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btn_type="Danger" clicked={props.purshas_cancel}>
        CANCEL
      </Button>
      <Button btn_type="Success" clicked={props.purshas_continue}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
