import React from 'react';
import {connect} from 'react-redux';


import {ReactComponent as ShoppingIcon} from '../../assets/11.2 shopping-bag.svg';
import "./cart-icon.styles.scss";
import { toggleCartHidden } from '../../redux/cart/cart.actions';

//We are destructuring toggleCartHidden off our properties
const CartIcon = ({toggleCartHidden}) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
       <ShoppingIcon className="shopping-icon"/>
       <span className="item-count">0</span>
    </div>
)


//this gets a dispatch and we would call it toggleCartHidden
//this will just be a function that triggers the dispatch of toggleCartHidden Action method from the cart action
const mapDispatchToProps = (dispatch) => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default connect(null, mapDispatchToProps)(CartIcon);

