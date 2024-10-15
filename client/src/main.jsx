import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
//must be before index.css
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./index.css";
// import customFetch from "./utils/customFetch.js";

// //Makes sure Proxy works!
// const resp = await customFetch.get("/test");
// console.log(resp);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <ToastContainer position="top-center" />
  </StrictMode>
);
