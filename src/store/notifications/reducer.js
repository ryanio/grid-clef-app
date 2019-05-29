export const initialState = {
  queue: [],
  selectedIndex: 0,
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
      const { clientName } = action.payload;
      const newState = {
        ...state,
        notifications: state.notifications.filter(
          request => request.client !== clientName
        )
      };
      return newState;
    }
    default:
      return state;
  }
};

export default requests;
