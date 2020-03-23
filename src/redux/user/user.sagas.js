import {  takeLatest, put, call,all} from 'redux-saga/effects';
import  userActionTypes  from "./user.types";
import { auth,googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import {  SignInSuccess, SignInError, signOutError, signOutSuccess, signUpError, signUpSuccess} from './user.actions';


export function* getSnapshotFromUserAuth(userAuth, additionalData){
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
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

export  function* isUserAuthenticated(){
try {
    const userAuth = yield getCurrentUser();
    if(!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth)
} catch (error) {
    yield put(SignInError(error.message));
}
}

export function* signOut() {
try {
    yield auth.signOut();
    yield put(signOutSuccess());
} catch (error) {
    yield put(signOutError(error.message));
}
}

export function* signUp({payload:{email, password, displayName}}){
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(
            email,
            password
          );
          yield put(signUpSuccess({user, additionalData:{displayName}}))
    } catch (error) {
        yield put(signUpError(error.message))
    }
}

export function* signInAfterSignUp({payload:{user, additionalData}}){
  yield  getSnapshotFromUserAuth(user, additionalData);
}


export function* googleSignInStart() {
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START,signInWithGoogle);
}

export function* emailSignInStart() {
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START,signInWithEmail);
}

export function* checkUserSession (){
    yield takeLatest(userActionTypes.CHECK_USER_SESSION,isUserAuthenticated);
}

export function* onSignOutStart (){
    yield takeLatest(userActionTypes.SIGN_OUT_START,signOut);
}

export function* onSignUpStart (){
    yield takeLatest(userActionTypes.SIGN_UP_START,signUp);
}

export function* onSignUpSuccess(){
    yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

//here we created a single saga function to call out other saga functions so we do just have one call in the root saga file
export function* userSagas(){
 yield all([call(googleSignInStart),
    call(emailSignInStart),
    call(checkUserSession), 
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ])
}