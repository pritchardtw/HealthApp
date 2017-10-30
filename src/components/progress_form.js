import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { mealCompleted, mealIncomplete } from '../actions';

class ProgressForm extends Component {

  markMealIncomplete() {
    if(this.props.auth) {
      let { meal_index } = this.props;
      this.props.mealIncomplete(meal_index);
    } else {
      console.log("In incomplete when unauthed?");
    }
  }

  renderReset() {
    let { description, feelings } = this.props.progress.values;

    return (
      <div className="form-group reset">
        <label>Describe your creation</label>
        <p>{description}</p>
        <label>How are you feeling?</label>
        <p>{feelings}</p>
        <button className="btn btn-primary" onClick={this.markMealIncomplete.bind(this)}>Reset</button>
      </div>
    );
  }

  renderField(field) {
    const { meta: {touched, error}, label, input, initialValue } = field;
    const className = `form-group ${touched && error ? 'has-error' : ''}`

    return(
      <div className={className}>
        <label>{label}</label>
        <textarea
          className="form-control"
          type="text"
          {...input}
        />
        <div className="text-error">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    // this === component
    this.props.mealCompleted(values, this.props.match.params.meal_index);
  }

  renderProgressForm() {

    const { handleSubmit, progress } = this.props;

    return (
      <div className="progress-form">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Describe your creation"
            name="description"
            component={this.renderField}
          />
          <Field
            label="How are you feeling?"
            name="feelings"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Complete</button>
        </form>
      </div>
    );
  }

  renderProgressSection() {
    let { progress, auth } = this.props;
    if(!auth) {
      return (<NavLink to='/'><button className="btn btn-primary">Login to save progress!</button></NavLink>);
    } else if(!progress || !progress.completed) {
      return this.renderProgressForm();
    } else {
      return this.renderReset();
    }
  }

  render() {
    return(
      <div className="progress-section">
        {this.renderProgressSection()}
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  //Validate the inputs from the 'values'
  if (!values.description) {
    errors.description = "Leave a description";
  }

  if (!values.feelings) {
    errors.feelings = "Feeling healthy?";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

const mapStateToProps = ({ auth, progress }, { match }) => {
  return {
    auth: auth.auth,
    progress: progress[match.params.meal_index],
  };
}

export default reduxForm({
  form: 'ProgressForm',
  validate,
})(
  connect(mapStateToProps,{ mealCompleted, mealIncomplete })(ProgressForm)
);
