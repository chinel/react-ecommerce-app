import React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Route } from "react-router-dom";
import {createStructuredSelector} from 'reselect';
import CollectionPage from "../collection/collection.component";
import { connect} from 'react-redux';
import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching,  selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component'

const CollectionsOverviewWithSpinner  = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

  componentDidMount (){
  const {fetchCollectionsStartAsync} = this.props;
  fetchCollectionsStartAsync();

  }



  render() {
    const { match, isCollectionFetching, isCollectionsLoaded} = this.props;
    
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props) =><CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />}/>
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props}/>}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded : selectIsCollectionLoaded
})

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
