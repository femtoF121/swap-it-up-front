import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "@/api/apiSlice";
import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
      <App />
      <ToastContainer position='bottom-right' hideProgressBar closeOnClick transition={Slide} />
    </ApiProvider>
  </React.StrictMode>
);
