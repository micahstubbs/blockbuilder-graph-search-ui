import React from 'react';

export default class SearchControls extends React.Component {
  gridClick() {
    const { dispatchRenderGridLayout } = this.props;
    dispatchRenderGridLayout();
  }

  boundedForceClick() {
    const { dispatchRenderBoundedForceLayout } = this.props;
    dispatchRenderBoundedForceLayout();
  }

  render() {
    return (
      <div className="layout">
        <button id="grid-force-button" onClick={this.gridClick.bind(this)}>
          grid force
        </button>
        <button
          id="bounded-force-button"
          onClick={this.boundedForceClick.bind(this)}
        >
          bounded force
        </button>
      </div>
    );
  }
}
