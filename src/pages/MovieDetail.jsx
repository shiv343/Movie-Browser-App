// src/pages/MovieDetail.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getMovieDetails } from '../services/omdbService';

const Container = styled.div`
  padding: 2rem;
  color: black;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 2rem;
`;

const Poster = styled.img`
  width: 300px;
  border-radius: 10px;
  box-shadow: 0 4px 25px rgba(0,0,0,0.4);
`;

const Info = styled.div`
  max-width: 600px;
`;

const Title = styled.h1`
  margin: 0 0 1rem 0;
`;

const DetailItem = styled.p`
  margin: 0.5rem 0;
`;

export default function MovieDetail() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(imdbID).then(setMovie);
  }, [imdbID]);

  if (!movie) return <p style={{ color: 'white' }}>Loading...</p>;

  return (
    <Container>
      <Poster
        src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.jpg'}
        alt={movie.Title}
      />
      <Info>
        <Title>{movie.Title} ({movie.Year})</Title>
        <DetailItem><strong>Genre:</strong> {movie.Genre}</DetailItem>
        <DetailItem><strong>Director:</strong> {movie.Director}</DetailItem>
        <DetailItem><strong>Actors:</strong> {movie.Actors}</DetailItem>
        <DetailItem><strong>Plot:</strong> {movie.Plot}</DetailItem>
        <DetailItem><strong>IMDb Rating:</strong> {movie.imdbRating}</DetailItem>
        <DetailItem><strong>Runtime:</strong> {movie.Runtime}</DetailItem>
        <DetailItem><strong>Language:</strong> {movie.Language}</DetailItem>
      </Info>
    </Container>
  );
}
