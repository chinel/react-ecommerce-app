import { all, call } from 'redux-saga/effects';
import { fetchCollectionStart } from './shop/shop.sagas';


export default function*  rootSaga() {
    yield all([
        call(fetchCollectionStart) // just invoking the saga without using the call effect like this fetchCollectionStart()
    ])
}