import { requestDone } from './requests/actions';
import Web3 from 'web3';

const web3 = new Web3();
let rpcId = 0;

class ClefService {
  send(clef, dispatch, method, params = [], id, result) {
    const payload = { jsonrpc: '2.0', id };
    if (result) {
      payload.result = result;
    } else {
      payload.method = method;
      payload.params = params;
    }
    const stringifiedPayload = JSON.stringify(payload);
    clef.stdinWrite(stringifiedPayload);
    if (id) {
      dispatch(requestDone(id));
      const queueIndex = clef.api.getQueue().findIndex(i => i.id === id);
      if (queueIndex) {
        clef.api.removeQueue(queueIndex);
      }
    }
  }

  async getChainId(clef) {
    return new Promise((resolve, reject) => {
      const payload = {
        jsonrpc: '2.0',
        id: rpcId++,
        method: 'clef_chainId',
        params: []
      };
      const onData = data => {
        let payload;
        try {
          payload = JSON.parse(data);
        } catch (error) {}
        if (!payload) {
          return;
        }
        const { id } = payload;
        if (id === payload.id) {
          const chainId = web3.utils.hexToNumberString(payload.result);
          resolve(chainId);
          clef.off('log', onData);
        }
      };
      clef.on('log', onData);
      const stringifiedPayload = JSON.stringify(payload);
      clef.stdinWrite(stringifiedPayload);
    });
  }
}

export default new ClefService();
