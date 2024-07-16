import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieSearch from './components/MovieSearch';
import logo from './logo.png';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('movies'));
    if (storedMovies) {
      setMovies(storedMovies);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  const addMovie = (movie) => {
    setMovies([...movies, { id: movies.length + 1, ...movie }]);
  };

  const removeMovie = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div className="App-container">
        <MovieSearch addMovie={addMovie} />
        <MovieList movies={movies} removeMovie={removeMovie} />
      </div>
    </div>
  );
}

export default App;
