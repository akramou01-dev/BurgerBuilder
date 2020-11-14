import React, { Component } from "react";
import Aux from "../../../src/hoc/Auxilary/auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import with_error_handler from "../../hoc/WithErrorHandler/WithErrorHandler";

const INGREDIENTS_PRICES = {
  salad: 0.5,
  meat: 1.3,
  cheese: 0.4,
  bacon: 0.7,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    total_price: 4,
    purshasable: false,
    purshasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((err) => {
        this.setState({ error: true });
        console.log(err.message);
      });
  }
  add_ingredient_handler = (type) => {
    const updated_count = this.state.ingredients[type] + 1;
    const updated_ingredients = {
      ...this.state.ingredients,
    };
    updated_ingredients[type] = updated_count;
    this.setState((prev_state, props) => {
      return {
        ingredients: updated_ingredients,
        total_price: prev_state.total_price + INGREDIENTS_PRICES[type],
      };
    });
    this.update_purshas_state(updated_ingredients);
  };
  remove_ingredient_handler = (type) => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    const updated_count = this.state.ingredients[type] - 1;
    const updated_ingredients = {
      ...this.state.ingredients,
    };
    updated_ingredients[type] = updated_count;
    this.setState((prev_state, props) => {
      return {
        ingredients: updated_ingredients,
        total_price: prev_state.total_price - INGREDIENTS_PRICES[type],
      };
    });
    this.update_purshas_state(updated_ingredients);
  };
  update_purshas_state = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingr) => {
        return ingredients[ingr];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purshasable: sum > 0 });
  };
  purshase_handler = () => {
    this.setState({ purshasing: true });
  };
  purshas_cancel_handler = () => {
    this.setState({ purshasing: false });
  };
  purshas_continue_handler = () => {
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.total_price,
    //   customer: {
    //     name: "akramou",
    //     address: {
    //       street: "merabet ahmed Street",
    //       numero: 19,
    //       Pays: "Algerie",
    //     },
    //     email: "test@test.com",
    //   },
    //   delivery_method: "fastest",
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then((res) => {
    //     this.setState({ loading: false, purshasing: false });
    //   })
    //   .catch((err) => {
    //     this.setState({ loading: false, purshasing: false });
    //   });

    const query_params = [];
    for (let i in this.state.ingredients) {
      query_params.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    const query_string = query_params.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + query_string,
    });
  };
  render() {
    const disabled_infos = {
      ...this.state.ingredients,
    };
    for (let key in disabled_infos) {
      disabled_infos[key] = disabled_infos[key] <= 0;
    }
    let order_summary = null;
    let burger = this.state.error ? (
      <p>Ingredients can not be loaded.</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            add_ingredient={this.add_ingredient_handler}
            remove_ingredients={this.remove_ingredient_handler}
            disabled={disabled_infos}
            price={this.state.total_price}
            purshasable={this.state.purshasable}
            ordered={this.purshase_handler}
          />
        </Aux>
      );
      order_summary = (
        <OrderSummary
          total_price={this.state.total_price}
          ingredients={this.state.ingredients}
          purshas_cancel={this.purshas_cancel_handler}
          purshas_continue={this.purshas_continue_handler}
        />
      );
    }
    if (this.state.loading) {
      order_summary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purshasing}
          modal_closed={this.purshas_cancel_handler}
        >
          {order_summary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default with_error_handler(BurgerBuilder, axios);
