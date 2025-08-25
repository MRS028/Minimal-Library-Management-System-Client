import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Edit, Trash2, BookOpen, Search, Plus, Filter, X } from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../../../components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "../../../redux/api/booksApi";
import type { IBook } from "../../../redux/types/bookTypes";
import { setSelectedBook } from "../../../redux/features/booksSlice";
import { useAppDispatch } from "../../../redux/hooks/hooks";
import useScrollToTop from "../../../useHooks/useScrollUp";

const AllBooks = () => {
  const { data: books, error, isLoading } = useGetAllBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useScrollToTop();

  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const booksData: IBook[] = Array.isArray(books) ? books : (books?.data ?? []);

  // Confirm delete book using sonner toast
  const confirmDelete = (bookId: string, bookTitle: string) => {
    toast.promise(deleteBook(bookId).unwrap(), {
      loading: `Deleting "${bookTitle}"...`,
      success: `"${bookTitle}" deleted successfully!`,
      error: `Failed to delete "${bookTitle}".`,
    });
  };

  const uniqueGenres = Array.from(new Set(booksData.map((book) => book.genre))).sort();

  const filteredBooks = booksData.filter((book: IBook) => {
    const matchesSearch =
      searchQuery === "" ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGenre = genreFilter === "all" || book.genre === genreFilter;

    const matchesAvailability =
      availabilityFilter === "all" ||
      (availabilityFilter === "available" && book.available) ||
      (availabilityFilter === "unavailable" && !book.available);

    return matchesSearch && matchesGenre && matchesAvailability;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setGenreFilter("all");
    setAvailabilityFilter("all");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 sm:p-6 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-36" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/3" />
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-destructive">
          Error loading books. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">All Books</h1>
          <Button onClick={() => navigate("/create-book")}>
            <Plus className="mr-2 h-4 w-4" /> Add New Book
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <CardTitle className="text-lg flex items-center">
                <Filter className="mr-2 h-5 w-5" /> Filters
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                disabled={
                  !searchQuery &&
                  genreFilter === "all" &&
                  availabilityFilter === "all"
                }
              >
                <X className="mr-2 h-4 w-4" /> Clear Filters
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, author, ISBN..."
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={genreFilter} onValueChange={setGenreFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {uniqueGenres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-muted-foreground flex items-center justify-end">
              <p>
                Showing {filteredBooks.length} of {booksData.length} books
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Books Table */}
        <Card>
          <CardContent className="p-0">
            {filteredBooks.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Author</TableHead>
                    <TableHead className="hidden lg:table-cell">Genre</TableHead>
                    <TableHead className="hidden lg:table-cell">ISBN</TableHead>
                    <TableHead className="hidden lg:table-cell">Copies</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBooks.map((book: IBook) => (
                    <TableRow key={book._id}>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell className="hidden md:table-cell">{book.author}</TableCell>
                      <TableCell className="hidden lg:table-cell">{book.genre}</TableCell>
                      <TableCell className="hidden lg:table-cell">{book.isbn}</TableCell>
                      <TableCell className="hidden px-6 lg:table-cell">{book.copies}</TableCell>
                      <TableCell>
                        <Badge variant={book.available ? "default" : "destructive"}>
                          {book.available ? "Available" : "Unavailable"}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex justify-end space-x-1 sm:space-x-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                dispatch(setSelectedBook(book));
                                navigate(`/edit-book/${book._id}`);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit Book</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => confirmDelete(book._id, book.title)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete Book</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => navigate(`/borrow/${book._id}`)}
                              disabled={!book.available}
                            >
                              <BookOpen className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Borrow Book</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-16 px-6">
                <h3 className="text-lg font-semibold">No Books Found</h3>
                <p className="text-muted-foreground mt-2 mb-4 text-sm">
                  {searchQuery || genreFilter !== "all" || availabilityFilter !== "all"
                    ? "Try adjusting your search or filters to find what you're looking for."
                    : "It looks like there are no books yet. Why not add one?"}
                </p>
                <Button onClick={() => navigate("/create-book")}>
                  <Plus className="mr-2 h-4 w-4" /> Add First Book
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default AllBooks;
