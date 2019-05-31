import { combineReducers } from 'redux';
import requestsReducer from './requests/reducer';
import notificationsReducer from './notifications/reducer';

const rootReducer = combineReducers({
  requests: requestsReducer,
  notifications: notificationsReducer
});

export default rootReducer;
