import React, { Component } from 'react';
import SearchBar from '../components/SearchBar';
import Results from '../components/Results';

class GraphSearch extends Component {
  render() {
    return (
      <div>
      <SearchBar defaultQuery="MATCH(n)-[:LINKS_TO]-(m) WHERE n.user =~ '.*enjalot.*'RETURN n, m" />
      <Results/>
      </div>
    );
  }
}

export default GraphSearch;
