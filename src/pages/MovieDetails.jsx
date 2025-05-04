import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '../Services/omdb';
import styled from 'styled-components';
import { FaArrowLeft, FaStar, FaClock, FaFilm } from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem;
  padding-top: 6rem;
  max-width: 1200px;
  margin: 0 auto;
  color: #333;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #6a11cb;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  margin-bottom: 2rem;
  transition: background 0.2s;
  &:hover {
    background: #4a0d9b;
  }
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 300px 1fr;
  }
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 0;
  color: #222;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #555;
`;

const Divider = styled.div`
  height: 1px;
  background: #eee;
  margin: 1rem 0;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  color: #444;
`;

const PlotText = styled.p`
  line-height: 1.6;
  margin: 0;
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

  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft /> Back to Movies
      </BackButton>

      <MovieGrid>
        <Poster
          src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.jpg'}
          alt={movie.Title}
        />
        <MovieInfo>
          <Title>{movie.Title} ({movie.Year})</Title>
          
          <Meta>
            {movie.imdbRating !== 'N/A' && (
              <MetaItem>
                <FaStar color="#FFD700" /> {movie.imdbRating}/10
              </MetaItem>
            )}
            <MetaItem>
              <FaClock /> {movie.Runtime}
            </MetaItem>
            <MetaItem>
              <FaFilm /> {movie.Rated}
            </MetaItem>
          </Meta>

          <Divider />

          <Section>
            <SectionTitle>Plot</SectionTitle>
            <PlotText>{movie.Plot}</PlotText>
          </Section>

          <Section>
            <SectionTitle>Details</SectionTitle>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Writer:</strong> {movie.Writer}</p>
          </Section>

          <Section>
            <SectionTitle>Cast</SectionTitle>
            <p>{movie.Actors}</p>
          </Section>

          <Section>
            <SectionTitle>Production</SectionTitle>
            <p><strong>Language:</strong> {movie.Language}</p>
            <p><strong>Country:</strong> {movie.Country}</p>
            <p><strong>Awards:</strong> {movie.Awards}</p>
          </Section>
        </MovieInfo>
      </MovieGrid>
    </Container>
  );
}