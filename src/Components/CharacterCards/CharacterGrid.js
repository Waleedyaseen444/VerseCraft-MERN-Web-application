// src/CharacterGrid.js
import React from 'react';
import styled from 'styled-components';
import CharacterCard from './CharacterCard';

// Styled component for the grid layout
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // Exactly 3 cards per row
  gap: 20px;
  padding: 40px;
  justify-items: center;
  height: 100vh; // Make the height full to enable scrolling when content overflows
  overflow-y: auto; // Allow vertical scrolling
`;

// Placeholder data (we added more to reach 10 cards)
const characterData = [
  {
    name: 'John Doe',
    image: 'https://via.placeholder.com/100',
    details: ['Age: 30', 'Occupation: Writer', 'Location: New York']
  },
  {
    name: 'Jane Smith',
    image: 'https://via.placeholder.com/100',
    details: ['Age: 28', 'Occupation: Developer', 'Location: San Francisco']
  },
  {
    name: 'Samuel Green',
    image: 'https://via.placeholder.com/100',
    details: ['Age: 35', 'Occupation: Designer', 'Location: London']
  },
  {
    name: 'Emily White',
    image: 'https://via.placeholder.com/100',
    details: ['Age: 40', 'Occupation: Manager', 'Location: Chicago']
  },
  {
    name: 'Michael Blue',
    image: 'https://via.placeholder.com/100',
    details: ['Age: 29', 'Occupation: Analyst', 'Location: Boston']
  },
  {
    name: 'Sarah Brown',
    image: 'https://via.placeholder.com/100',
    details: ['Age: 33', 'Occupation: Artist', 'Location: Miami']
  },
  {
    name: 'Lisa Black',
    image: 'https://via.placeholder.com/100',
    details: ['Age: 27', 'Occupation: Consultant', 'Location: Seattle']
  },
  {
    name: 'James Yellow',
    image: 'https://via.placeholder.com/100',
    details: ['Age: 31', 'Occupation: Scientist', 'Location: Denver']
  },
  {
    name: 'Anna Violet',
    image: 'https://via.placeholder.com/100',
    details: ['Age: 26', 'Occupation: Teacher', 'Location: Austin']
  },
  {
    name: 'David Gray',
    image: 'https://via.placeholder.com/100',
    details: ['Age: 34', 'Occupation: Engineer', 'Location: Dallas']
  },
];

const CharacterGrid = () => {
  return (
    <div>
    <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Character Cards</h1>
    <Grid>
      {characterData.map((character, index) => (
        <CharacterCard
          key={index}
          name={character.name}
          image={character.image}
          details={character.details}
        />
      ))}
    </Grid>
    </div>
  );
};

export default CharacterGrid;
