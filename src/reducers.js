import * as actions from './actions';

const initialState = {
  results: []
}

export default function rootReducer(state = initialState, action) {
  console.log('action from rootReducer', action);
  switch (action.type) {
    case actions.REQUEST_GRAPH_SEARCH:
      return {
        ...state,
        query: action.query,
        // query: { ...state.query, ...action.query },
        results: [],
        loading: true
      }
    case actions.RECEIVE_GRAPH_SEARCH:
      console.log('action.data from rootReduce RECEIVE_GRAPH_SEARCH', action.data);
      return {
        ...state,
        loading: false,
        results: action.data
      }
    default: 
      return state;
  }
}