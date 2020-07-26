import React, { Component, useEffect, lazy, Suspense } from "react";
import { Route, Switch, Redirect} from "react-router-dom";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument, addCollectionAndDocuments } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { selectCollectionForPreview } from './redux/shop/shop.selectors';
import { checkUserSession } from './redux/user/user.actions';
import {GlobalStyle} from "./global.styles";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shopPage/shop.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));


const App = ({checkUserSession, currentUser}) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession])


  // componentDidMount() {
  //   const {checkUserSession} = this.props;
  //   checkUserSession();
   // const { setCurrentUser, /* collectionArray */ } = this.props;
    /* this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      } else {
        // addCollectionAndDocuments('collections', collectionArray.map(({title, items}) => ({title, items})) ) this was added to enable us to feed the shop data array into firestore one time 
        setCurrentUser(userAuth);
      }
    }); */
 // }

  //this will help to close the open firebase auth whenever the component is to be unmounted
 /*  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
 */

    return (
      <div>
          <GlobalStyle/>
        <Header />{" "}
        {/*Putting the header menu before the switch makes the header visible no matter what page we want to show */}
        <Switch>
            <ErrorBoundary>
           <Suspense fallback={<Spinner/>}>
          <Route exact path="/" component={HomePage} />
               <Route  path="/shop" component={ShopPage} />
               <Route exact path="/signin" render={() => currentUser ? <Redirect to="/"/> : <SignInAndSignUpPage/>} />
               <Route exact path="/checkout" component={CheckoutPage}/>
           </Suspense>
            </ErrorBoundary>
        </Switch>
      </div>
    );
  }



//Here we destructured our user off the state
const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  collectionArray: selectCollectionForPreview
})

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
})

//If the App component does not need the mapStateToProps,which gives us access to the current user from the root reducer, so we set it to null
export default connect(mapStateToProps, mapDispatchToProps)(App);
