import { requestDone } from './requests/actions';
// import { updateConfigValue } from '../client/actions';
// import { chainIdToNetwork } from '../../lib/utils';

class ClefService {
  send(clef, dispatch, method, params = [], id, result) {
    const payload = { jsonrpc: '2.0', id };
    if (result) {
      payload.result = result;
    } else {
      payload.method = method;
      payload.params = params;
    }
    clef.write(payload);
    if (id) {
      dispatch(requestDone(id));
    }
  }

  updateChainId(grid, dispatch, getState, chainId) {
    const method = 'clef_setChainId';
    const params = [chainId];
    this.send(dispatch, method, params);
    // dispatch(updateConfigValue('clef', 'chainId', chainId));
    // const networkName = chainIdToNetwork(chainId);
    // grid.notify(
    //   'Clef: Network Updated',
    //   `Set to ${networkName} (chain ID: ${chainId})`
    // );
  }

  notifyRequest(grid, request) {
    const title = 'Clef Signer';
    let body = 'New Request';
    switch (request.method) {
      case 'ui_onInputRequired': {
        const {
          title: requestTitle,
          prompt: requestPrompt
        } = request.params[0];
        body = `${requestTitle}: ${requestPrompt}`;
        break;
      }
      case 'ui_approveTx':
        body = 'New Transaction Request';
        break;
      case 'ui_approveSignData':
        body = 'New Sign Data Request';
        break;
      case 'ui_approveNewAccount':
        body = 'New Account Request';
        break;
      case 'ui_approveListing':
        body = 'New Account Listing Request';
        break;
      default:
        break;
    }
    grid.notify(title, body);
  }

  notifyNotification(grid, notification) {
    const title = 'Clef Signer';
    const body = notification.text;
    grid.notify(title, body);
  }
}

export default new ClefService();
