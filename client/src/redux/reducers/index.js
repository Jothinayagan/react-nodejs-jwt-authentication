import authenticationReducer from "./authenticationReducer";
import { combineReducers } from "redux";

export const allReducers = combineReducers({
    isAuthenticated: authenticationReducer,
});
