import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RequestInfo extends Component {
  static propTypes = {
    request: PropTypes.object
  };

  render() {
    const { request } = this.props;
    if (!request.params[0]) {
      return null;
    }
    const { meta } = request.params[0];
    if (!meta) {
      return null;
    }
    const { remote, scheme, local, 'User-Agent': userAgent, Origin } = meta;
    return (
      <div style={{ background: '#efefef', padding: 10, margin: 10 }}>
        <strong>Request Details</strong>
        <div style={{ paddingTop: 5, paddingLeft: 10 }}>
          <div style={{ marginBottom: 5 }}>
            Remote: <strong>{remote}</strong>
          </div>
          <div style={{ marginBottom: 5 }}>
            Transport: <strong>{scheme}</strong>
          </div>
          <div style={{ marginBottom: 5 }}>
            Local Endpoint: <strong>{local}</strong>
          </div>
          {userAgent && (
            <div style={{ marginBottom: 5 }}>
              User Agent: <strong>{userAgent}</strong>
            </div>
          )}
          {Origin && (
            <div style={{ marginBottom: 5 }}>
              Origin: <strong>{Origin}</strong>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default RequestInfo;
