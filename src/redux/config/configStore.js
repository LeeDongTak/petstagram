import { legacy_createStore as createStore } from "redux";
import { combineReducers } from "redux";
import signup from "../modules/signup";
import addprofile from "../modules/addProfile";
import addPetProfile from "../modules/addPetProfile";
import { posts } from "../modules/posts";
import { users } from "../modules/users";
import editorReducer from "../modules/editor";

const rootreducer = combineReducers({
  signup,
  addprofile,
  addPetProfile,
  posts,
  users,
  editorReducer
})

const store = createStore(rootreducer)


export default store