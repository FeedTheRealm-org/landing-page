import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="sticky top-0 bg-black bg-opacity-80 p-4 z-20">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Feed the Realm</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
          <li><Link to="/about" className="hover:text-blue-400 transition">About</Link></li>
          <li><Link to="/features" className="hover:text-blue-400 transition">Features</Link></li>
          <li><Link to="/blog" className="hover:text-blue-400 transition">Blog</Link></li>
          <li><Link to="/media" className="hover:text-blue-400 transition">Media</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;