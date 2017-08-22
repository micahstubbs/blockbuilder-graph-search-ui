import * as actions from './actions';

const initialState = {
  results: []
}

export default function rootReduce(state = initialState, action) {
  switch (action.type) {
    case actions.REQUEST_GRAPH_SEARCH:
      return {
        ...state,
        query: { ...state.query, ...action.query },
        results: [],
        loading: true
      }
    case actions.RECEIVE_GRAPH_SEARCH:
      return {
        ...state,
        loading: false,
        results: action.data
      }
    default: 
      return state;
  }
}