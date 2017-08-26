import React from 'react';
import QueryForm from './QueryForm';

export default function SearchBar(props) {
  return (
    <div className="controls">
      <QueryForm
        defaultQuery={props.defaultQuery}
        getGraphSearch={props.getGraphSearch}
      />
      <div className="layout">
        <button id="grid-force-button">grid force</button>
        <button id="bounded-force-button">bounded force</button>
      </div>
    </div>
  );
}
