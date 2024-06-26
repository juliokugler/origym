import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "normalize.css";
import "./index.css";
import "./i18n"; // Import i18n initialization

const root = createRoot(document.getElementById("root")); // Use createRoot instead of ReactDOM.render
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
