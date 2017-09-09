import React, { Component } from 'react';
import drawGraphVisSlippyCanvas from './drawGraphVisSlippyCanvas/drawGraphVisSlippyCanvas';

export default class Results extends Component {
  componentDidUpdate() {
    const { results } = this.props;
    if (results && typeof results.nodes !== 'undefined') {
      drawGraphVisSlippyCanvas(results);
    }
  }

  render() {
    const { layout } = this.props;
    console.log('this.props from Results', this.props);
    return (
      <a target="_blank" style={{ outline: 'none' }}>
        <div id="canvas-container">
          <div />
          <canvas width="1255" height="600" className={layout}>
            Your browser does not support canvas
          </canvas>
        </div>
      </a>
    );
  }
}
