import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";

// Redux section
import { createStore } from "redux";
import { Provider } from "react-redux";

// redux-persist
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import storage from "redux-persist/lib/storage";

import { rootReducers } from "./redux/reducers";

const persistConfig = {
    key: "root",
    storage,
};

const pReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(
    pReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistor = persistStore(store);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App className="background" />
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
