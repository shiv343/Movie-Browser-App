// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchMovies } from '../Services/omdb';
import MovieCard from '../components/MovieCard';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #121212;
  padding-top: 80px; /* Navbar height */
`;
const Results = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;/* Account for fixed navbar */
`;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    
    if (query) {
      searchMovies(query).then(setMovies);
    } else {
      // Optional: Show popular movies by default
      searchMovies('home alone').then(setMovies);
    }
  }, [location.search]);

  return (
    <Results>
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </Results>
  );
}
