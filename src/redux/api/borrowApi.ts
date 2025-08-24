import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Borrow, BorrowSummary } from '../types/bookTypes';


export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.BOOK_API_URL,
  }),
  tagTypes: ['Borrow'],
  endpoints: (builder) => ({
    borrowBook: builder.mutation<void, Omit<Borrow, '_id'>>({
      query: (borrowData) => ({
        url: 'borrow',
        method: 'POST',
        body: borrowData,
      }),
      invalidatesTags: ['Borrow'],
    }),
    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => 'borrow/summary',
      providesTags: ['Borrow'],
    }),
  }),
});

export const {
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = borrowApi;