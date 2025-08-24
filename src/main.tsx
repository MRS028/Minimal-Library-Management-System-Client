// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import  Toaster  from 'react-hot-toast';

import './index.css';
import routes from './Routes/routes.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Provider >
      
    </Provider> */}
    <RouterProvider router={routes} />
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
  </React.StrictMode>
);