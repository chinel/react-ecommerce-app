import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect} from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shopPage/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument, addCollectionAndDocuments } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import CheckoutPage from "./pages/checkout/checkout.component";
import { selectCollectionForPreview } from './redux/shop/shop.selectors';

class App extends Component {
  

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, /* collectionArray */ } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      } else {
        /* addCollectionAndDocuments('collections', collectionArray.map(({title, items}) => ({title, items})) ) this was added to enable us to feed the shop data array into firestore one time */
        setCurrentUser(userAuth);
      }
    });
  }

  //this will help to close the open firebase auth whenever the component is to be unmounted
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />{" "}
        {/*Putting the header menu before the switch makes the header visible no matter what page we want to show */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route  path="/shop" component={ShopPage} />
          <Route exact path="/signin" render={() => this.props.currentUser ? <Redirect to="/"/> : <SignInAndSignUpPage/>} />
           <Route exact path="/checkout" component={CheckoutPage}/>
        </Switch>
      </div>
    );
  }
}


//Here we destructured our user off the state
const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  collectionArray: selectCollectionForPreview
})


const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

//If the App component does not need the mapStateToProps,which gives us access to the current user from the root reducer, so we set it to null
export default connect(mapStateToProps, mapDispatchToProps)(App);
