const DUMMY = 'DUMMY';

export const dummy = (payload) => {
  return {
    type: DUMMY,
    payload
  };
};

const initialState = {
  dummy: 0
};

const dummyReducer = (state = initialState, action) => {
  switch (action.type) {
    case DUMMY:
      return {
        ...state,
        dummy: dummy + 1
      };
      break;

    default:
      return state;
      break;
  }
};

export default dummyReducer;
