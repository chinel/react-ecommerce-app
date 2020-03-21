import React from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import { googleSignInStart } from '../../redux/user/user.actions';
import './sign-in.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';



class SignIn extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async(e) => {
        e.preventDefault();

        const {email, password} = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '',
            password: ''})
        } catch (error) {
            
        }
    }

    handleChange = (e) => 
    {
        const {value, name} = e.target;
      
        this.setState({[name]: value});
    }

    render()
    {
        const {googleSignInStart} = this.props;
        return(
      <div className="sign-in">
          <h2>I already have an account</h2>
          <span>Sign in with your email and password</span>
          <form onSubmit={this.handleSubmit}>
              <FormInput type="text" name="email" value={this.state.email}  handleChange={this.handleChange} label='Email'/>
              <FormInput type="password" name="password" value={this.state.password} required handleChange={this.handleChange} label='Password'/>
              <div className="buttons">
              <CustomButton type="submit">Sign in</CustomButton>
              <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>Sign in with Google</CustomButton>
              </div>
          </form>
      </div>
    )
}
}

const mapDispatchToProps = (dispatch) => ({
    googleSignInStart: () => dispatch(googleSignInStart())
})

export default connect(null,mapDispatchToProps)(SignIn);