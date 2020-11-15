import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
class ContactData extends Component {
  state = {
    order_form: {
      name: {
        element_type: "input",
        element_config: {
          placeholder: "Your name",
          type: "text",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        element_type: "input",
        element_config: {
          placeholder: "Street",
          type: "text",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        element_type: "input",
        element_config: {
          placeholder: "Zip Code",
          type: "text",
        },
        value: "",
        validation: {
          required: true,
          min_length: 5,
          max_length: 5,
        },
        valid: false,
        touched: false,
      },
      Country: {
        element_type: "input",
        element_config: {
          placeholder: "Country",
          type: "text",
        },
        valid: false,
        touched: false,
        value: "",
        validation: {
          required: true,
        },
      },
      email: {
        element_type: "input",
        element_config: {
          placeholder: "Email",
          type: "email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      delivery_method: {
        element_type: "select",
        element_config: {
          options: [
            { value: "fastest", display_value: "Fastest" },
            { value: "cheapest", display_value: "Cheapest" },
          ],
        },
        value: "fastest",
      },
    },
    loading: false,
  };

  order_handler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const form_data = {};
    // transform our form
    for (let form_element_id in this.state.order_form) {
      form_data[form_element_id] = this.state.order_form[form_element_id].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.total_price,
      order_data: form_data,
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

  input_changed_handler = (event, input_id) => {
    const updated_order_form = { ...this.state.order_form };
    const updated_form_element = { ...updated_order_form[input_id] };
    updated_form_element.value = event.target.value;
    updated_form_element.valid = this.check_validity(
      updated_form_element.value,
      updated_form_element.validation
    );
    updated_form_element.touched = true;
    updated_order_form[input_id] = updated_form_element;
    console.log(updated_form_element);
    this.setState({ order_form: updated_order_form });
  };

  check_validity = (value, rules) => {
    let is_valid = true;
    if (rules) {
      if (rules.required) {
        is_valid = value.trim() !== "" && is_valid;
      }
      if (rules.min_length) {
        is_valid = value.length >= rules.min_length && is_valid;
      }
      if (rules.max_length) {
        is_valid = value.length <= rules.max_length && is_valid;
      }
    }
    return is_valid;
  };

  render() {
    const form_elements_array = [];
    for (let key in this.state.order_form) {
      form_elements_array.push({
        id: key,
        config: this.state.order_form[key],
      });
    }
    let form = (
      <form onSubmit={this.order_handler}>
        {form_elements_array.map((form_el) => (
          <Input
            invalid={!form_el.config.valid}
            key={form_el.id}
            should_validate={form_el.config.validation}
            element_type={form_el.config.element_type}
            element_config={form_el.config.element_config}
            value={form_el.config.value}
            touched ={form_el.config.touched}
            changed={(event) => {
              this.input_changed_handler(event, form_el.id);
            }}
          />
        ))}
        <Button btn_type="Success">Order</Button>
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
