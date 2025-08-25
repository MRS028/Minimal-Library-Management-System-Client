import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Book } from "../types/bookTypes";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    //@ts-expect-error Reason for suppressing error: react-redux not being used currently
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getAllBooks: builder.query<Book[], void>({
      query: () => "books",
      providesTags: ["Book"],
    }),
    getBook: builder.query<{ data: Book }, string>({
      query: (id) => `books/${id}`,
    }),
    addBook: builder.mutation<Book, Omit<Book, "_id">>({
      query: (book) => ({
        url: "books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation<Book, Book>({
      query: ({ _id, ...rest }) => ({
        url: `books/${_id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Book"],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;
