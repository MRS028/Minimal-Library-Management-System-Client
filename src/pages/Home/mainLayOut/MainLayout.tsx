import { Link, Outlet } from "react-router-dom";


export default function MainLayout() {
    return(
       <div>
      <nav className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">📚 LibraryHub</Link>
          <div className="space-x-4">
            <Link to="/books" className="hover:text-gray-300">All Books</Link>
            <Link to="/create-book" className="hover:text-gray-300">Add Book</Link>
            <Link to="/borrow-summary" className="hover:text-gray-300">Borrow Summary</Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4 min-h-screen">
        <Outlet /> 
      </main>

      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2025 LibraryHub. All rights reserved.</p>
      </footer>
    </div>
    )
}