import React from 'react';

export default function Results(props) {
  console.log('props.results from Results', props.results);
  return (
    <a target="_blank" style={{outline: 'none'}}>
      <div id="canvas-container">
        <div></div>
        <canvas width="960" height="960">
          Your browser does not support canvas
        </canvas>
      </div>
    </a>
  );
}
