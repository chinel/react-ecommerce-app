export const addItemToCart = (cartItems, cartItemToAdd) => {
    console.log(cartItems);
    console.log(cartItemToAdd);

    //this checks if the cartItems has an 
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    if(existingCartItem){
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id ? {...cartItem, quantity: cartItem.quantity +1} : cartItem)
    }

    return [...cartItems, {...cartItemToAdd, quantity: 1}]
}