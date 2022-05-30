import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import postReducer from "./post-reducer";



const { default: usersReducer } = require("./users-reducer");
const { default: userReducer } = require("./user-reducer");




let reducers = combineReducers({
    usersPage: usersReducer,
    userPage: userReducer,
    postPage: postReducer
});


const store = createStore(reducers , applyMiddleware(thunk))


window.store = store;

export default store;