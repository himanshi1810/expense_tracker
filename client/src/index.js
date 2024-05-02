import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Provider} from 'react-redux'
import "./index.css";
import {Toaster} from "react-toastify"
import {BrowserRouter} from "react-router-dom"
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Reducer";
const store = configureStore({
  reducer : rootReducer
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}></Provider>
      <BrowserRouter>
        <Toaster/>
        <App></App>
      </BrowserRouter>
  </React.StrictMode>
);
