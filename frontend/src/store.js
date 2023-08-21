import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { userReducer } from "./reducers/userReducer";
import { composeWithDevTools } from 'redux-devtools-extension';


const reducer = combineReducers({
    user: userReducer
})

const middleware = [thunk];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store;