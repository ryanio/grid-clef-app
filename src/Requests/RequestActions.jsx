import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const primary = '#4fb783';
const primary2 = '#78aac7';
const secondary = '#8e6060';
const secondary2 = '#b74f4f';

const styles = () => ({
  controls: { marginTop: 15 },
  approve: {
    color: 'white',
    backgroundColor: primary,
    backgroundImage: `linear-gradient(45deg, ${primary2} 0%, ${primary} 100%)`
  },
  reject: {
    color: 'white',
    backgroundColor: secondary,
    backgroundImage: `linear-gradient(45deg, ${secondary2} 0%, ${secondary} 100%)`,
    marginRight: 10
  }
});

class RequestActions extends Component {
  static propTypes = {
    approve: PropTypes.func,
    reject: PropTypes.func,
    approveDisabled: PropTypes.bool,
    classes: PropTypes.object
  };

  render() {
    const { classes, approve, reject, approveDisabled } = this.props;
    return (
      <div classes={{ root: classes.controls }}>
        <Button
          onClick={() => {
            reject();
          }}
          variant="contained"
          classes={{ root: classes.reject }}
        >
          Reject
        </Button>
        <Button
          onClick={() => {
            approve();
          }}
          classes={{ root: classes.approve }}
          variant="contained"
          disabled={approveDisabled}
        >
          Approve
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(RequestActions);
