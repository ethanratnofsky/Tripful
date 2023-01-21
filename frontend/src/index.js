import React from "react";
import { createRoot } from "react-dom/client";

// The main React App component
import App from "./App";

// Global styles
import "./globals.css";

// Mount the App component to the DOM element with id "root"
const root = createRoot(document.getElementById("root"));
root.render(<App />);
