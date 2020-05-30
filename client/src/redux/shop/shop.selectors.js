import { createSelector } from 'reselect';


const selectShop = state => state.shop;


export const selectCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
)

export const selectCollectionForPreview = createSelector(
    [selectCollections],
    (collections) => collections ? Object.keys(collections).map(key => collections[key]): [] //this will help us convert our collections object to an array of collection items 
)

export const selectCollection = collectionUrlParam => createSelector(
    [selectCollections],
    (collections) =>collections ? collections[collectionUrlParam] : null
 )


 export const selectIsCollectionFetching = createSelector(
     [selectShop],
     shop =>  shop.isFetching
 )

 export const selectIsCollectionLoaded = createSelector(
     [selectShop],
     shop => !!shop.collections
 )
