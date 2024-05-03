import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from 'react-redux';
import "./index.css";
<<<<<<< Updated upstream
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
=======
import {Toaster} from "react-hot-toast"
import {BrowserRouter} from "react-router-dom"
>>>>>>> Stashed changes
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Reducer";

const store = configureStore({
  reducer: rootReducer
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster/>
      </BrowserRouter>
<<<<<<< Updated upstream
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
=======
      </Provider>
  </React.StrictMode>
>>>>>>> Stashed changes
);

