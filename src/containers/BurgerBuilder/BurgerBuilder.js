import React, { Component } from "react";
import Aux from "../../../src/hoc/auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENTS_PRICES = {
  salad: 0.5,
  meat: 1.3,
  cheese: 0.4,
  bacon: 0.7,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    total_price: 4,
    purshasable: false,
    purshasing: false,
  };
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
    this.setState({purshasing: true});
  };
  purshas_cancel_handler = ()=> {
      this.setState({purshasing : false,})
  }
  purshas_continue_handler = ()=> {
      alert('You continue')
  }
  render() {
    const disabled_infos = {
      ...this.state.ingredients,
    };
    for (let key in disabled_infos) {
      disabled_infos[key] = disabled_infos[key] <= 0;
    }
    return (
      <Aux>
        <Modal show ={this.state.purshasing} modal_closed={this.purshas_cancel_handler} >
          <OrderSummary 
          total_price ={this.state.total_price}
          ingredients={this.state.ingredients}
          purshas_cancel ={this.purshas_cancel_handler}
          purshas_continue = {this.purshas_continue_handler}
           />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          add_ingredient={this.add_ingredient_handler}
          remove_ingredients={this.remove_ingredient_handler}
          disabled={disabled_infos}
          price={this.state.total_price}
          purshasable={this.state.purshasable}
          ordered = {this.purshase_handler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
