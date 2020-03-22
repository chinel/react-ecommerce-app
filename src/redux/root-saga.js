import { all, call } from 'redux-saga/effects';
import { shopSagas } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';
import { cartSagas } from './cart/cart.sagas';


export default function*  rootSaga() {
    yield all([
        call(shopSagas), // just invoking the saga without using the call effect like this fetchCollectionStart()
        call(userSagas),
        call(cartSagas)
     ])
}