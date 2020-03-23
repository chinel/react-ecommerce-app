import  userActionTypes  from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    error: null
}


const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SIGN_IN_SUCCESS:  
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
        case userActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            }    
        case userActionTypes.SIGN_IN_ERROR: 
        case userActionTypes.SIGN_OUT_ERROR: 
        case userActionTypes.SIGN_UP_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
            
    }
}


export default userReducer;