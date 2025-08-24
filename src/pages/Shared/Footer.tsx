import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Twitter, Facebook, Instagram, BookOpen } from 'lucide-react';
import { Separator } from '../../components/ui/separator';
import { Button } from '../../components/ui/button';
 // Assuming shadcn setup

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4 lg:col-span-2">
            <Link to="/" className="text-xl font-bold flex items-center space-x-2">
              <BookOpen className="h-6 w-6 mt-1 text-primary" />
              <span className="font-semibold text-foreground">LibraryHub</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              Your digital gateway to a world of knowledge. Manage collections, track borrows, and foster a community of readers with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/books" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/create-book" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Add New Book
                </Link>
              </li>
              <li>
                <Link to="/borrow-summary" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Borrow Summary
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact/Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Get In Touch</h3>
            <div className="space-y-3 text-muted-foreground">
              <a href="mailto:support@libraryhub.com" className="flex items-center space-x-2 text-sm hover:text-primary transition-colors">
                <Mail className="w-4 h-3 mt-1" />
                <span>support@libraryhub.com</span>
              </a>
              <p className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>1100 Bangla Bazar, Dhaka</span>
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} LibraryHub. All rights reserved.
          </p>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            {socialLinks.map((social) => (
              <a key={social.name} href={social.href} aria-label={social.name}>
                 <Button variant="ghost" size="icon">
                    <social.icon className="h-4 w-4" />
                </Button>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
