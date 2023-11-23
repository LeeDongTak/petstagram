import { legacy_createStore as createStore } from "redux";
import { combineReducers } from "redux";
import { posts } from "../modules/posts";

const rootreducer = combineReducers({
  posts
})
const store = createStore(rootreducer);


export default store