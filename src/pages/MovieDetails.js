import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  padding: 20px;
  background-color: #141414;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 60vh;
  background-size: cover;
  background-position: center;
  margin-bottom: 20px;
`;

const MovieContent = styled.div`
  max-width: 800px;
  text-align: center;
`;

const MovieTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
`;

const MovieDescription = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const MovieReleaseDate = styled.p`
  font-size: 16px;
  color: #888;
  margin-bottom: 20px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #e50914;
  color: white;
  margin: 10px;
`;

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
        console.log(response.data);
        setMovie(response.data);
      } catch (error) {
        setError('Erreur lors du chargement des détails du film');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <DetailsContainer>Chargement...</DetailsContainer>;
  }

  if (error) {
    return <DetailsContainer>{error}</DetailsContainer>;
  }

  return (
    <DetailsContainer>
      {movie && (
        <>
          <BackgroundImage style={{ backgroundImage: `url(${movie.backgroundImage})` }} />
          <MovieContent>
            <MovieTitle>{movie.title}</MovieTitle>
            <MovieDescription>{movie.description}</MovieDescription>
            <MovieReleaseDate>Date de sortie: {new Date(movie.release_date).toLocaleDateString()}</MovieReleaseDate>
            <ActionButton>Lire</ActionButton>
            <ActionButton>Ajouter à la liste</ActionButton>
          </MovieContent>
        </>
      )}
    </DetailsContainer>
  );
};

export default MovieDetails;