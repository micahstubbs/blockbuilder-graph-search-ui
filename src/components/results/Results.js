import React, { Component } from 'react';
import drawGraphVisGrid from './drawGraphVisGrid';
import drawGraphVisBoundedForce from './drawGraphVisBoundedForce';

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
        default:
          drawGraphVisGrid(results);
      }
    }
  }

  render() {
    console.log('this.props.results from Results', this.props.results);
    return (
      <a target="_blank" style={{ outline: 'none' }}>
        <div id="canvas-container">
          <div />
          <canvas width="960" height="960">
            Your browser does not support canvas
          </canvas>
        </div>
      </a>
    );
  }
}
