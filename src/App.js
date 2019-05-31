import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import Requests from './Requests';
import Notifications from './Notifications';
import { addRequest } from './store/requests/actions';
import { addNotification } from './store/notifications/actions';

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func
  };

  state = {
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
    const { dispatch } = this.props;
    const { clef } = this;
    const { grid } = window;
    const { getPendingRequests, getPendingNotifications } = clef.plugin.config;
    const requests = getPendingRequests();
    requests.forEach(request => {
      dispatch(addRequest(request, grid));
    });
    const notifications = getPendingNotifications();
    notifications.forEach(notification => {
      dispatch(addNotification(notification, grid));
    });
  };

  addListeners = () => {
    const { dispatch } = this.props;
    const { clef } = this;
    const { grid } = window;
    clef.on('newState', state => {
      this.setState({ pluginState: state });
    });
    clef.on('pluginRequest', request => {
      dispatch(addRequest(request, grid));
    });
    clef.on('pluginNotification', notification => {
      dispatch(addNotification(notification, grid));
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
        <div className="App-header">
          <h1>Grid Clef Client</h1>
          <h2>PLUGIN: {pluginState}</h2>
        </div>
        <Notifications clef={this.clef} />
        <Requests clef={this.clef} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(App);
