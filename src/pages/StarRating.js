import React from 'react';
import styled from 'styled-components';

const StarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled.span`
  font-size: 20px;
  color: ${props => (props.$filled ? '#FFD700 !important' : '#ccc !important')};
  cursor: pointer;
`;

const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star key={i} $filled={i <= rating}>
        ★
      </Star>
    );
  }

  return <StarContainer>{stars}</StarContainer>;
};

export default StarRating;