import { SET_TITLE, SET_CONTENT, RESET_EDITOR, SET_EDIT_ID } from './actionTypes';

export const setTitle = (title) => ({
  type: SET_TITLE,
  payload: title,
});

export const setEditId = (id) => ({
  type: SET_EDIT_ID,
  payload: id,
});
export const setContent = (content) => ({
  type: SET_CONTENT,
  payload: content,
});

export const resetEditor = () => ({
  type: RESET_EDITOR,
});