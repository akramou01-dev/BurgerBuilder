import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxilary/auxilary";
const with_error_handler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentWillMount() {
      this.req_interceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      
      this.res_interceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount(){
        /**si on fait plusieurs appel pour with_error_handler alors on va crée plsrs instance pour axios 
         * ces plsr instance vont modifier notre req et res plusieurs fois alors qu'on a besoin juste une seule fois
         * componentWillUnmount va etre executer kan un componenet n'est pas utiliser alors c le bon endroit pour supprimer les instances
         */
        console.log("WILLUNMOUNNT",this.req_interceptor , this.res_interceptor)
        axios.interceptors.request.eject(this.req_interceptor)
        axios.interceptors.request.eject(this.res_interceptor)
        

    }
    error_confirmed_handler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modal_closed={this.error_confirmed_handler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />;
        </Aux>
      );
    }
  };
};

export default with_error_handler;
