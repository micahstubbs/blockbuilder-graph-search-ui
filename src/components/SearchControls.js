import React from 'react';

export default class SearchControls extends React.Component {
  render() {
    const { results } = this.props;
    let resultsIcon = '';
    let resultsText = '';
    if (
      typeof results !== 'undefined' &&
      typeof results.nodes !== 'undefined'
    ) {
      const { nodes, links } = results;

      if (nodes.length > 0) {
        resultsText = `🔎 found ${nodes.length} nodes and ${links.length} links`;
      }
    }
    return (
      <div>
        <div className="results-text">{resultsText}</div>
      </div>
    );
  }
}
