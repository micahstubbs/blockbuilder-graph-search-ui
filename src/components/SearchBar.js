import React from 'react';

export default function SearchBar(props) {
  return (
    <div className="controls">
      <div className="query">
        <form id="query-form" method="post">
          <textarea
            id="query-textarea"
            name="Text1"
            cols="200"
            rows="5"
            autoComplete="on"
            autoFocus="true"
            spellCheck="false"
            defaultValue={props.defaultQuery}
          />
          <input type="submit" value="Search the Graph" />
        </form>
      </div>
      <div className="layout">
        <button id="grid-force-button">grid force</button>
        <button id="bounded-force-button">bounded force</button>
      </div>
    </div>
  );
}
