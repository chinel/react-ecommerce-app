import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'

import storage from 'redux-persist/lib/storage';

import userReducer from '../redux/user/user-reducer';
import cartReducer from './cart/cart-reducer';


const persistConfig = {
    key: 'root', //this is to state which reducer we want to persist,
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
});


export default persistReducer(persistConfig, rootReducer);