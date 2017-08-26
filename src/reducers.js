import * as actions from './actions';

const initialState = {
  results: []
};

export default function rootReducer(state = initialState, action) {
  //
  // parse the response from neo4j
  //
  function parseResponse(responseData) {
    const graph = {
      nodes: [],
      links: []
    };
    const nodeHash = {};

    console.log('responseData from parseResponse', responseData);
    const graphData = responseData.results[0].data;
    graphData.forEach(inputLink => {
      const source = inputLink.row[0].gistId;
      const target = inputLink.row[1].gistId;
      if (typeof source !== 'undefined' && typeof target !== 'undefined') {
        // collect the nodes in a set
        // which builds up a list of unique nodes
        inputLink.row.forEach(inputNode => {
          nodeHash[inputNode.gistId] = {
            id: inputNode.gistId,
            createdAt: inputNode.createdAt,
            description: inputNode.description,
            updatedAt: inputNode.updatedAt,
            user: inputNode.user
          };
        });
        // assume that the inputLink rows
        // are in [source, target] format
        // TODO: check the neo4j REST API docs
        // to verify this
        graph.links.push({
          source,
          target,
          weight: 1 // for jsLouvain community detection
        });
      }
    });

    // add the unique nodes that we've collected
    // onto our graph object
    Object.keys(nodeHash).forEach(key => {
      graph.nodes.push(nodeHash[key]);
    });
    return graph;
  }
  switch (action.type) {
    case actions.REQUEST_GRAPH_SEARCH:
      return {
        ...state,
        query: action.query,
        // query: { ...state.query, ...action.query },
        results: [],
        loading: true
      };
    case actions.RECEIVE_GRAPH_SEARCH:
      console.log(
        'action.data from rootReduce RECEIVE_GRAPH_SEARCH',
        action.data
      );
      return {
        ...state,
        loading: false,
        results: parseResponse(action.data)
      };
    default:
      return state;
  }
}
