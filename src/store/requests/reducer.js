export const initialState = {
  queue: [],
  selectedIndex: 0
};

const requests = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUESTS:ADD_REQUEST': {
      const { request } = action.payload;
      const queue = [...state.queue, request];
      const newState = {
        ...state,
        queue
      };
      return newState;
    }
    case 'REQUESTS:SELECT_REQUEST': {
      const { index } = action.payload;
      const newState = {
        ...state,
        selectedIndex: index
      };
      return newState;
    }
    case 'REQUESTS:REQUEST_DONE': {
      const { id, nextSelected } = action.payload;
      const newState = {
        ...state,
        selectedIndex: nextSelected,
        queue: state.queue.filter(request => request.id !== id)
      };
      return newState;
    }
    case 'REQUESTS:CLEAR': {
      const newState = {
        ...state,
        selectedIndex: 0,
        queue: []
      };
      return newState;
    }
    default:
      return state;
  }
};

export default requests;
