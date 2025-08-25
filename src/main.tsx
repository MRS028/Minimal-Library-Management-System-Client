// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
//@ts-expect-error Reason for suppressing error: react-redux not being used currently
import "./index.css";
import routes from "./Routes/routes.js";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.js";
import { Toaster } from "sonner";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster/>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);
