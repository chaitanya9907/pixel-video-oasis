
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-pixelverse-dark/95 backdrop-blur-md py-3 shadow-lg' 
          : 'bg-gradient-to-b from-pixelverse-dark to-transparent py-5'
      )}
    >
      <div className="content-container flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-pixelverse-accent to-pixelverse-highlight bg-clip-text text-transparent">
            PixelVerse
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/" className="nav-link">Movies</Link>
          <Link to="/" className="nav-link">TV Shows</Link>
          <Link to="/" className="nav-link">New & Popular</Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-pixelverse-muted/20 transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-pixelverse-muted/20 transition-colors">
            <User className="h-5 w-5" />
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="p-2 md:hidden rounded-full hover:bg-pixelverse-muted/20 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-pixelverse-dark py-4 px-6 animate-fade-in">
          <nav className="flex flex-col space-y-3">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/" className="nav-link">Movies</Link>
            <Link to="/" className="nav-link">TV Shows</Link>
            <Link to="/" className="nav-link">New & Popular</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
