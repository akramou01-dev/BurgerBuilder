import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
class ContactData extends Component {
  state = {
    username: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  order_handler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.total_price,
      customer: {
        name: "akramou",
        address: {
          street: "merabet ahmed Street",
          numero: 19,
          Pays: "Algerie",
        },
        email: "test@test.com",
      },
      delivery_method: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((res) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((err) => {
        alert(err.message);
        this.setState({ loading: false });
      });
  };
  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your name"></input>
        <input type="email" name="email" placeholder="Your Email"></input>
        <input type="text" name="street" placeholder="Your Street"></input>
        <input type="text" name="postal_code" placeholder="Postal Code"></input>
        <Button btn_type="Success" clicked={this.order_handler}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
