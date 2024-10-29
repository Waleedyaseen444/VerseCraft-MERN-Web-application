// src/components/CharacterHistory.js
import React from 'react';

const CharacterHistory = ({ history }) => {
  return (
    <div className="character-history">
      <h2>Character History</h2>
      <ul>
        {history.map((character, index) => (
          <li key={index}>
            <strong>{character.name}</strong>: {character.appearance}, {character.backstory}, {character.role}, {character.genre}, {character.theme}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterHistory;
