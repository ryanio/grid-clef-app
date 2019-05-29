import Clef from '../clefService';

export const selectRequest = index => {
  return {
    type: 'REQUESTS:SELECT_REQUEST',
    payload: { index }
  };
};

export const addRequest = (data, client) => {
  return async (dispatch, getState) => {
    const request = { ...data, client };
    Clef.notifyRequest(request);
    // Remove unneeded jsonrpc value
    // if (request.jsonrpc) {
    //   delete request.jsonrpc
    // }
    dispatch({
      type: 'REQUESTS:ADD_REQUEST',
      payload: { request }
    });
    const { queue } = getState().requests;
    // If request is ui_onInputRequired, priortize its selection
    if (request.method === 'ui_onInputRequired') {
      dispatch(selectRequest(queue.length - 1));
    }
  };
};

export const requestDone = id => {
  return async (dispatch, getState) => {
    const { requests } = getState();
    const { selectedIndex } = requests;
    let nextSelected = selectedIndex - 1;
    if (nextSelected < 0) {
      nextSelected = 0;
    }
    dispatch({
      type: 'REQUESTS:REQUEST_DONE',
      payload: { id, nextSelected }
    });
  };
};

export const onRequest = (data, client, dispatch) => {
  dispatch(addRequest(data, client.name));
};

export function clearRequests(client) {
  return async (dispatch, getState) => {
    const queue = getState().requests.queue.filter(
      r => r.client === client.name
    );
    if (queue.length === 0) {
      return;
    }
    dispatch({
      type: 'REQUESTS:CLEAR',
      payload: { clientName: client.name }
    });
  };
}
