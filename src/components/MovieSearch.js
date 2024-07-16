import React, { useState } from 'react';
import axios from 'axios';

const MovieSearch = ({ addMovie }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();
    const apiKey = 'b5754140e3cc85a6cfb8b32032b8a7cb';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

    console.log('Searching for movies with query:', query);

    try {
      const response = await axios.get(url);
      console.log('API response:', response.data);
      setResults(response.data.results);
    } catch (error) {
      console.error("Erro ao buscar filmes", error);
      setResults([]); // Garantir que results seja um array
    }
  };

  const getGenres = async (genreIds) => {
    const apiKey = 'b5754140e3cc85a6cfb8b32032b8a7cb';
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const allGenres = response.data.genres;
      return genreIds.map(id => allGenres.find(genre => genre.id === id)?.name || 'Unknown');
    } catch (error) {
      console.error("Erro ao buscar gêneros", error);
      return [];
    }
  };

  const handleAddMovie = async (movie) => {
    const genres = await getGenres(movie.genre_ids);
    addMovie({ id: movie.id, title: movie.title, genres });
  };

  return (
    <div>
      <form onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Buscar filmes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Buscar</button>
      </form>
      <ul>
        {results.map((movie) => (
          <li key={movie.id}>
            {movie.title} ({movie.release_date ? movie.release_date.split('-')[0] : 'N/A'})
            <button onClick={() => handleAddMovie(movie)}>
              Adicionar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieSearch;
