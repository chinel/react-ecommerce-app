 import React from 'react';
 import './collection.styles.scss';
 import { connect }   from 'react-redux';
 import { createStructuredSelector } from 'reselect';
 import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectCollection } from '../../redux/shop/shop.selectors';



//here if we want to use the match  props inside of the component  we can now destructure it by passing along side the collection
 const CollectionPage = ({collection}) => {
 console.log(collection);
    return(
     <div className="collection-page">
         <h1>Collection Page</h1>
         
     </div>
 )
}


const mapStateToProps = (state, ownProps) => ({ collection: selectCollection(ownProps.match.params.collectionId)(state)})// here we needed to pass the state because this selector unlike other selectors will need to get path of the state based on the url parameter passed

 export default connect(mapStateToProps)(CollectionPage);