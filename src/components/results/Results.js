import React, { Component } from 'react';
import drawGraphVisGrid from './drawGraphVisGrid';
import drawGraphVisBoundedForce from './drawGraphVisBoundedForce';
import drawGraphVisSlippyCanvas from './drawGraphVisSlippyCanvas/drawGraphVisSlippyCanvas';

export default class Results extends Component {
  componentDidUpdate() {
    const { results, layout } = this.props;
    if (results && typeof results.nodes !== 'undefined') {
      switch (layout) {
        case 'grid':
          drawGraphVisGrid(results);
          break;
        case 'boundedForce':
          drawGraphVisBoundedForce(results);
          break;
        case 'slippyCanvas': 
          drawGraphVisSlippyCanvas(results);
          break;
        default:
          drawGraphVisSlippyCanvas(results);
      }
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
