import { createStore } from "redux";
import { combineReducers } from "redux";
import dummyReducer from "../modules/dummy";

const rootreducer = combineReducers({
    dummyReducer
})
const store = createStore(rootreducer);


export default store