import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import './App.css';
import GraphSearch from './GraphSearch';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <GraphSearch />
      </Provider>
    );
  }
}

export default App;
