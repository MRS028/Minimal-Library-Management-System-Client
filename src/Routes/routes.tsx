import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AllBooks from "../pages/Home/AllBooks/AllBooks";
import BookPage from "../pages/Books/BookPage";
import EditBookPage from "../pages/Books/EditBookPage";
import CreateBookPage from "../pages/Books/CreateBookPage";


const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <AllBooks />,
      },
      {
        path: '/all-books',
        element: <AllBooks />,
      },
      {
        path: '/book/:bookId',
        element: <BookPage />,
      },
      {
        path: '/create-book',
        element: <CreateBookPage />,
      },
      {
        path: '/edit-book/:bookId',
        element: <EditBookPage />,
      },
      {
        path: '/borrow/:bookId',
        // element: <BorrowPage />,
      },
      {
        path: '/borrow-summary',
        // element: <BorrowSummaryPage />,
      },
    ],
  },
]);

export default routes;