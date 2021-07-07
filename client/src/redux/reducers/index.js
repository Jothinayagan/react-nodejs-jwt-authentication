import authenticationReducer from "./authenticationReducer";
import { combineReducers } from "redux";

export const rootReducers = combineReducers({
    isAuthenticated: authenticationReducer,
});
