export const addNotification = (data, grid) => {
  const notification = formatNotification(data);
  return {
    type: 'NOTIFICATIONS:ADD',
    payload: { notification }
  };
};

export const clearNotification = (index, notification, clef) => {
  clearNotificationInQueue(index, notification, clef);
  return {
    type: 'NOTIFICATIONS:CLEAR',
    payload: { index }
  };
};

const clearNotificationInQueue = (index, notification, clef) => {
  const queueIndex = clef.api.getQueue().findIndex(message => {
    if (message && message.params && message.params[0].text) {
      if (notification.text === message.params[0].text) {
        return true;
      }
    }
    if (
      message.method === 'ui_onSignerStartup' &&
      notification.text.includes('Clef signer started')
    ) {
      return true;
    }
    return false;
  });
  if (queueIndex > -1) {
    clef.api.removeQueue(queueIndex);
  }
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
