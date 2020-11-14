import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const fetched_orders = [];
        for (let key in res.data) {
          fetched_orders.push({
            id: key,
            ...res.data[key],
          });
        }
        this.setState({
          loading: false,
          orders: fetched_orders,
        });
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({
          loading: false,
        });
      });
  }
  render() {
    let orders = this.state.orders.map((order) => (
      <Order
        ingredients={order.ingredients}
        price={order.price}
        key={order.id}
      />
    ));
    if (this.state.loading) {
      orders = <Spinner />;
    }

    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
