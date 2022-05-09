import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";

import "./scss/index.scss";

import App from "./components/app/app";
import store from "./store";

let persistor = persistStore(store);


ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>

    </React.StrictMode>,
    document.getElementById(`root`)
);

