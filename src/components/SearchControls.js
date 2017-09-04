import React from 'react';

export default class SearchControls extends React.Component {
  gridClick() {
    const { dispatchRenderGridLayout } = this.props;
    dispatchRenderGridLayout();
  }

  render() {
    return (
      <div className="layout">
        <button id="grid-force-button" onClick={this.gridClick.bind(this)}>
          grid force
        </button>
        <button id="bounded-force-button">bounded force</button>
      </div>
    );
  }
}
