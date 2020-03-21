import {  takeLatest, put, call,all} from 'redux-saga/effects';
import  userActionTypes  from "./user.types";
import { auth,googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils';
import {  googleSignInSuccess, googleSignInError} from './user.actions';


export function* signInWithGoogle() {
    try {
         const {user} = yield auth.signInWithPopup(googleProvider);
         const userRef = yield call(createUserProfileDocument, user);
         const userSnapshot = yield userRef.get(); 
         yield put(googleSignInSuccess({
             id: userSnapshot.id,
             ...userSnapshot.data()
         }))
    } catch (error) {
        yield put(googleSignInError(error.message));
    }
}

export function* googleSignInStart() {
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START,signInWithGoogle);
}

//here we created a single saga function to call out other saga functions so we do just have one call in the root saga file
export function* userSagas(){
 yield all([call(googleSignInStart)])
}