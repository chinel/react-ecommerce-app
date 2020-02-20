import { createSelector } from 'reselect';

const COLLECTION_ID_MAP ={
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    men: 5
}


const selectShop = state => state.shop;


export const selectCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
)

export const selectCollectionForPreview = createSelector(
    [selectCollections],
    (collections) => Object.keys(collections).map(key => collections[key])//this will help us convert our collections object to an array of collection items
)

export const selectCollection = collectionUrlParam => createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
)

