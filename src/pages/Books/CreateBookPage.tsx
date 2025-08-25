import React from "react";
import { useNavigate } from "react-router-dom";
import { useAddBookMutation } from "../../redux/api/booksApi";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import type { Book } from "../../redux/types/bookTypes";
import useScrollToTop from "../../useHooks/useScrollUp";

// Book type

const CreateBookPage = () => {
  const [addBook, { isLoading }] = useAddBookMutation();
  const navigate = useNavigate();
  useScrollToTop();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const bookData: Omit<Book, "_id"> = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      genre: formData.get("genre") as string,
      isbn: formData.get("isbn") as string,
      description: (formData.get("description") as string) || "",
      copies: Number(formData.get("copies")),
      available: Number(formData.get("copies")) > 0,
    };

    try {
      await addBook(bookData).unwrap();
      toast.success("Book added successfully");
      navigate("/all-books");
    } catch (error) {
      toast.error("Failed to add book");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Add New Book</CardTitle>
          <CardDescription>
            Fill in the details to add a new book to the library
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
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
                placeholder="Author name"
                required
              />
            </div>

            {/* Genre */}
            <div className="space-y-2">
              <Label htmlFor="genre">Genre *</Label>
              <Input id="genre" name="genre" placeholder="Genre" required />
            </div>

            {/* ISBN */}
            <div className="space-y-2">
              <Label htmlFor="isbn">ISBN *</Label>
              <Input id="isbn" name="isbn" placeholder="ISBN" required />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
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
                defaultValue={1}
                required
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Adding Book..." : "Add Book"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBookPage;
