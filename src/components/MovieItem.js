import React from 'react';

const MovieItem = ({ movie, removeMovie }) => {
  return (
    <div className="movie-item">
      <div>
        <h3>{movie.title}</h3>
        <p>{movie.genre}</p>
      </div>
      <button className="remove-button" onClick={() => removeMovie(movie.id)}>
        Remover
      </button>
    </div>
  );
};

export default MovieItem;
