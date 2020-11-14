import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/ChekoutSummary/CheckoutSummary";
class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      bacon: 1,
      cheese: 1,
    },
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    this.setState({ ingredients: ingredients });
  }
  checkout_canceled = () => {
    // for going back to our last page
    this.props.history.goBack();
  };
  checkout_continued = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkout_canceled={this.checkout_canceled}
          checkout_continued={this.checkout_continued}
        />
      </div>
    );
  }
}

export default Checkout;
