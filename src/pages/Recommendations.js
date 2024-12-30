import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const RecommendationsContainer = styled.div`
  padding: 20px;
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

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get('/api/recommendations');
        setRecommendations(response.data);
      } catch (err) {
        setError('Erreur lors du chargement des recommandations');
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  if (loading) return <LoadingMessage>Chargement...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <RecommendationsContainer>
      <h1>Recommandations de Films</h1>
      <MovieList>
        {recommendations.length > 0 ? (
          recommendations.map((movie) => (
            <MovieItem key={movie._id}>{movie.title}</MovieItem>
          ))
        ) : (
          <p>Aucune recommandation trouvée</p>
        )}
      </MovieList>
    </RecommendationsContainer>
  );
};

export default Recommendations;