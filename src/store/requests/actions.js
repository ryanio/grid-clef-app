import Clef from '../clefService';

export const selectRequest = index => {
  return {
    type: 'REQUESTS:SELECT_REQUEST',
    payload: { index }
  };
};

export const addRequest = (data, grid) => {
  return async (dispatch, getState) => {
    const request = { ...data };
    Clef.notifyRequest(request, grid);
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

export const onRequest = (data, dispatch) => {
  dispatch(addRequest(data));
};

export function clearRequests() {
  return {
    type: 'REQUESTS:CLEAR'
  };
}
