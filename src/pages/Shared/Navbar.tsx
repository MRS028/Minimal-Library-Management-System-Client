import React from "react";
import { Link, useLocation } from "react-router-dom";

// Assuming shadcn setup
import {
  Home,
  Library,
  PlusCircle,
  ClipboardList,
  Menu,
  BookOpen,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button, buttonVariants } from "../../components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "../../components/ui/sheet";

const Navbar: React.FC = () => {
  const location = useLocation();

  // Define navigation items with Lucide icons
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/all-books", label: "All Books", icon: Library },
    { path: "/create-book", label: "Add Book", icon: PlusCircle },
    { path: "/borrow-summary", label: "Borrow Summary", icon: ClipboardList },
  ];

  // Function to check if a navigation link is active
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo/Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 mt-1 text-primary" />
          <span className="font-bold text-2xl sm:inline-block">LibraryHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                buttonVariants({
                  variant: isActive(item.path) ? "secondary" : "ghost",
                }),
                "flex items-center space-x-2"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu using Sheet */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <nav className="flex flex-col space-y-4 pt-6">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.path}>
                    <Link
                      to={item.path}
                      className={cn(
                        buttonVariants({
                          variant: isActive(item.path) ? "secondary" : "ghost",
                          size: "lg",
                        }),
                        "flex items-center justify-start space-x-3"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
