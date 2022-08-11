const tmdbKey = '591f1ce6e0d85a32be323a453ec87696';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async() => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  // const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;
  const urlToFetch = 'https://api.themoviedb.org/3/genre/movie/list?api_key=591f1ce6e0d85a32be323a453ec87696';
  try {
    const response = await fetch(urlToFetch);
    if (response.ok){
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      console.log(genres);
      return genres;
    }
  } catch (error){
    console.log(error);
  }
};

const getMovies = () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbkey}&with_genres=${selectedGenre}`;
  const urlToFetch = `https://api.themoviedb.org/3/discover/movie?api_key=591f1ce6e0d85a32be323a453ec87696&with_genres=${selectedGenre}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok){
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      console.log(movies);
      return movies;
    }
  } catch (error){
    console.log(error);
  }
};

const getMovieInfo = (movie) => {
  const movieId = movie.id;
  const movieEndpoint = '/movie/${movieId}';
  const requestParams = '?api_key=${tmdbkey}';
  const urlToFetch = 'https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbkey}';
  try {
    const response = await fetch(urlToFetch);
    if (response.ok){
      const movieInfo = await response.json();
      return movieInfo;
    }
  } catch (error){
    console.log(error);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async() => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
