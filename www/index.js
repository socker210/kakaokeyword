/* React Modules */
import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

/* User Components */
import App from "./App";
import Reducer from "./modules/Reducer";

/* CSS Documents */
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";


// Create Store
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() For Debugging
const store = createStore(Reducer, applyMiddleware(thunk));


// Rendering Web Application
var container = document.getElementById("app");
const WebWrapper = () => {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
}
ReactDOM.render(<WebWrapper />, container);