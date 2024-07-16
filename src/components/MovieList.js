import React from 'react';

const MovieList = ({ movies, removeMovie }) => {
  return (
    <div>
      <h2>Meus Filmes</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            {movie.title} - Gêneros: {movie.genres.join(', ')}
            <button onClick={() => removeMovie(movie.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
