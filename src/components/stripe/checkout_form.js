import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { purchasePro } from '../../actions';
import { Redirect } from 'react-router-dom';

class CheckoutForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ccError : false,
      ccErrorMessage : ''
    }
  }

  showPayButton = () => {
    $('.btn-pay').css("display","inline-block");
  }

  handleSubmit = (event) => {
    event.preventDefault();
    $('.btn-pay').css("display","none");
    this.props.stripe.createToken()
    .then((response) => {
      if(response.error) {
        this.showPayButton();
        console.log("got error", response.error.message);
        this.setState({ccError : true, ccErrorMessage : response.error.message });
      } else {
        console.log("Success", response);
        this.setState({ccError : false, ccErrorMessage : '' });
        this.props.purchasePro(response.token, this.showPayButton );
      }
    })
    .catch((err) => {
      console.log("Error", err);
    });
  }

  render() {
    if(this.props.pro) {
      return (
        <Redirect to='/app' />
      );
    } else if (this.props.processing) {
      return (
        <div className="spinner-container">
          <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
          <h1>We are processing your purchase, thank you for your support.</h1>
        </div>
      );
    } else {
      return (
        <div className="checkout-form">
          <h1>The complete true health plan: $10.00</h1>
          <p>Purchasing the complete true health plan grants you access to
          the full 30 days of meals.</p>
          <form onSubmit={this.handleSubmit}>
            <label>
              <h2>Card information</h2>
              <CardElement {...{style: {
                base: {
                  fontFamily: 'Source Code Pro, monospace',
                }}}}/>
              </label>
              {(this.props.error ?
                <p>There was an error processing your request. Developers have been notified.
                   Please try again, your card was not charged.</p>
                :
                '')}
               {(this.state.ccError ?
                <p>{this.state.ccErrorMessage}</p>
                :
                '')}
              <div><button className="btn-pay">Pay $10.00</button></div>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ purchase_plan }) => {
  return {
    pro: purchase_plan.pro,
    error: purchase_plan.error,
    processing: purchase_plan.processing
  }
}

export default injectStripe(connect(mapStateToProps, { purchasePro })(CheckoutForm));
