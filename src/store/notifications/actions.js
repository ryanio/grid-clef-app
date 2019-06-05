import Clef from '../clefService';

export const addNotification = (data, grid) => {
  const notification = formatNotification(data);
  Clef.notifyNotification(notification, grid);
  return {
    type: 'NOTIFICATIONS:ADD',
    payload: { notification }
  };
};

export const clearNotification = (index, clef) => {
  clef.api.removePendingNotification(index);
  return {
    type: 'NOTIFICATIONS:CLEAR',
    payload: { index }
  };
};

const formatNotification = (data, dispatch) => {
  const type = data.method === 'ui_showError' ? 'error' : 'info';
  let { text } = data.params[0];
  const { info } = data.params[0];
  if (data.method === 'ui_onSignerStartup') {
    const httpAddress = info.extapi_http;
    const ipcAddress = info.extapi_ipc;
    text = 'Clef signer started on';
    if (httpAddress !== 'n/a') {
      text += ` ${httpAddress}`;
    }
    if (ipcAddress !== 'n/a') {
      text += ` ${ipcAddress}`;
    }
  }
  const notification = { type, text, info };
  return notification;
};

export function clearNotifications() {
  return async (dispatch, getState) => {
    dispatch({
      type: 'NOTIFICATIONS:CLEAR_ALL'
    });
  };
}
