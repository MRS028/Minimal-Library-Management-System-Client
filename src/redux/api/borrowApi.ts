import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Borrow, BorrowSummary } from "../types/bookTypes";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    //@ts-expect-error Reason for suppressing error: react-redux not being used currently
    baseUrl: import.meta.env.VITE_API_BASE_URL, 
  }),
  tagTypes: ["Borrow"],
  endpoints: (builder) => ({
    // POST /api/borrow
    borrowBook: builder.mutation<Borrow, Omit<Borrow, "_id">>({
      query: (borrowData) => ({
        url: "borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["Borrow"],
    }),

    // GET /api/borrow/summary
    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => "borrow",
      providesTags: ["Borrow"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
