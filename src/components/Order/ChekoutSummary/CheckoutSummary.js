import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it testes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>

      <Button btn_type="Danger" clicked ={props.checkout_canceled}>
        Cancel
      </Button>
      <Button btn_type="Success" clicked={props.checkout_continued}>
        Continue
      </Button>
    </div>
  );
};
export default checkoutSummary;
