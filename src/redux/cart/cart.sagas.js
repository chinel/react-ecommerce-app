import { all,call,takeLatest, put } from 'redux-saga/effects';
import userActionTypes from '../user/user.types';

import { clearCart } from './cart.actions';


export function* clearCartOnSignout(){
    yield put(clearCart());
    
}


export function* onSignOutSucess(){
    yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS,clearCartOnSignout)
}

export function* cartSagas(){
    yield all([
        call(onSignOutSucess)
    ])
}