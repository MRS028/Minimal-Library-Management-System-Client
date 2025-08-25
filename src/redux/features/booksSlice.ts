import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Book } from "../types/bookTypes";
import type { RootState } from "../store/store";

interface BookState {
  selectedBook: Book | null;
  searchQuery: string;
  filters: {
    genre: string | null;
    availability: "all" | "available" | "unavailable";
  };
}

const initialState: BookState = {
  selectedBook: null,
  searchQuery: "",
  filters: {
    genre: null,
    availability: "all",
  },
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setSelectedBook: (state, action: PayloadAction<Book | null>) => {
      state.selectedBook = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setGenreFilter: (state, action: PayloadAction<string>) => {
      state.filters.genre = action.payload;
    },
    setAvailabilityFilter: (
      state,
      action: PayloadAction<"all" | "available" | "unavailable">
    ) => {
      state.filters.availability = action.payload;
    },
    clearFilters: (state) => {
      state.searchQuery = "";
      state.filters = initialState.filters;
    },
  },
});

// Actions
export const {
  setSelectedBook,
  setSearchQuery,
  setGenreFilter,
  setAvailabilityFilter,
  clearFilters,
} = bookSlice.actions;

// Selector for the selected book
export const selectSelectedBook = (state: RootState) => state.books.selectedBook;

// Optional: selector for search query and filters if needed
export const selectBookFilters = (state: RootState) => state.books.filters;
export const selectSearchQuery = (state: RootState) => state.books.searchQuery;

// Reducer
export default bookSlice.reducer;
