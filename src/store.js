import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import root from './reducers.js';

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk)
)(createStore);

export default createStoreWithMiddleware(root);