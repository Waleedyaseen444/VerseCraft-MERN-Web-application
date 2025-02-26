// Favorites.js
import React, { useState } from "react";
import './favorites.css'; // Create a separate CSS file for Favorites
import { useNavigate } from 'react-router-dom';
import profileIcon from '../Images/generic-user-profile-picture.png';
import closeIcon from "../Images/Close-black.png";
import favoriteImage1 from "../Images/image01.webp";
import favoriteImage2 from "../Images/image02.webp";
import favoriteImage3 from "../Images/image04.webp";
import favoriteImage4 from "../Images/image05.webp";
import logoIcon from '../Images/Logo-V.png';
import Header from '../Header/header';


const Favorites = () => {
  const navigate = useNavigate();

  // State for search and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("title");
  const [user, setUser] = useState(null);

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
      image: favoriteImage3,
      title: 'Echoes of Eternity',
      summary: 'A story that transcends time and space.',
      rating: 4.6,
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
      image: favoriteImage3,
      title: 'Echoes of Eternity',
      summary: 'A story that transcends time and space.',
      rating: 4.6,
    },
    {
      image: favoriteImage3,
      title: 'Echoes of Eternity',
      summary: 'A story that transcends time and space.',
      rating: 4.6,
    },
    {
      image: favoriteImage3,
      title: 'Echoes of Eternity',
      summary: 'A story that transcends time and space.',
      rating: 4.6,
    },
    {
      image: favoriteImage3,
      title: 'Echoes of Eternity',
      summary: 'A story that transcends time and space.',
      rating: 4.6,
    },
    {
      image: favoriteImage3,
      title: 'Echoes of Eternity',
      summary: 'A story that transcends time and space.',
      rating: 4.6,
    },
    {
      image: favoriteImage3,
      title: 'Echoes of Eternity',
      summary: 'A story that transcends time and space.',
      rating: 4.6,
    },
    {
      image: favoriteImage3,
      title: 'Echoes of Eternity',
      summary: 'A story that transcends time and space.',
      rating: 4.6,
    },
    
    
    // Add more favorite works as needed
  ];

  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const gridContainer = document.querySelector('.favorites-works-grid');
    const scrollPosition = (pageNumber - 1) * gridContainer.offsetWidth;
    gridContainer.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  };

  const renderPagination = () => {
    const pageCount = Math.ceil(filteredFavorites.length / itemsPerPage);
    const paginationButtons = [];

    for (let i = 1; i <= pageCount; i++) {
      paginationButtons.push(
        <button
          key={i}
          className={`pagination-button ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pagination-container">
        {paginationButtons}
      </div>
    );
  };

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
     <Header/>

      {/* Dashboard Area */}
      <div className="favorites-dashboard">
        <h1>Favorites</h1>
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

        <div className="favorites-works-grid">
        {filteredFavorites.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((work, index) => (
          <div className="favorite-work-item" key={index}>
            <div
              className="favorite-work-image"
              style={{ backgroundImage: `url(${work.image})` }}
            ></div>
            <div className="favorite-work-details">
              <h3 className="favorite-work-title">{work.title}</h3>
              <p className="favorite-work-summary">{work.summary}</p>
             
            </div>
            <div className="favorite-work-rating">{work.rating} ⭐</div>
            <div className="favorite-genre-container">
              Genres
              <div className="favorite-genre-types">
                <span className="genre-tag">Action</span>
                <span className="genre-tag">Adventure</span>
                <span className="genre-tag">Comedy</span>
                <span className="genre-tag">Drama</span>
                <span className="genre-tag">Fantasy</span>
              </div>
            </div>

            
            
          </div>
        ))}
      </div>
      {renderPagination()}

        
      </div>

      <div className="favorite-suggestions-container">
        Suggestions
      </div>
    </div>
  );
};

export default Favorites;
