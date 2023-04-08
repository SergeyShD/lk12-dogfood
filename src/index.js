import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   React.createElement(
//     "h1",
//     {title: "doggy"},
//     "Hello React!"
//   )
// )

root.render(
  <div>
    <h1>"Hello React!"</h1>
    <p>DogFood
      <br/>
      shop</p>
  </div>
)