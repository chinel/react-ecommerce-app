import cartActionTypes  from "./cart-types";
import { addItemToCart, removeItemFromCart } from "./cart.utils";

const INITIAL_STATE = {
    hidden: false,
    cartItems: []
}


const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case cartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case cartActionTypes.ADD_ITEM:
        return{
           ...state,
           cartItems: addItemToCart(state.cartItems, action.payload)//[...state.cartItems, action.payload] //here we keep our old cart items and just add the new item to the array
        }
        case cartActionTypes.CLEAR_ITEM_FROM_CART:
            return{
                ...state,
                cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
            }
        case cartActionTypes.REMOVE_ITEM:
             return{
                 ...state,
                 cartItems: removeItemFromCart(state.cartItems, action.payload)
             } 
        case cartActionTypes.CLEAR_CART:
            return{
                ...state,
                cartItems:[]
            }
        default:
            return state;
    }
}

export default cartReducer;