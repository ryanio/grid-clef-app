import React, { Component } from 'react';
import './App.css';
import Requests from './Requests';
import Notifications from './Notifications';
import { onRequest } from './store/requests/actions';
import { onNotification } from './store/notifications/actions';

class App extends Component {
  state = {
    requests: [],
    notifications: [],
    pluginState: null
  };

  componentDidMount = async () => {
    const clef = await window.grid.getClient('clef');
    this.clef = clef;
    this.setState({ pluginState: clef.state });
    this.getPending();
    this.addListeners();
  };

  compnentWillUnmount = () => {
    this.removeListeners();
  };

  getPending = () => {
    const clef = this.clef;
    const { getPendingRequests, getPendingNotifications } = clef.plugin.config;
    const requests = getPendingRequests();
    requests.forEach(request => {
      onRequest(request);
    });
    const notifications = getPendingNotifications();
    notifications.forEach(notifications => {
      onNotification(notifications);
    });
  };

  addListeners = () => {
    const clef = this.clef;
    clef.on('newState', state => {
      this.setState({ pluginState: state });
    });
    clef.on('pluginRequest', request => {
      onRequest(request);
    });
    clef.on('pluginNotification', notification => {
      onNotification(notification);
    });
  };

  removeListeners = () => {
    const clef = this.clef;
    clef.removeAllListeners('pluginRequest');
    clef.removeAllListeners('pluginNotification');
    clef.removeAllListeners('newState');
  };

  startPlugin = () => {
    const clef = this.clef;
    clef.start();
  };

  render() {
    const { pluginState } = this.state;
    return (
      <div className="App" style={{ maxWidth: '90%', margin: 'auto' }}>
        <h1>Grid Clef Client</h1>
        <h2
          style={{
            textTransform: 'uppercase',
            color: '#444',
            fontSize: '1em'
          }}
        >
          PLUGIN: {pluginState}
        </h2>
        <Notifications clearNotification={this.clearNotification} />
        <Requests clef={this.clef} />
      </div>
    );
  }
}

export default App;
