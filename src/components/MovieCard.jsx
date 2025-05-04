// src/components/MovieCard.jsx
import styled from 'styled-components';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Card = styled.div`
  position: relative;
  background: rgba(17, 17, 17, 0.1);
  backdrop-filter: blur(6px);
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 270px;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 0.5rem;
  color: black;
`;

const Title = styled.h4`
  font-size: 1rem;
  margin: 0.3rem 0;
`;

const Year = styled.p`
  font-size: 0.875rem;
  opacity: 0.8;
`;

const FavIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: ${props => (props.fav ? 'red' : 'white')};
  font-size: 1.25rem;
  z-index: 2;
`;

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFav(favs.some((m) => m.imdbID === movie.imdbID));
  }, [movie.imdbID]);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // prevent navigation
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    let updated;

    if (isFav) {
      updated = favs.filter((m) => m.imdbID !== movie.imdbID);
    } else {
      updated = [...favs, movie];
    }

    localStorage.setItem('favorites', JSON.stringify(updated));
    setIsFav(!isFav);
  };

  const handleClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  return (
    <Card onClick={handleClick}>
      <FavIcon fav={isFav} onClick={toggleFavorite}>
        {isFav ? <FaHeart /> : <FaRegHeart />}
      </FavIcon>
      <Poster
        src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.jpg'}
        alt={movie.Title}
      />
      <Info>
        <Title>{movie.Title}</Title>
        <Year>{movie.Year}</Year>
      </Info>
    </Card>
  );
}
