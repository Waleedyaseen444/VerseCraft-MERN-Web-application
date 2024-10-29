// src/CharacterForm.js
import React, { useState } from 'react';

const CharacterForm = ({ setCharacterHistory }) => {
  const [characterData, setCharacterData] = useState({
    name: '',
    appearance: '',
    backstory: '',
    role: '',
    genre: '',
    theme: '',
  });
  const [avatars, setAvatars] = useState([]); // Store all generated avatars

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAvatar = `https://robohash.org/${characterData.name}.png?size=200x200`;
    setAvatars((prevAvatars) => [...prevAvatars, newAvatar]);
    setCharacterHistory((prevHistory) => [...prevHistory, characterData]);
    setCharacterData({
      name: '',
      appearance: '',
      backstory: '',
      role: '',
      genre: '',
      theme: '',
    });
  };

  const handleExport = () => {
    // Export functionality logic here
    console.log("Exporting character data...");
  };

  const handleSave = () => {
    // Save functionality logic here
    console.log("Saving character data...");
  };

  return (
    <div className="avatar-character-form">
      <h2>Create Your Character</h2>
      <div className="avatar-avatar-preview">
        {avatars.map((avatar, index) => (
          <img key={index} src={avatar} alt="Character Avatar" />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={characterData.name}
          onChange={handleChange}
          placeholder="Character Name"
          required
        />
        <textarea
          name="appearance"
          value={characterData.appearance}
          onChange={handleChange}
          placeholder="Appearance Description"
          required
        />
        <textarea
          name="backstory"
          value={characterData.backstory}
          onChange={handleChange}
          placeholder="Backstory"
          required
        />
        <input
          type="text"
          name="role"
          value={characterData.role}
          onChange={handleChange}
          placeholder="Role"
          required
        />
        <input
          type="text"
          name="genre"
          value={characterData.genre}
          onChange={handleChange}
          placeholder="Genre"
          required
        />
        <select name="theme" value={characterData.theme} onChange={handleChange} required>
          <option value="">Select a Theme</option>
          <option value="Heroic">Heroic</option>
          <option value="Dark">Dark</option>
          <option value="Mystical">Mystical</option>
        </select>
        <div className="avatar-button-group">
          <button type="submit" className="avatar-generate-btn">Generate Character</button>
          <button type="button" onClick={handleExport} className="avatar-export-btn">Export</button>
          <button type="button" onClick={handleSave} className="avatar-save-btn">Save</button>
        </div>
      </form>
    </div>
  );
};

export default CharacterForm;
