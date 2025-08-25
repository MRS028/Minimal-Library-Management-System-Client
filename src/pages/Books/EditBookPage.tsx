import { useNavigate, useParams } from 'react-router-dom';
import {  useAppSelector } from '../../redux/hooks/hooks';
import { useUpdateBookMutation } from '../../redux/api/booksApi';
import { toast } from 'sonner';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import useScrollToTop from '../../useHooks/useScrollUp';

// Book type
interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

const EditBookPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  useScrollToTop();

  // Redux slice থেকে selectedBook fetch
  const selectedBook = useAppSelector((state) => state.books.selectedBook);
  const [updateBook, { isLoading }] = useUpdateBookMutation();

  if (!selectedBook) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <Card>
          <CardContent className="text-center text-red-600">
            <p className="text-lg font-medium">No book selected</p>
            <p className="text-sm mt-2">Please select a book to edit from the book list.</p>
            <Button className="mt-4" onClick={() => navigate('/books')}>Go Back</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const updatedBook: Book = {
    _id: selectedBook._id,
    title: formData.get('title') as string,
    author: formData.get('author') as string,
    genre: formData.get('genre') as string,
    isbn: formData.get('isbn') as string,
    description: (formData.get('description') as string) || '',
    copies: Number(formData.get('copies')),
    available: Number(formData.get('copies')) > 0,
  };

  try {
    await updateBook(updatedBook).unwrap();
    toast.success('Book updated successfully');
    navigate(`/book/${bookId}`);
  } catch (error) {
    toast.error('Failed to update book');
  }
};

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Edit Book</CardTitle>
          <CardDescription>Update the details of "{selectedBook.title}"</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                defaultValue={selectedBook.title}
                placeholder="Book title"
                required
              />
            </div>

            {/* Author */}
            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                name="author"
                defaultValue={selectedBook.author}
                placeholder="Author name"
                required
              />
            </div>

            {/* Genre */}
            <div className="space-y-2">
              <Label htmlFor="genre">Genre *</Label>
              <Input
                id="genre"
                name="genre"
                defaultValue={selectedBook.genre}
                placeholder="Genre"
                required
              />
            </div>

            {/* ISBN */}
            <div className="space-y-2">
              <Label htmlFor="isbn">ISBN *</Label>
              <Input
                id="isbn"
                name="isbn"
                defaultValue={selectedBook.isbn}
                placeholder="ISBN"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={selectedBook.description || ''}
                placeholder="Book description"
                rows={4}
              />
            </div>

            {/* Copies */}
            <div className="space-y-2">
              <Label htmlFor="copies">Number of Copies *</Label>
              <Input
                id="copies"
                name="copies"
                type="number"
                min="0"
                defaultValue={selectedBook.copies}
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Book'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/books')}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditBookPage;
