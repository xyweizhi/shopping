import React from "react";
import dva from "dva";
import createLoading from "dva-loading";
import "./index.css";
import products from "./models/products";
import car from "./models/car";
import App from "./App";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

const app = new dva();

// model
app.model(products);
app.model(car);

// use plugin
app.use(createLoading());

// router
app.router(() => <App></App>);

// render
app.start("#root");
