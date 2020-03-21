import {  takeLatest, put, call,all} from 'redux-saga/effects';
import  userActionTypes  from "./user.types";
import { auth,googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils';
import {  SignInSuccess, SignInError} from './user.actions';


export function* getSnapshotFromUserAuth(userAuth){
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get(); 
    yield put(SignInSuccess({
        id: userSnapshot.id,
        ...userSnapshot.data()
    }))
}

export function* signInWithGoogle() {
    try {
         const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(SignInError(error.message));
    }
}

export function* signInWithEmail({payload:{email, password}}){
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user)
    } catch (error) {
        yield put(SignInError(error.message))
    }
}

export function* googleSignInStart() {
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START,signInWithGoogle);
}

export function* emailSignInStart() {
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START,signInWithEmail);
}

//here we created a single saga function to call out other saga functions so we do just have one call in the root saga file
export function* userSagas(){
 yield all([call(googleSignInStart),
    call(emailSignInStart)    
  ])
}