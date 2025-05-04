import React,{ useState,useEffect }  from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useDebounce } from 'use-debounce';

export default function Navbar() {
        const [searchQuery, setSearchQuery] = useState('');
        const [debouncedQuery] = useDebounce(searchQuery, 300);
        useEffect(() => {
            if (debouncedQuery) {
              navigate(`/?q=${encodeURIComponent(debouncedQuery)}`);
            }
          }, [debouncedQuery]);
        const navigate = useNavigate();
      
        const handleSearch = (e) => {
          e.preventDefault();
          if (searchQuery.trim()) {
            navigate(`/?q=${encodeURIComponent(searchQuery)}`);
          }
        };
        
  return (
    <nav className="navbar">
    <div className="navbar-inner">
      <Link to="/" className="navbar-home">Home</Link>
      
      <div className="navbar-center">
        <div className="navbar-logo">🎬 Movie Browser</div>
        <form onSubmit={handleSearch} className="navbar-search">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
            />
            <button type="submit" style={{borderRadius:99}}>Search</button>
          </form>
        </div>
      <Link to="/favorites" className="navbar-favorites">
        <button>❤️ Favorites</button>
      </Link>
    </div>
  </nav>
  );
}