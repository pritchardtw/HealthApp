import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { purchasePro } from '../../actions';

class CheckoutForm extends Component {

  handleSubmit = (event) => {
    console.log("in handle submit");
    event.preventDefault();
    this.props.stripe.createToken()
    .then((response) => {
      if(response.error) {
        console.log("got error", response.error.message);
      } else {
        console.log("Success", response);
        this.props.purchasePro(response.token);
      }
    })
    .catch((err) => {
      console.log("Error", err);
    });
  }

  render() {
    return (
      <div className="checkout-form">
        <h1>The complete true health plan: $10.00</h1>
        <p>Purchasing the complete true health plan grants you access to
        meals for the full 30 days.</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            <h2>Card information</h2>
            <CardElement {...{style: {
              base: {
                fontFamily: 'Source Code Pro, monospace',
              }}}}/>
            </label>
            <div><button className="btn-pay">Pay $10.00</button></div>
        </form>
      </div>
    );
  }
}

export default injectStripe(connect(null, { purchasePro })(CheckoutForm));
