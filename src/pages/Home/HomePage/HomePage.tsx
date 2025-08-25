import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BookOpen, Plus, Search, Users, BarChart3, Calendar, ArrowRight } from 'lucide-react';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';

// Fake data for the home page
const featuredBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    copies: 5,
    available: true,
    description: "A story of wealth, love, and the American Dream in the 1920s."
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    copies: 3,
    available: true,
    description: "A powerful story of racial injustice and moral growth in the American South."
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    copies: 0,
    available: false,
    description: "A dystopian social science fiction novel that examines the consequences of totalitarianism."
  }
];

const libraryStats = {
  totalBooks: 1247,
  availableBooks: 892,
  borrowedBooks: 355,
  totalMembers: 184
};

const recentActivities = [
  { id: 1, action: "Borrowed", book: "The Alchemist", user: "Sarah Johnson", time: "2 hours ago" },
  { id: 2, action: "Returned", book: "Atomic Habits", user: "Michael Chen", time: "5 hours ago" },
  { id: 3, action: "Added", book: "The Midnight Library", user: "Admin", time: "Yesterday" },
  { id: 4, action: "Borrowed", book: "Dune", user: "Emma Williams", time: "1 day ago" }
];

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would filter books based on search query
      navigate('/books');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Library Management System</h1>
          <p className="text-xl text-slate-300 mb-8">Discover, borrow, and manage books with our modern library solution</p>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search for books, authors, or genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-32 py-7 text-lg rounded-full border-0 shadow-lg bg-slate-800 focus:ring-2 focus:ring-emerald-400"
              />
              <Button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 text-white"
                size="lg"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-950/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <BookOpen className="mx-auto h-8 w-8 text-indigo-500" />
                <CardTitle className="text-4xl font-bold tracking-tighter">{libraryStats.totalBooks}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 dark:text-slate-400">Total Books</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <BookOpen className="mx-auto h-8 w-8 text-emerald-500" />
                <CardTitle className="text-4xl font-bold tracking-tighter">{libraryStats.availableBooks}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 dark:text-slate-400">Available Books</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <Users className="mx-auto h-8 w-8 text-rose-500" />
                <CardTitle className="text-4xl font-bold tracking-tighter">{libraryStats.borrowedBooks}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 dark:text-slate-400">Borrowed Books</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <BarChart3 className="mx-auto h-8 w-8 text-sky-500" />
                <CardTitle className="text-4xl font-bold tracking-tighter">{libraryStats.totalMembers}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 dark:text-slate-400">Active Members</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Books</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mt-2">
              Discover our collection of popular and recently added books
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBooks.map((book) => (
              <Card key={book.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl line-clamp-1">{book.title}</CardTitle>
                  <CardDescription className="text-md">by {book.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <Badge variant="secondary">{book.genre}</Badge>
                    <Badge variant={book.available ? "default" : "destructive"} className={book.available ? "bg-emerald-100 text-emerald-800 border-emerald-200" : ""}>
                      {book.available ? "Available" : "Checked Out"}
                    </Badge>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 h-16">{book.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-4">
                  <span className="text-sm text-slate-500">{book.copies} copies</span>
                  <Button 
                    size="sm" 
                    disabled={!book.available}
                    onClick={() => navigate(`/book/${book.id}`)}
                    className="bg-slate-800 hover:bg-slate-900 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white"
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button onClick={() => navigate('/all-books')} size="lg" variant="outline" className="border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
              View All Books <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Actions & Recent Activity */}
      <section className="py-16 bg-white dark:bg-slate-950/50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="actions" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-2 w-full max-w-sm mx-auto">
              <TabsTrigger value="actions">Quick Actions</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="actions">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer p-4" onClick={() => navigate('/books')}>
                  <CardHeader>
                    <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 mb-2">
                        <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <CardTitle>Browse Books</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Explore our complete collection of books</p>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer p-4" onClick={() => navigate('/create-book')}>
                  <CardHeader>
                    <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 mb-2">
                        <Plus className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <CardTitle>Add New Book</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Add a new book to the library collection</p>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer p-4" onClick={() => navigate('/borrow-summary')}>
                  <CardHeader>
                    <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/50 mb-2">
                        <BarChart3 className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                    </div>
                    <CardTitle>View Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Check borrowing statistics and reports</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="activity">
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Recent Library Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-full ${
                            activity.action === 'Borrowed' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400' :
                            activity.action === 'Returned' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400' :
                            'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                          }`}>
                            {activity.action === 'Borrowed' ? <BookOpen className="h-5 w-5" /> :
                             activity.action === 'Returned' ? <Calendar className="h-5 w-5" /> :
                             <Plus className="h-5 w-5" />}
                          </div>
                          <div>
                            <p className="font-medium">{activity.action}: <span className="font-semibold">{activity.book}</span></p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">by {activity.user}</p>
                          </div>
                        </div>
                        <span className="text-sm text-slate-400 dark:text-slate-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to explore our library?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-emerald-100">
            Join thousands of readers who discover new books every day
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/all-books')}
              className="bg-white text-emerald-700 hover:bg-slate-100"
            >
              Browse Collection
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/create-book')}
              className="border-white text-white hover:bg-white/10"
            >
              Add New Book
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
