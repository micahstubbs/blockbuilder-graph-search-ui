import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import Results from '../components/Results';
import * as actions from '../actions';

class GraphSearch extends Component {
  handleFormSubmit(e) {
    e.preventDefault(); //to prevent form submission
    const query = document.getElementById('query-textarea').value;
    actions.getGraphSearch(query);
  }
  render() {
    console.log('this.props from GraphSearch', this.props);
    return (
      <div>
        <SearchBar
          defaultQuery="MATCH(n)-[:LINKS_TO]-(m) WHERE n.user =~ '.*enjalot.*'RETURN n, m"
          onSubmit={this.handleFormSubmit}
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
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(GraphSearch);
