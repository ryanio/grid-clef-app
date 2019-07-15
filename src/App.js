import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import './App.css';
import Requests from './Requests';
import Notifications from './Notifications';
import { addRequest } from './store/requests/actions';
import { addNotification } from './store/notifications/actions';
import { chainIdToNetwork } from './lib/utils';
import Clef from './store/clefService';

const requestMethods = [
  'ui_approveTx',
  'ui_approveSignData',
  'ui_approveListing',
  'ui_approveNewAccount',
  'ui_onInputRequired'
];

const notificationMethods = [
  'ui_showInfo',
  'ui_showError',
  'ui_onApprovedTx',
  'ui_onSignerStartup'
];

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func
  };

  state = {
    pluginState: null,
    chainId: null
  };

  componentDidMount = async () => {
    const clef = await window.grid.getClient('clef');
    this.clef = clef;
    const pluginState = clef.getState();
    this.setState({ pluginState });
    this.getQueue();
    this.getChainId();
    this.addListeners();
  };

  compnentWillUnmount = () => {
    this.removeListeners();
  };

  addPayload = payload => {
    const { dispatch } = this.props;
    const { grid } = window;
    const { method } = payload;
    if (!method) {
      return;
    }
    if (requestMethods.includes(method)) {
      dispatch(addRequest(payload, grid));
    } else if (notificationMethods.includes(method)) {
      dispatch(addNotification(payload, grid));
    } else {
      console.error('Unsupported clef method: ', method, payload);
    }
  };

  getQueue = () => {
    const { clef } = this;
    const { getQueue } = clef.api;
    const payloads = getQueue();
    payloads.forEach(payload => {
      this.addPayload(payload);
    });
  };

  getChainId = async () => {
    const { clef } = this;
    const chainId = await Clef.getChainId(clef);
    this.setState({ chainId });
  };

  addListeners = () => {
    const { clef } = this;
    clef.on('newState', state => {
      this.setState({ pluginState: state });
      if (state === 'connected') {
        this.getChainId();
      }
    });
    clef.on('pluginData', payload => {
      this.addPayload(payload);
    });
  };

  removeListeners = () => {
    const clef = this.clef;
    clef.removeAllListeners('pluginData');
    clef.removeAllListeners('newState');
  };

  renderChainId = () => {
    const { chainId } = this.state;
    const network = chainIdToNetwork(chainId);
    let render = (
      <Tooltip
        placement="top"
        title="Please verify this Chain ID is accurate or your signed requests will not be valid."
      >
        <div className="chain-id">
          Chain ID: <strong>{chainId ? chainId : 'unknown'}</strong>{' '}
          {network && <span className="network">({network} Network)</span>}
        </div>
      </Tooltip>
    );
    return render;
  };

  render() {
    const { pluginState } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <h1>Grid Clef Client</h1>
          <h2>PLUGIN: {pluginState}</h2>
        </div>
        {pluginState === 'connected' && this.renderChainId()}
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
