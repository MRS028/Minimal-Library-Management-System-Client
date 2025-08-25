

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { setSelectedBook } from "../../redux/features/booksSlice";
import { selectSelectedBook } from "../../redux/hooks/selector";

import { useBorrowBookMutation } from "../../redux/api/borrowApi";
import { useGetBookQuery } from "../../redux/api/booksApi";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { format } from "date-fns";
import { Calendar } from "../../components/ui/calendar";
import useScrollToTop from "../../useHooks/useScrollUp";

const BorrowPage = () => {
  useScrollToTop();
  const { bookId } = useParams<{ bookId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Fetch the book from API
  
  const bookQueryResult = useGetBookQuery(bookId!);
  // @ts-expect-error: temporarily ignoring this TS error for Redux
  const { data: bookDataFromApi, isLoading: isLoadingBook } = bookQueryResult;

  // Correct selector from slice
  const selectedBook = useAppSelector(selectSelectedBook);

  // Mutation
  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  console.log("Book from API:", bookQueryResult.data);
  // console.log()
  // Local state
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState<Date>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date;
  });

  // Set selected book in Redux when fetched
  useEffect(() => {
    if (bookQueryResult.data?.data) {
      dispatch(setSelectedBook(bookQueryResult.data.data));
    }
  }, [bookQueryResult.data?.data, dispatch]);

  const displayBook = bookQueryResult.data?.data || selectedBook;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayBook || !dueDate) return;

    try {
      await borrowBook({
        // @ts-expect-error: temporarily ignoring this TS error for Redux
        book: displayBook._id, 
        quantity,
        dueDate: dueDate.toISOString(),
      }).unwrap();

      toast.success("Book borrowed successfully");
      navigate("/borrow-summary");
    } catch (error) {
      console.error("Borrow error:", error);
      toast.error("Failed to borrow book");
    }
  };

  // console.log('Selected Book:', selectedBook);
  // console.log('Book from API:', bookFromApi);
  // console.log('Display Book:', displayBook);

  if (isLoadingBook) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!displayBook) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <Card>
          <CardContent className="p-6 text-center text-red-600">
            <p className="text-lg font-medium">Book not found</p>
            <p className="text-sm mt-2">Cannot borrow an unknown book.</p>
            <Button className="mt-4" onClick={() => navigate("/books")}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const maxQuantity = Math.min(displayBook.copies, 5);

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Borrow Book</CardTitle>
          <CardDescription>
            Fill in the details to borrow "{displayBook.title}"
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="bg-muted p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">Book Information</h3>
            <p>
              
              <strong>Title:</strong> {displayBook.title}
            </p>
            <p>
              <strong>Author:</strong> {displayBook.author}
            </p>
            <p>
              <strong>Available Copies:</strong> {displayBook.copies}
            </p>
            <p>
              <strong>ISBN:</strong> {
              displayBook.isbn}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min={1}
                max={maxQuantity}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
              />
              <p className="text-sm text-muted-foreground">
                You can borrow up to {maxQuantity} copies
              </p>
            </div>

            <div className="space-y-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? (
                      format(dueDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    required
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <p className="text-sm text-muted-foreground">
                Select the date when the book should be returned
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !dueDate}
            >
              {isLoading ? "Processing..." : "Borrow Book"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BorrowPage;
