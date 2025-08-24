// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
//@ts-expect-error Reason for suppressing error: react-redux not being used currently
// import { Provider } from "react-redux";
import "./index.css";
import routes from "./Routes/routes.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <Provider >
      
    </Provider> */}
    <RouterProvider router={routes} />
    {/* <Toaster position="top-right" reverseOrder={false} /> */}
  </React.StrictMode>
);
