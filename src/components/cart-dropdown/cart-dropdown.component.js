import React from 'react';

import './cart-dropdown.styles.scss';
import {connect} from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-items/cart-items.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';

const CartDropdown = ({ cartItems}) => (
    <div className="cart-dropdown">
       <div className="cart-items">
           {
               cartItems.length ?
               cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>)
               : <span className="empty-message">Your cart is empty</span>
           }
       </div>
       <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
)


const mapStateToProps = createStructuredSelector ({
  cartItems: selectCartItems
})

export default connect(mapStateToProps)(CartDropdown);