import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'

import storage from 'redux-persist/lib/storage';

import userReducer from '../redux/user/user-reducer';
import cartReducer from './cart/cart-reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';


const persistConfig = {
    key: 'root', //this is to state which reducer we want to persist,
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop:shopReducer
});


export default persistReducer(persistConfig, rootReducer);