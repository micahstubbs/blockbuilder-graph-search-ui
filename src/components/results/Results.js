import React, { Component } from 'react';
import drawGraphVisSlippyCanvas from './drawGraphVisSlippyCanvas/drawGraphVisSlippyCanvas';

export default class Results extends Component {
  componentDidUpdate() {
    const { results } = this.props;
    if (results && typeof results.nodes !== 'undefined') {
      drawGraphVisSlippyCanvas(results);
    }
    const htmlCanvas = document.getElementById('c');
    const context = htmlCanvas.getContext('2d');

    initialize();

    function initialize() {
      // Register an event listener to call the resizeCanvas() function
      // each time the window is resized
      window.addEventListener('resize', resizeCanvas, false);
      // Draw canvas border for the first time
      resizeCanvas();
    }

    function redraw() {
      context.strokeStyle = 'white';
      context.lineWidth = '5';
      context.strokeRect(0,0, window.innerWidth, window.innerHeight);
    }

    function resizeCanvas() {
      htmlCanvas.width = window.innerWidth;
      htmlCanvas.height = window.innerHeight;
      redraw();
    }
  }

  render() {
    const { layout } = this.props;
    console.log('this.props from Results', this.props);
    return (
      <a target="_blank" style={{ outline: 'none' }}>
        <div id="canvas-container">
          <div />
          <canvas
            id="c"
            style={{position:'absolute', left:'0px', top:'100px'}}
            width="1255"
            height="600"
            className={layout}
          >
            Your browser does not support canvas
          </canvas>
        </div>
      </a>
    );
  }
}
