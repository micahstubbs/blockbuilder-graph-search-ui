import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGraphSearch } from '../actions';
import SearchBar from '../components/SearchBar';
import Results from '../components/Results';


class GraphSearch extends Component {
  render() {
    console.log('this.props from GraphSearch', this.props);
    return (
      <div>
        <SearchBar
          defaultQuery="MATCH(n)-[:LINKS_TO]-(m) WHERE n.user =~ '.*enjalot.*'RETURN n, m"
          getGraphSearch={this.props.getGraphSearch}
        />
        <Results results={this.props.results} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    query: state.query,
    results: state.results,
    loading: state.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getGraphSearch: query => dispatch(getGraphSearch(query))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GraphSearch);
