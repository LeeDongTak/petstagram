import { legacy_createStore as createStore } from "redux";
import { combineReducers } from "redux";
import { posts } from "../modules/posts";
import { users } from "../modules/users";

const rootreducer = combineReducers({
  posts,
  users
})
const store = createStore(rootreducer);


export default store