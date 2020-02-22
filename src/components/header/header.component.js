import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo} from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';

import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv} from './header.styles.js';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';


const Header = ({currentUser, hidden}) => (
<HeaderContainer>
    <LogoContainer to="/">
     <Logo className="logo"/>
    </LogoContainer>
    <OptionsContainer>
    <OptionLink to="/shop">SHOP</OptionLink>
    <OptionLink to="/shop">CONTACT</OptionLink>
    {currentUser ? <OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv> : <OptionLink to="/signin">SIGN IN</OptionLink>}
    <CartIcon/>
    </OptionsContainer>
    {hidden && <CartDropdown/> }
</HeaderContainer>
)


//To destructure  nested values of our state for instance
//There are other reducers we would also want to get other reducers props as well



const mapStateToProps = createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);