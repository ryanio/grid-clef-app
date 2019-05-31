import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import IconButton from '@material-ui/core/IconButton';
import Request from './Request';
import { selectRequest } from '../store/requests/actions';
import Clef from '../store/clefService';

const styles = () => ({});

class Requests extends Component {
  static propTypes = {
    requests: PropTypes.object,
    dispatch: PropTypes.func,
    clef: PropTypes.object
  };

  navigateNext = () => {
    const { dispatch, requests } = this.props;
    const { selectedIndex, queue } = requests;
    let next = selectedIndex + 1;
    if (next > queue.length - 1) {
      // To beginning of queue
      next = 0;
    }
    dispatch(selectRequest(next));
  };

  navigatePrevious = () => {
    const { dispatch, requests } = this.props;
    const { selectedIndex, queue } = requests;
    let previous = selectedIndex - 1;
    if (previous < 0) {
      // To end of queue
      previous = queue.length - 1;
    }
    dispatch(selectRequest(previous));
  };

  send = (method, params, id, result) => {
    const { clef, dispatch } = this.props;
    Clef.send(clef, dispatch, method, params, id, result);
  };

  renderControls() {
    const { requests } = this.props;
    const { queue, selectedIndex } = requests;
    if (queue.length < 2) {
      return null;
    }
    let queueLocation;
    if (queue.length > 1) {
      const currentRequest = selectedIndex + 1;
      queueLocation = (
        <span>
          {currentRequest} of {queue.length}
        </span>
      );
    }
    return (
      <div>
        <div>
          <IconButton
            onClick={() => {
              this.navigatePrevious();
            }}
          >
            <NavigateBeforeIcon />
          </IconButton>
          {queueLocation}
          <IconButton
            onClick={() => {
              this.navigateNext();
            }}
          >
            <NavigateNextIcon />
          </IconButton>
        </div>
      </div>
    );
  }

  renderRequest() {
    const { requests } = this.props;
    const { queue, selectedIndex } = requests;
    const request = queue[selectedIndex];
    if (!request) {
      return (
        <Typography style={{ marginTop: 25, textAlign: 'center' }}>
          No requests in queue.
        </Typography>
      );
    }
    return <Request request={request} send={this.send} />;
  }

  render() {
    return (
      <div>
        {this.renderControls()}
        {this.renderRequest()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    requests: state.requests
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Requests));
