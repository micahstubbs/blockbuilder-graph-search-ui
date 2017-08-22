export const REQUEST_GRAPH_SEARCH = 'REQUEST_GRAPH_SEARCH';
export const RECEIVE_GRAPH_SEARCH = 'RECEIVE_GRAPH_SEARCH';

//
// make the request to neo4j for the data
//
export const getGraphSearch = query => {
  return dispatch => {
    dispatch(requestGraphSearch(query));
    const url = 'http://localhost:7474/db/data/transaction/commit';
    const requestData = JSON.stringify({
      statements: [
        {
          statement: query
        }
      ]
    });
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Basic bmVvNGo6YWRtaW4=');
    myHeaders.append('Accept', 'application/json; charset=UTF-8');
    const myInit = {
      method: 'POST',
      body: requestData,
      headers: myHeaders
    };
    const myRequest = new Request(url, myInit);
    fetch(myRequest)
      .then(response => response.json())
      .then(data => receiveGraphSearch(data))
      .catch(e => {
        console.log(e);
      });
  };
}

function requestGraphSearch(query) {
  return {
    type: REQUEST_GRAPH_SEARCH,
    query
  };
}

function receiveGraphSearch(data) {
  return {
    type: RECEIVE_GRAPH_SEARCH,
    data
  };
}
