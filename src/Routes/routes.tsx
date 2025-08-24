import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AllBooks from "../pages/Home/AllBooks/AllBooks";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <AllBooks />,
      },
    ],
  },
])

export default routes

