import React, { Component } from 'react';
import './App.css';
import dotenv from 'dotenv';
dotenv.config();

const ytApiKey = process.env.REACT_APP_YT_API_KEY;
const ytResult = 10;
const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY;


class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      resultyt: [],
      title: 'Movie Search',
      viewMovie: false // Add a viewMovie state
    };
    this.searchInputRef = React.createRef(); // Create a ref for the search input
    this.searchClick = this.searchClick.bind(this);
    this.movieClick = this.movieClick.bind(this);
    this.backClick = this.backClick.bind(this);
  }

  searchClick(event) {
    event.preventDefault();
    let query = this.searchInputRef.current.value;
    let omdbUrl = `https://www.omdbapi.com/?apikey=${omdbApiKey}&s="${query}"&type=movie`;
    fetch(omdbUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        const resultOmdb = responseJson;
        this.setState({
          movies: resultOmdb.Search
        });
      })
      .catch((error) => {
        console.error(error);
      });
    this.searchInputRef.current.value = '';
  }

  movieClick(movie) {
    this.setState({ viewMovie: true });
    var movieYear = movie.Year;
    var movieTitle = movie.Title;
    var ytUrl = `https://www.googleapis.com/youtube/v3/search?q=${movieTitle} ${movieYear} trailer&order=relevance&part=snippet&type=video&maxResults=${ytResult}&key=${ytApiKey}`;
    fetch(ytUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        const resultyt = responseJson.items.map((obj) => "https://www.youtube.com/embed/" + obj.id.videoId);
        this.setState({ resultyt });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  backClick() {
    this.setState({ viewMovie: false });
  }

  renderNormal() {
    let title = this.state.title;
    var movies = this.state.movies.map((movie, i) => {
      return (
        <div className="movie-card" key={i} onClick={() => this.movieClick(movie)}>
          <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
          <div className="movie-info">
            <h2>{movie.Title}</h2>
            <p>({movie.Year})</p>
          </div>
        </div>
      );
    });    
    return (
      <div className="flex-container">
        <h1 className="harsh">{title}</h1>
        <form className="search-form">
          <input className="app_input" ref={this.searchInputRef} type="text" placeholder="Search for a movie..." />
          <button className="search-button" onClick={this.searchClick}>Search</button>
        </form>
        <div className="movies-list">{movies}</div>
      </div>
    );
  }

  renderView() {
    return (
      <div className="flex-container">
        <h1>Movie Details</h1>
        <div className="movie-details">
          {this.state.resultyt.map((link, i) => (
            <iframe key={i} title={`YouTube Video ${i}`} width="100%" height="500px" src={link} frameBorder="0" allowFullScreen></iframe>
          ))}
        </div>
        <button className="back-button" onClick={this.backClick}>Back to Search</button>
      </div>
    );
  }

  render() {
    if (this.state.viewMovie) {
      return this.renderView();
    } else {
      return this.renderNormal();
    }
  }
}

export default App;
