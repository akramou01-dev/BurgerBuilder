import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/ChekoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      bacon: 0,
      cheese: 0,
    },
    total_price: 0,
  };
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let total_price;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        total_price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, total_price: total_price });
  }
  checkout_canceled = () => {
    // for going back to our last page
    this.props.history.goBack();
  };
  checkout_continued = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    console.log(this.state.ingredients);
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkout_canceled={this.checkout_canceled}
          checkout_continued={this.checkout_continued}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          render={(props) => (
            <ContactData
              {...props}
              ingredients={this.state.ingredients}
              total_price={this.state.total_price}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
