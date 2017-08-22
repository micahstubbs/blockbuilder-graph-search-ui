import React, { Component } from 'react';
import drawGraphVis from './drawGraphVis';

export default class Results extends Component {
  componentDidMount() {
    if (this.props.results.length > 0) {
      drawGraphVis(this.props.results);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('prevProps from componentDidUpdate Results', prevProps);
    console.log('this.props.results from componentDidUpdate Results', this.props.results);
    if (this.props.results && typeof this.props.results.nodes !== 'undefined') {
      drawGraphVis(this.props.results);
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
