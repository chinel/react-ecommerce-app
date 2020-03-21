import  userActionTypes  from "./user.types";


export const googleSignInStart = () => ({
    type: userActionTypes.GOOGLE_SIGN_IN_START
})


export const SignInSuccess = (user) => ({
    type: userActionTypes.SIGN_IN_SUCCESS,
    payload: user
})


export const SignInError = (error) => ({
    type: userActionTypes.SIGN_IN_ERROR,
    payload: error
})

export const emailSignInStart = (emailAndPassword) => ({
    type: userActionTypes.EMAIL_SIGN_IN_START,
    payload:emailAndPassword
})


