import Clef from '../clefService';

export const addNotification = notification => {
  Clef.notifyNotification(notification);
  return {
    type: 'NOTIFICATIONS:ADD',
    payload: { notification }
  };
};

export const clearNotification = index => {
  return {
    type: 'NOTIFICATIONS:CLEAR',
    payload: { index }
  };
};

export const onNotification = (data, client, dispatch) => {
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
  const notification = { type, text, info, client: client.name };
  dispatch(addNotification(notification));
};

export function clearNotifications(client) {
  return async (dispatch, getState) => {
    const notifications = getState().notifications.filter(
      n => n.client === client.name
    );
    if (notifications.length === 0) {
      return;
    }
    dispatch({
      type: 'NOTIFICATIONS:CLEAR_ALL',
      payload: { clientName: client.name }
    });
  };
}
