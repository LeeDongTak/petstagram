import { legacy_createStore as createStore } from 'redux';
import { combineReducers } from 'redux';
import { posts } from '../modules/posts';
import { mypost } from '../modules/mypost';

const rootreducer = combineReducers({
  posts,
  mypost
});
const store = createStore(rootreducer);

export default store;
