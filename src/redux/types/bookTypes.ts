export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

export interface IBook extends Book {
    isBorrowed: boolean;
}

export interface Borrow {
  _id: string;
  bookId: string;
  quantity: number;
  dueDate: string;
  returned?: boolean;
}

export interface BorrowSummary {
  bookTitle: string;
  isbn: string;
  totalQuantityBorrowed: number;
}