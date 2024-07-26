import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';

const moviesDb = [
  {
    title: 'Mad Max: Fury Road',
    description: 'In a post-apocalyptic wasteland, Max teams up with Furiosa to escape a warlord.',
    genre: 'Action',
    releaseYear: 2015,
  },
  {
    title: 'Die Hard',
    description: 'NYPD officer John McClane battles terrorists in a Los Angeles skyscraper.',
    genre: 'Action',
    releaseYear: 1988,
  },
  {
    title: 'Superbad',
    description: 'Two high school friends try to make it to a party to impress their crushes.',
    genre: 'Comedy',
    releaseYear: 2007,
  },
  {
    title: 'Step Brothers',
    description: 'Two middle-aged stepbrothers live together and create chaos.',
    genre: 'Comedy',
    releaseYear: 2008,
  },
  {
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over several years, finding solace and eventual redemption.',
    genre: 'Drama',
    releaseYear: 1994,
  },
  {
    title: 'Forrest Gump',
    description: 'The presidencies of Kennedy and Johnson, the Vietnam War, and more, seen through the eyes of an Alabama man with a low IQ.',
    genre: 'Drama',
    releaseYear: 1994,
  },
  {
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the task of planting an idea into the mind of a CEO.',
    genre: 'Sci-Fi',
    releaseYear: 2010,
  },
  {
    title: 'The Matrix',
    description: 'A computer hacker learns about the true nature of his reality and his role in the war against its controllers.',
    genre: 'Sci-Fi',
    releaseYear: 1999,
  },
];

const MovieRecommenderGPT = () => {
  const [genre, setGenre] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [movieInfo, setMovieInfo] = useState(null);

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const getRecommendations = () => {
    if (genre) {
      const filteredMovies = moviesDb.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
      setRecommendations(filteredMovies);
    } else {
      setRecommendations([]);
    }
  };

  const handleMovieSearch = () => {
    const foundMovie = moviesDb.find(movie => movie.title.toLowerCase() === movieName.toLowerCase());
    setMovieInfo(foundMovie ? foundMovie : null);
    setMovieName(movieName); 
  };

  return (
    <Container>
      <h1 className="my-4">Movie Recommender GPT</h1>

      <Form>
        <Form.Group controlId="genreSelect">
          <Form.Label>What type of movies do you like? (e.g., action, comedy, drama, sci-fi)</Form.Label>
          <Form.Control as="select" value={genre} onChange={handleGenreChange}>
            <option value="">Select Genre</option>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="sciFi">Sci-Fi</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={getRecommendations}>
          Get Recommendations
        </Button>
      </Form>

      <div className="my-4">
        {recommendations.length > 0 ? (
          recommendations.map((movie, index) => (
            <Card key={index} className="my-2">
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No recommendations available for the selected genre.</p>
        )}
      </div>

      <h2 className="my-4">Search for a Movie</h2>
      <Form.Group controlId="movieSearch">
        <Form.Label>Enter movie name:</Form.Label>
        <Form.Control 
          type="text" 
          value={movieName} 
          onChange={(e) => setMovieName(e.target.value)} 
          placeholder="Type movie name" 
        />
      </Form.Group>
      <Button variant="primary" onClick={handleMovieSearch}>
        Search Movie
      </Button>

      {movieInfo && (
        <Card className="my-4">
          <Card.Body>
            <Card.Title>{movieInfo.title}</Card.Title>
            <Card.Text><strong>Description:</strong> {movieInfo.description}</Card.Text>
            <Card.Text><strong>Genre:</strong> {movieInfo.genre}</Card.Text>
            <Card.Text><strong>Release Year:</strong> {movieInfo.releaseYear}</Card.Text>
          </Card.Body>
        </Card>
      )}
      {movieInfo === null && movieName && (
        <p>No movie found with the name "{movieName}".</p>
      )}
    </Container>
  );
};

export default MovieRecommenderGPT;
