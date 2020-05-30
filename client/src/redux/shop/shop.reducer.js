import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
    collections: null,
    isFetching: false,
    errorMessage: undefined
}

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

      case ShopActionTypes.FETCH_COLLECTIONS_START:
        return{
          isFetching: true
        } 
      case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
         return {
            ...state,
            collections: action.payload,
            isFetching: false
         }
      case ShopActionTypes.FETCH_COLLECTIONS_ERROR:
        return{
          isFetching: false,
          errorMessage: action.payload
        }   
      default:
          return state;
  }

}

export default shopReducer;