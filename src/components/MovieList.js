import React from 'react';

const MovieList = ({ movies, onMovieSelect }) => {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.imdbID} onClick={() => onMovieSelect(movie)}>
          {movie.Title} ({movie.Year})
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
