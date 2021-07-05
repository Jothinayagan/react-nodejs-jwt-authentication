import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";

// Redux section
import { createStore } from "redux";
import { Provider } from "react-redux";
import { allReducers } from "./redux/reducers";

// add below statement to visualize the redux flow
const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App className="background" />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
