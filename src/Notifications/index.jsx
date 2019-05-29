import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notification from './Notification';

class Notifications extends Component {
  static propTypes = {
    notifications: PropTypes.array
  };

  onDismiss = index => {
    console.log('dismiss notification', index);
  };

  render() {
    const { notifications } = this.props;
    const renderNotifications = [];
    notifications.forEach((notification, index) => {
      console.log(notification);
      const { method } = notification;
      const type = method.includes('error') ? 'error' : 'info';
      let { text } = notification.params[0];
      if (method === 'ui_onSignerStartup') {
        const { info } = notification.params[0];
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
      const renderNotification = (
        <Notification
          key={index}
          type={type}
          message={text}
          onDismiss={() => {
            this.onDismiss(index);
          }}
        />
      );
      renderNotifications.push(renderNotification);
    });

    return <div>{renderNotifications}</div>;
  }
}

export default Notifications;
