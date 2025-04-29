
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-pixelverse-dark py-12 mt-10">
      <div className="content-container">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-pixelverse-accent to-pixelverse-highlight bg-clip-text text-transparent">
                PixelVerse
              </span>
            </Link>
            <p className="mt-3 text-muted-foreground max-w-md">
              Your gateway to endless entertainment. Stream movies, TV shows, and more from anywhere, anytime.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-medium mb-3">Browse</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/" className="hover:text-pixelverse-accent transition-colors">Home</Link></li>
                <li><Link to="/" className="hover:text-pixelverse-accent transition-colors">Movies</Link></li>
                <li><Link to="/" className="hover:text-pixelverse-accent transition-colors">TV Shows</Link></li>
                <li><Link to="/" className="hover:text-pixelverse-accent transition-colors">New & Popular</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Help</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/" className="hover:text-pixelverse-accent transition-colors">Account</Link></li>
                <li><Link to="/" className="hover:text-pixelverse-accent transition-colors">FAQ</Link></li>
                <li><Link to="/" className="hover:text-pixelverse-accent transition-colors">Support</Link></li>
                <li><Link to="/" className="hover:text-pixelverse-accent transition-colors">Devices</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/" className="hover:text-pixelverse-accent transition-colors">Privacy</Link></li>
                <li><Link to="/" className="hover:text-pixelverse-accent transition-colors">Terms</Link></li>
                <li><Link to="/" className="hover:text-pixelverse-accent transition-colors">Cookies</Link></li>
                <li><Link to="/" className="hover:text-pixelverse-accent transition-colors">Corporate Info</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-muted/30 mt-8 pt-6 text-muted-foreground text-sm">
          <p>© 2025 PixelVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
