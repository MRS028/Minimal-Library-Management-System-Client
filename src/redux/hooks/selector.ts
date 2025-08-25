// adjust path to your store

import type { RootState } from "../store/store";

export const selectSelectedBook = (state: RootState) => state.books.selectedBook;
