import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo} from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';

import "./header.styles.scss";
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const Header = ({currentUser, hidden}) => (
<div className="header">
    <Link className="logo-container" to="/">
     <Logo className="logo"/>
    </Link>
    <div className="options">
    <Link className="option" to="/shop">SHOP</Link>
    <Link className="option" to="/shop">CONTACT</Link>
    {currentUser ? <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div> : <Link className="option" to="/signin">SIGN IN</Link>}
    <CartIcon/>
    </div>
    {hidden && <CartDropdown/> }
</div>
)


//To destructure  nested values of our state for instance
//There are other reducers we would also want to get other reducers props as well



const mapStateToProps = ({user:{currentUser}, cart:{hidden}}) => ({
    currentUser,
    hidden
})

export default connect(mapStateToProps)(Header);