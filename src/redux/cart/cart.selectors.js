import { createSelector } from "reselect";

//There are actually two types of selectors we can write
//1 - An input selector that does not use create selector
//2 - Output selector - which uses both input and createSelector to build itself

//When creating selectors they usually follow a popular naming convention that starts with select or get
//Although you are free to use whatever naming convention you like


//this input selector takes the entire state and returns a slice of it which is the cart
const selectCart = state => state.cart;


//The first argument of createSelector is an array of input selectors
//The second argument is a funtion that will return the value we want out of the selector
//What we will get as its parameter is each output of the input selectors in the array but in the order of the input selector was written
export const selectCartItems = createSelector(
[selectCart],
(cart) => cart.cartItems
)


export const selectCartHidden  = createSelector(
    [selectCart],
    (cart) => cart.hidden
)


export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
)


export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity * cartItem.price, 0)


)
