import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Notification from './Notification';
import { clearNotification } from '../store/notifications/actions';

class Notifications extends Component {
  static propTypes = {
    notifications: PropTypes.array,
    dispatch: PropTypes.func,
    clef: PropTypes.object
  };

  onDismiss = (index, notification) => {
    const { dispatch, clef } = this.props;
    dispatch(clearNotification(index, notification, clef));
  };

  render() {
    const { notifications } = this.props;
    const renderNotifications = [];
    notifications.forEach((notification, index) => {
      const { type, text } = notification;
      const renderNotification = (
        <Notification
          key={index}
          type={type}
          message={text}
          onDismiss={() => {
            this.onDismiss(index, notification);
          }}
        />
      );
      renderNotifications.push(renderNotification);
    });

    return <div>{renderNotifications}</div>;
  }
}

function mapStateToProps(state) {
  return {
    notifications: state.notifications.notifications
  };
}

export default connect(mapStateToProps)(Notifications);
