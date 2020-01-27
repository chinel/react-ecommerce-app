import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shopPage/shop.component';





function App() {
  return (
    <div>
      <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/shop" component={ShopPage}/>
      </Switch>
      
    </div>
  );
}

export default App;
