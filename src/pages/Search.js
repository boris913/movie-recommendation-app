import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SearchContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #141414;
  min-height: 100vh;
`;

const MovieList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MovieItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const LoadingMessage = styled.p`
  color: blue;
`;

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/search?query=${query}`);
        setMovies(response.data);
      } catch (err) {
        console.error(err); // Ajoutez cette ligne pour vérifier les erreurs
        setError('Erreur lors du chargement des films');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchMovies();
    } else {
      setLoading(false);
    }
  }, [query]);

  return (
    <SearchContainer>
      <h1 style={{ color: 'white' }}>Résultats de la recherche pour "{query}"</h1>
      {loading && <LoadingMessage>Chargement...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!loading && !error && (
        <MovieList>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieItem key={movie._id}>{movie.title}</MovieItem>
            ))
          ) : (
            <p style={{ color: 'grey' }}>Aucun film trouvé</p>
          )}
        </MovieList>
      )}
    </SearchContainer>
  );
};

export default Search;