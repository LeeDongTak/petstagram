import { createStore } from "redux";
import { combineReducers } from "redux";
import dummyReducer from "../modules/dummy";
import editorReducer from "../modules/reducer";


const rootreducer = combineReducers({
    dummyReducer
})
const store = createStore(editorReducer);


export default store