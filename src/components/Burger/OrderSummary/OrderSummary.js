import React , {Component}  from "react";
import Aux from "../../../hoc/Auxilary/auxilary";
import Button from "../../UI/Button/Button";
class OrderSummary extends Component {
  // componentWillUpdate = () => {
  //   console.log('3ayitna khouya')
  // }
  render(){
  const ingredientSummary = Object.keys(this.props.ingredients).map((ingr) => {
    return (
      <li key={ingr}>
        <span style={{ textTransform: "capitalize" }}> {ingr} </span>:{" "}
        {this.props.ingredients[ingr]}{" "}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delecious Burger with the folowing ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong> Total Price :{this.props.total_price.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btn_type="Danger" clicked={this.props.purshas_cancel}>
        CANCEL
      </Button>
      <Button btn_type="Success" clicked={this.props.purshas_continue}>
        CONTINUE
      </Button>
    </Aux>
  );
};
}

export default OrderSummary;
