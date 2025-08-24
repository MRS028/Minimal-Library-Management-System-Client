import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
 reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    [borrowApi.reducerPath]: borrowApi.reducer,
    books: bookReducer, // Add the slice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, borrowApi.middleware),
});
