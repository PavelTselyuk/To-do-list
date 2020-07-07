import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../actions';
import CustomInput from './Custominput';

class SignIn extends Component {
   constructor(props) {
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
   }

   async onSubmit(formData) {
      let login = document.getElementById('login').value.toLowerCase();
      await this.props.signIn(formData);
      if (!this.props.errorMessage) {
         localStorage.setItem('login', login);
         this.props.history.push('/dashboard');
      }
   }

   render() {
      let { handleSubmit } = this.props;
      return (
         <div className="row">
            <div className="col">
               <form action="" onSubmit={handleSubmit(this.onSubmit)}>
                  <fieldset>
                     <Field
                        name="login"
                        type="text"
                        id="login"
                        label="Enter your login"
                        placeholder="example"
                        component={CustomInput} />
                  </fieldset>
                  <fieldset>
                     <Field
                        name="password"
                        type="password"
                        id="password"
                        label="Enter your password"
                        placeholder="yoursuperawesomepassword"
                        component={CustomInput} />
                  </fieldset>

                  {this.props.errorMessage ?
                     <div className="alert alert-danger">
                        {this.props.errorMessage}
                     </div> :
                     null}

                  <button type="submit" className="btn btn-primary">Sign In</button>
               </form>
            </div>
            <div className="col">
               <div className="text-center">
                  <div className="alert alert-primary">
                     For third-part autentication
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

function mapStateToProps(state) {
   return {
      errorMessage: state.auth.errorMessage
   }
}

export default compose(
   connect(mapStateToProps, actions),
   reduxForm({ form: 'signin' })
)(SignIn)