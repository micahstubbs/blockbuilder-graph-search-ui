import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getGraphSearch,
  dispatchRenderGridLayout,
  dispatchRenderBoundedForceLayout,
  dispatchRenderSlippyCanvasLayout
} from '../actions';
import SearchBar from '../components/SearchBar';
import Results from '../components/results/Results';
import { defaultQuery } from '../defaultQuery';

class GraphSearch extends Component {
  constructor() {
    super();
    const paramsString = window.location.search;
    const searchParams = new URLSearchParams(paramsString);
    const gistId = searchParams.get('gist_id');
    let currentQuery = defaultQuery;
    if (gistId !== null) {
      currentQuery = `${defaultQuery.slice(0, 45)}${gistId}${defaultQuery.slice(
        65
      )}`;
      console.log('currentQuery from GraphSearch', currentQuery);
    }

    this.state = {
      currentQuery
    };
  }

  render() {
    const {
      getGraphSearch,
      dispatchRenderGridLayout,
      dispatchRenderBoundedForceLayout,
      dispatchRenderSlippyCanvasLayout,
      results,
      layout,
    } = this.props;
    const { currentQuery} = this.state;
    console.log('this.props from GraphSearch', this.props);
    return (
      <div>
        <SearchBar
          defaultQuery={currentQuery}
          getGraphSearch={getGraphSearch}
          dispatchRenderGridLayout={dispatchRenderGridLayout}
          dispatchRenderBoundedForceLayout={dispatchRenderBoundedForceLayout}
          dispatchRenderSlippyCanvasLayout={dispatchRenderSlippyCanvasLayout}
        />
        <Results results={results} layout={layout} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    query: state.query,
    results: state.results,
    loading: state.loading,
    layout: state.layout
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getGraphSearch: query => dispatch(getGraphSearch(query)),
    dispatchRenderGridLayout: () => dispatch(dispatchRenderGridLayout()),
    dispatchRenderBoundedForceLayout: () =>
      dispatch(dispatchRenderBoundedForceLayout()),
    dispatchRenderSlippyCanvasLayout: () =>
      dispatch(dispatchRenderSlippyCanvasLayout())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GraphSearch);
