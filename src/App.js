import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shopPage/shop.component';
import Header from './components/header/header.component';





function App() {
  return (
    <div>
      <Header/> {/*Putting the header menu before the switch makes the header visible no matter what page we want to show */}
      <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/shop" component={ShopPage}/>
      </Switch>
      
    </div>
  );
}

export default App;
