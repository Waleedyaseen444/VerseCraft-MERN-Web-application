// src/CharacterCard.js
import React from 'react';
import styled from 'styled-components';

// Styled-components for card and elements
const Card = styled.div`
  background-color: ${() => `hsl(${Math.random() * 360}, 100%, 95%)`}; // dynamic background color
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  width: 300px;
  margin: 20px;
`;

const ProfilePicture = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Name = styled.h2`
  font-size: 1.5rem;
  margin: 10px 0;
`;

const DetailRow = styled.div`
  font-size: 1rem;
  padding: 10px 0;
  color: #555;
  border-bottom: 1px solid #ddd;  // Adding a border between rows
  &:last-child {
    border-bottom: none; // Remove border for the last row
  }
`;

const CharacterCard = ({ image, name, details }) => {
  return (
    <Card>
      <ProfilePicture>
        <ProfileImage src={image} alt={`${name}'s profile`} />
      </ProfilePicture>
      <Name>{name}</Name>
      {details.map((detail, index) => (
        <DetailRow key={index}>{detail}</DetailRow>
      ))}
    </Card>
  );
};

export default CharacterCard;
