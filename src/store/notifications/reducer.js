export const initialState = {
  notifications: []
};

const requests = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATIONS:ADD': {
      const { notification } = action.payload;
      const notifications = [...state.notifications, notification];
      const newState = {
        ...state,
        notifications
      };
      return newState;
    }
    case 'NOTIFICATIONS:CLEAR': {
      const { index } = action.payload;
      const newState = {
        ...state,
        notifications: state.notifications.filter(
          (n, nIndex) => nIndex !== index
        )
      };
      return newState;
    }
    case 'NOTIFICATIONS:CLEAR_ALL': {
      const newState = {
        ...state,
        notifications: []
      };
      return newState;
    }
    default:
      return state;
  }
};

export default requests;
