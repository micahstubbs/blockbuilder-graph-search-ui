import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import root from './reducers.js';

const composeEnhancers = composeWithDevTools({
  shouldRecordChanges: true,
  features: {
    persist: true,
  }
});

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(thunk))(createStore);

export default createStoreWithMiddleware(root);
