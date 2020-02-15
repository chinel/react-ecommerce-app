import React from 'react';
import {connect} from 'react-redux';


import {ReactComponent as ShoppingIcon} from '../../assets/11.2 shopping-bag.svg';
import "./cart-icon.styles.scss";
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

//We are destructuring toggleCartHidden off our properties
const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
       <ShoppingIcon className="shopping-icon"/>
<span className="item-count">{itemCount}</span>
    </div>
)


//this gets a dispatch and we would call it toggleCartHidden
//this will just be a function that triggers the dispatch of toggleCartHidden Action method from the cart action
const mapDispatchToProps = (dispatch) => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = (state/*{cart:{cartItems}}*/) => ({
    //Note: reduce javascript function allows us to reduce an array to a single value and here we also want to accumulate all the quantity values in the cart items array
    itemCount: selectCartItemsCount(state) //cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0) //here we passed in 0 as the initial accumulated value
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

