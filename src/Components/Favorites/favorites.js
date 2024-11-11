// Favorites.js
import React, { useState } from "react";
import './favorites.css'; // Create a separate CSS file for Favorites
import { useNavigate } from 'react-router-dom';
import menuIcon from '../Images/Logo-V.png';
import profileIcon from '../Images/generic-user-profile-picture.png';
import favIcon from '../Images/fav.png';
import notiIcon from '../Images/noti.png';
import setIcon from '../Images/set.png';
import journalIcon from '../Images/journal.png';
import botIcon from "../Images/Bot.png";
import closeIcon from "../Images/Close-black.png";
import favoriteImage1 from "../Images/image01.webp";
import favoriteImage2 from "../Images/image02.webp";
import favoriteImage3 from "../Images/image04.webp";
import favoriteImage4 from "../Images/image05.webp";

const Favorites = () => {
  const navigate = useNavigate();

  // State for search and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("title");

  // Array of favorite works
  const favoriteWorks = [
    {
      image: favoriteImage1,
      title: 'Whispers in the Wind',
      summary: 'A tale of love and loss carried by the gentle breeze.',
      rating: 4.7,
    },
    {
      image: favoriteImage2,
      title: 'Shadow Realm',
      summary: 'Exploring the dark and mysterious shadowy dimensions.',
      rating: 4.9,
    },
    {
      image: favoriteImage3,
      title: 'Echoes of Eternity',
      summary: 'A story that transcends time and space.',
      rating: 4.6,
    },
    {
      image: favoriteImage4,
      title: 'Celestial Odyssey',
      summary: 'An epic journey through the stars and beyond.',
      rating: 4.8,
    },
    // Add more favorite works as needed
  ];

  // Handlers for navigation
  const handleHomepageClick = () => {
    navigate('/Homepage');
  };

  const handleProjectsClick = () => {
    navigate('/Saved');
  };

  const handleFavoriteClick = () => {
    navigate('/Favorite'); 
  };

  const handleChatbotClick = () => {
    navigate('/Chatbot');
  };

  const handleNotificationClick = () => {
    navigate('/Notification');
  };

  const handleSettingClick = () => {
    navigate('/Setting');
  };

  const handleProfileClick = () => {
    navigate('/Profile');
  };

  // Handler for search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handler for sorting
  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  // Filter and sort favorite works based on search term and sort criteria
  const filteredFavorites = favoriteWorks
    .filter(work => 
      work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.summary.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortCriteria === "rating") {
        return b.rating - a.rating;
      } else {
        return 0;
      }
    });

  return (
    <div className="favorites-container">
      {/* Header with Navigation */}
      <div className="homepage-header">
        <header className="homepage-header-item">
          <img src={menuIcon} alt="Menu" className="homepage-menu-icon" />
          <div className="homepage-app-title" onClick={handleHomepageClick}>VerseCraft</div>
          <nav>
            <ul>
              <li className="homepage-Plot" onClick={handleProjectsClick}>
                <img src={journalIcon} alt="My Projects" className="homepage-character-icon" />
                My Projects
              </li>
              <li className="homepage-Character" onClick={handleFavoriteClick}>
                <img src={favIcon} alt="Favorites" className="homepage-character-icon" />
                Favorites
              </li>
              <li className="homepage-Chatbot" onClick={handleChatbotClick}>
                <img src={botIcon} alt="InspireBot" className="homepage-chatbot-icon" />
                InspireBot
              </li>
              <li className="homepage-Published" onClick={handleNotificationClick}>
                <img src={notiIcon} alt="Notifications" className="homepage-publish-icon" />
                Notifications
              </li>
              <li className="homepage-inspire-bot" onClick={handleSettingClick}>
                <img src={setIcon} alt="Settings" className="homepage-bot-icon" />
                Settings
              </li>
              <li className="homepage-Profile" onClick={handleProfileClick}>
                <img src={profileIcon} alt="Profile" className="homepage-profile-icon" />
                John Doe
              </li>
            </ul>
          </nav>
        </header>
      </div>

      {/* Dashboard Area */}
      <div className="favorites-dashboard">
        {/* Page Header */}
        <div className="favorites-header">
          <h1>My Favorite Works</h1>
          <div className="favorites-summary">
            <span>Total Favorites: {favoriteWorks.length}</span>
          </div>
        </div>

        {/* Search and Sort Controls */}
        <div className="favorites-controls">
          <input
            type="text"
            placeholder="Search favorites..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="favorites-search-bar"
          />
          <select value={sortCriteria} onChange={handleSortChange} className="favorites-sort-dropdown">
            <option value="title">Sort by Title</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>

        {/* Favorite Works Grid */}
        <div className="favorites-works-grid">
          {filteredFavorites.map((work, index) => (
            <div className="favorite-work-item" key={index}>
              <div
                className="favorite-work-image"
                style={{ backgroundImage: `url(${work.image})` }}
              ></div>
              <div className="favorite-work-details">
                <h3 className="favorite-work-title">{work.title}</h3>
                <p className="favorite-work-summary">{work.summary}</p>
                <div className="favorite-work-rating">Rating: {work.rating} ⭐</div>
              </div>
              <button className="remove-favorite-button">
              <img src={closeIcon} alt="Profile" className="favorite-close-icon" />
              </button>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="favorites-actions">
          <button className="clear-favorites-button">Clear All Favorites</button>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
