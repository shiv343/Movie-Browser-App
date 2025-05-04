import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaPlay, FaStar, FaArrowLeft } from 'react-icons/fa';
import { getMovieDetails } from '../Services/omdb';
import { YouTubeEmbed } from 'react-social-media-embed';

const Container = styled.div`
  padding: 2rem;
  padding-top: 6rem;
  color: white;
  max-width: 1200px;
  margin: 0 auto;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  color: white;
  text-decoration: none;
  &:hover {
    color: #6a11cb;
  }
`;

const MovieHeader = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Poster = styled.img`
  border-radius: 8px;
  max-width: 300px;
  width: 100%;
`;

const MovieInfo = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Meta = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
`;

const Rating = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #ffd700;
`;

const TrailerButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #6a11cb;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  margin-top: 1rem;
  &:hover {
    background: #4a0d9b;
  }
`;

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <Container>Loading...</Container>;
  if (!movie) return <Container>Movie not found</Container>;

  // Construct YouTube search URL for trailer
  const trailerUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${movie.Title} ${movie.Year} official trailer`
  )}`;

  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft /> Back to Movies
      </BackButton>

      <MovieHeader>
        <Poster
          src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.jpg'}
          alt={movie.Title}
        />
        <MovieInfo>
          <Title>{movie.Title} ({movie.Year})</Title>
          
          <Meta>
            <Rating>
              <FaStar /> {movie.imdbRating}/10
            </Rating>
            <span>{movie.Runtime}</span>
            <span>{movie.Rated}</span>
          </Meta>

          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Cast:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>

          <TrailerButton 
            href={trailerUrl} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FaPlay /> Watch Trailer
          </TrailerButton>
        </MovieInfo>
      </MovieHeader>

      <div>
        <h2>Trailer</h2>
        <YouTubeEmbed 
          url={trailerUrl}
          width="100%"
          height="400px"
        />
      </div>
    </Container>
  );
}