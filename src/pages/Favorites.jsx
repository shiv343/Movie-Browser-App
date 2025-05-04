import { useEffect, useState } from 'react';
import styled from 'styled-components';
import MovieCard from '../components/MovieCard';

const FavoritesContainer = styled.div`
  padding: 2rem;
  padding-top: 6rem; /* Account for navbar */
`;


const Title = styled.h1`
  color: black;
  margin-bottom: 2rem;
  text-align: center;
  background: -webkit-linear-gradient(#FF69B4, #eec0c8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
`;

const MoviesGrid = styled.div`
   display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto; 
`;

const EmptyMessage = styled.p`
  color: rgba(2, 2, 2, 0.7);
  text-align: center;
  font-size: 1.2rem;
`;

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const loadFavorites = () => {
      const favs = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(favs);
    };
    
    loadFavorites();
    
    // Listen for changes from other tabs
    window.addEventListener('storage', loadFavorites);
    return () => window.removeEventListener('storage', loadFavorites);
  }, []);

  return (
    <FavoritesContainer>
      <Title>Your Favorite Movies</Title>
      
      {favorites.length > 0 ? (
        <MoviesGrid>
          {favorites.map(movie => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </MoviesGrid>
      ) : (
        <EmptyMessage>
          No favorites yet. Click the ♡ icon on movies to add them!
        </EmptyMessage>
      )}
    </FavoritesContainer>
  );
}