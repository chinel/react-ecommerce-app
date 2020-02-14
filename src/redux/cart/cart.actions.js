import cartActionTypes from './cart-types';


//Here we do not need a payload or any parameter passed 
export const toggleCartHidden = () => ({
type: cartActionTypes.TOGGLE_CART_HIDDEN
})

export const addItem = (item) => ({
    type: cartActionTypes.ADD_ITEM,
    payload:item
})