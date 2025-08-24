import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Book } from "../types/bookTypes";

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

export const {
  setSelectedBook,
  setSearchQuery,
  setGenreFilter,
  setAvailabilityFilter,
  clearFilters,
} = bookSlice.actions;

export default bookSlice.reducer;
