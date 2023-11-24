import { uuidv4 } from '@firebase/util';
import { SET_TITLE, SET_CONTENT, RESET_EDITOR,SET_EDIT_ID} from './actionTypes';

const initialState = {
  editId:uuidv4(),
  editTitle: '',
  editorData: '',
};

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EDIT_ID:
          return {...state,editId: action.payload,};
    case SET_TITLE:
      return { ...state, editTitle: action.payload };
    case SET_CONTENT:
      return { ...state, editorData: action.payload };
    case RESET_EDITOR:
      return initialState;
    default:
      return state;
  }
};

export default editorReducer;