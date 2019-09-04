import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Identicon } from 'ethereum-react-components';
import RequestInfo from '../RequestInfo';
import RequestActions from '../RequestActions';

const styles = () => ({});

class ApproveListing extends Component {
  static propTypes = {
    request: PropTypes.object,
    send: PropTypes.func
  };

  submit(approved) {
    const { request, send } = this.props;
    const { id } = request;
    const result = { approved };
    send(null, [], id, result);
  }

  renderMessage(message) {
    const renderMessage = message => {
      if (!message) {
        return null;
      }
      return message.map(thisMessage => {
        const { name, type, value } = thisMessage;
        return (
          <div key={name}>
            <div
              style={{
                margin: '15px 0 15px 5px',
                padding: '10px',
                backgroundColor: Array.isArray(value)
                  ? 'rgba(0,0,0,.05)'
                  : 'transparent'
              }}
            >
              <div style={{ marginBottom: 5 }}>
                Name: <strong>{name}</strong>
              </div>
              <div style={{ marginBottom: 5 }}>
                Type: <strong>{type}</strong>
              </div>
              {renderValue(type, value)}
            </div>
          </div>
        );
      });
    };
    const renderValue = (type, value) => {
      if (typeof value === 'string') {
        return (
          <div style={{ marginBottom: 5 }}>
            Value:
            {type === 'address' && (
              <Identicon
                address={value}
                size="small"
                style={{
                  verticalAlign: 'middle',
                  margin: '5px 10px'
                }}
              />
            )}
            &nbsp;<strong>{value}</strong>
          </div>
        );
      } else if (Array.isArray(value)) {
        return renderMessage(value);
      }
    };
    return renderMessage(message);
  }

  renderDetails() {
    const { request } = this.props;
    const {
      content_type: contentType,
      address,
      raw_data: rawData,
      messages,
      hash
    } = request.params[0];
    return (
      <div>
        <div>
          Address:
          <Identicon
            address={address}
            size="small"
            style={{ verticalAlign: 'middle', margin: '5px 10px' }}
          />
          <strong>{address}</strong>
        </div>
        <div style={{ marginBottom: 10 }}>
          Content Type: <strong>{contentType}</strong>
        </div>
        <div>
          Message:
          {this.renderMessage(messages)}
        </div>
        <div>
          Raw Data:
          <div>
            <TextField
              value={rawData}
              rowsMax={10}
              multiline
              disabled
              fullWidth
            />
          </div>
        </div>
        <div style={{ margin: '20px 0' }}>
          Hash: <strong>{hash}</strong>
        </div>
      </div>
    );
  }

  render() {
    const { request } = this.props;
    return (
      <div>
        <Typography variant="h5" style={{ marginTop: 20 }}>
          Approve Sign Data
        </Typography>
        <RequestInfo request={request} />
        {this.renderDetails()}
        <RequestActions
          approve={() => this.submit(true)}
          reject={() => this.submit(false)}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ApproveListing);
