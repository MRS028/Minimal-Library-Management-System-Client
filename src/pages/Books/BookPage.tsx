import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, BookOpen } from 'lucide-react';
import { useGetBookQuery } from '../../redux/api/booksApi';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { setSelectedBook } from '../../redux/features/booksSlice';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Skeleton } from '../../components/ui/skeleton';
import { Badge } from '../../components/ui/badge';
import useScrollToTop from '../../useHooks/useScrollUp';

const BookPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { data: book, error, isLoading } = useGetBookQuery(bookId as string);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useScrollToTop();

  const handleEdit = () => {
    if (book?.data) {
      dispatch(setSelectedBook(book.data));
      navigate(`/edit-book/${bookId}`);
    }
  };

  const handleBorrow = () => {
    if (book?.data) {
      dispatch(setSelectedBook(book.data));
      navigate(`/borrow/${bookId}`);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!bookId || error || !book?.data) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-600">
              <p className="text-lg font-medium">Book not found</p>
              <p className="text-sm mt-2">The requested book could not be loaded.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentBook = book.data;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl">{currentBook.title}</CardTitle>
              <CardDescription className="text-lg mt-2">by {currentBook.author}</CardDescription>
            </div>
            <Badge 
              variant={currentBook.available ? "default" : "destructive"} 
              className="text-sm py-1 px-3"
            >
              {currentBook.available ? 'Available' : 'Unavailable'}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Book Details</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Genre:</span> {currentBook.genre}</p>
                <p><span className="font-medium">ISBN:</span> {currentBook.isbn}</p>
                <p><span className="font-medium">Copies Available:</span> {currentBook.copies}</p>
                <p><span className="font-medium">Status:</span> 
                  <Badge 
                    variant={currentBook.available ? "default" : "destructive"} 
                    className="ml-2"
                  >
                    {currentBook.available ? 'Available' : 'Unavailable'}
                  </Badge>
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Actions</h3>
              <div className="flex flex-col space-y-3">
                <Button onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Book
                </Button>
                <Button 
                  onClick={handleBorrow} 
                  disabled={!currentBook.available}
                  variant="secondary"
                >
                  <BookOpen className="mr-2 h-4 w-4" /> Borrow Book
                </Button>
              </div>
            </div>
          </div>
          
          {currentBook.description && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-gray-700">{currentBook.description}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookPage;
