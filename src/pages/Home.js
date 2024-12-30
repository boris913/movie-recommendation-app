import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StarRating from './StarRating'; // Assurez-vous que le chemin est correct

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #141414;
  min-height: 100vh;
`;

const SearchInput = styled.input`
  padding: 10px;
  margin: 20px 0;
  font-size: 16px;
  width: 300px;
  border: none;
  border-radius: 4px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #e50914;
  color: white;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin-top: 40px;
`;

const MovieCard = styled.div`
  background-color: #333;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const MovieImage = styled.img`
  width: 100%;
  height: auto;
`;

const MovieContent = styled.div`
  padding: 20px;
  color: white;
`;

const MovieTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 10px 0;
`;

const MovieDescription = styled.p`
  font-size: 14px;
  margin: 0 0 10px 0;
  color: #aaa;
`;

const MovieReleaseDate = styled.p`
  font-size: 12px;
  color: #888;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const LoadingMessage = styled.p`
  color: blue;
`;

const Home = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies');
        setMovies(response.data);
      } catch (error) {
        setError('Erreur lors du chargement des films');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = () => {
    navigate(`/search?query=${query}`);
  };

  const handleMovieClick = (id) => {
    navigate(`/movies/${id}`);
  };

  return (
    <HomeContainer>
      <h1 style={{ color: 'white' }}>Recherche de Films</h1>
      <SearchInput
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un film..."
      />
      <SearchButton onClick={handleSearch}>Rechercher</SearchButton>
      {loading ? (
        <LoadingMessage>Chargement...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <MovieGrid>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie._id} onClick={() => handleMovieClick(movie._id)}>
                <MovieImage src={`https://via.placeholder.com/250x250?text=${movie.title}`} alt={movie.title} />
                <MovieContent>
                  <MovieTitle>{movie.title}</MovieTitle>
                  <MovieDescription>{movie.description}</MovieDescription>
                  <MovieReleaseDate>Date de sortie: {new Date(movie.release_date).toLocaleDateString()}</MovieReleaseDate>
                  <StarRating rating={4.5} />{/* <StarRating rating={movie.rating} /> */}
                </MovieContent>
              </MovieCard>
            ))
          ) : (
            <p style={{ color: 'white' }}>Aucun film trouvé</p>
          )}
        </MovieGrid>
      )}
    </HomeContainer>
  );
};

export default Home;