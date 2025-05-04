const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export async function searchMovies(title) {
  const res = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(title)}`
  );
  const data = await res.json();
  return data.Response === 'True' ? data.Search : [];
}

export async function getMovieDetails(imdbID) {
  const res = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
  );
  const data = await res.json();
  return data;
}
