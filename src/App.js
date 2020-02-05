import React, {Component} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shopPage/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth } from './firebase/firebase.utils';





class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    }
  }


unsubscribeFromAuth = null;  

componentDidMount(){
  this.unsubscribeFromAuth =  auth.onAuthStateChanged(user => {
    this.setState({currentUser: user});

    console.log(user);
  })
}

//this will help to close the open firebase auth whenever the component is to be unmounted
componentWillUnmount(){
this.unsubscribeFromAuth();
}





  render (){
  return (
    <div>
      <Header currentUser={this.state.currentUser}/> {/*Putting the header menu before the switch makes the header visible no matter what page we want to show */}
      <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/shop" component={ShopPage}/>
      <Route exact path="/signin" component={SignInAndSignUpPage}/>
      </Switch>
      
    </div>
  );
}

}
export default App;
