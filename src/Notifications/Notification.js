import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

const styles = theme => ({
  defaultSnackbar: {
    marginBottom: 10
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    verticalAlign: 'middle',
    marginBottom: 1
  },
  inlineIcon: {
    marginRight: 5
  },
  closeIcon: {
    opacity: 0.9
  }
});

class Notification extends Component {
  static propTypes = {
    classes: PropTypes.object,
    type: PropTypes.string,
    message: PropTypes.string,
    onDismiss: PropTypes.func
  };

  render() {
    const { classes, message, type, onDismiss } = this.props;
    const inlineIconClasses = {
      classes: {
        root: classNames(classes.icon, classes.inlineIcon)
      }
    };
    let icon;
    let snackbarClasses;

    switch (type) {
      case 'error':
        snackbarClasses = classes.error;
        icon = <ErrorIcon {...inlineIconClasses} />;
        break;
      case 'warning':
        snackbarClasses = classes.warning;
        icon = <WarningIcon {...inlineIconClasses} />;
        break;
      case 'info':
        snackbarClasses = classes.info;
        icon = <InfoIcon {...inlineIconClasses} />;
        break;
      case 'success':
        snackbarClasses = classes.success;
        icon = <CheckCircleIcon {...inlineIconClasses} />;
        break;
      default:
        break;
    }

    return (
      <SnackbarContent
        classes={{ root: classNames(classes.defaultSnackbar, snackbarClasses) }}
        message={
          <span>
            {icon}
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={onDismiss}
          >
            <CloseIcon
              classes={{ root: classNames(classes.icon, classes.closeIcon) }}
            />
          </IconButton>
        ]}
      />
    );
  }
}
export default withStyles(styles)(Notification);
