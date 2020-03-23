import React from "react";
import { connect } from 'react-redux';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { signUpStart } from '../../redux/user/user.actions';
import "./sign-up.styles.scss";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    const {signUpStart} = this.props;
    console.log(this.state)
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    signUpStart({displayName,email,password});
  };

  handleChange = (event) => {
      const {name,value} = event.target;
    
      this.setState({[name]: value});
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>

        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            handleChange={this.handleChange}
            label="Display Name"
            value={displayName}
          />

          <FormInput
            type="email"
            name="email"
            handleChange={this.handleChange}
            label="Email"
            value={email}
          />
          <FormInput
            type="password"
            name="password"
            handleChange={this.handleChange}
            label="Password"
            value={password}
          />
          <FormInput
            type="password"
            name="confirmPassword"
            handleChange={this.handleChange}
            label="Confirm Password"
            value={confirmPassword}
          />
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  signUpStart : (userCredentials) => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp);
