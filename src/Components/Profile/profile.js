import React, { useEffect, useState } from "react";
import './profile.css'; // Ensure the CSS is linked correctly
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import menuIcon from '../Images/Logo-V.png';
import profileIcon from '../Images/generic-user-profile-picture.png';
import favIcon from '../Images/fav.png';
import notiIcon from '../Images/noti.png';
import setIcon from '../Images/set.png';
import journalIcon from '../Images/journal.png';
import userbackground from '../Images/user-background-image.png';
import botIcon from "../Images/Bot.png";
import image01 from "../Images/image01.webp";
import image02 from "../Images/image02.webp";
import image03 from "../Images/image03.webp";
import image04 from "../Images/image04.webp";

const Profile = () => {
  const navigate = useNavigate();

  // State variables for user data
  const [user, setUser] = useState(null); // User object
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('token');

        // If no token is found, redirect to login page
        if (!token) {
          navigate('/login');
          return;
        }

        // Make a GET request to fetch user data
        const response = await axios.get('http://localhost:5001/api/users/profile', {
          headers: {
            'x-auth-token': token,
          },
        });

        // Update state with user data
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);


 // Fetch user data on component mount
 useEffect(() => {
  const fetchUserData = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');

      // If no token is found, redirect to login page
      if (!token) {
        navigate('/login');
        return;
      }

      // Make a GET request to fetch user data
      const response = await axios.get('http://localhost:5001/api/users/profile', {
        headers: {
          'x-auth-token': token,
        },
      });

      // Update state with user data
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load user data');
      setLoading(false);
    }
  };

  fetchUserData();
}, [navigate]);

  // Navigation functions
  const handleHomepageClick = () => navigate('/Homepage');
  const handleProjectsClick = () => navigate('/Saved');
  const handleFavoriteClick = () => navigate('/Favorite');
  const handleChatbotClick = () => navigate('/Chatbot');
  const handleNotificationClick = () => navigate('/Notification');
  const handleSettingClick = () => navigate('/Setting');
  const handleProfileClick = () => navigate('/Profile');

  // Sample data for works in progress
  const worksInProgress = [
    { title: 'The Mystic Land', progress: 40 },
    { title: 'Hidden Secrets', progress: 70 },
    { title: 'Across the Universe', progress: 20 },
  ];

  // Array of published works
  const publishedWorks = [
    { image: image01, title: 'The Enchanted Forest', summary: 'A journey through the magical forest filled with wonder.', rating: 4.5 },
    { image: image02, title: 'Mysteries of the Deep Sea', summary: 'Exploring the secrets of the deep blue ocean.', rating: 4.8 },
    { image: image03, title: 'Galactic Adventures', summary: 'An interstellar quest across galaxies and beyond.', rating: 4.2 },
    { image: image04, title: 'Tokyo Undone', summary: 'Jump into the cyberpunk universe of creation', rating: 4.2 },
  ];

  // Handle loading and error states
  if (loading) {
    return <div className="profile-container">Loading...</div>;
  }

  if (error) {
    return <div className="profile-container">{error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="homepage-header">
        <header className="homepage-header-item">
          <img src={menuIcon} alt="Menu" className="homepage-menu-icon" />
          <div className="homepage-app-title" onClick={handleHomepageClick}>VerseCraft</div>
          <nav>
            <ul>
              <li className="homepage-Plot" onClick={handleProjectsClick}>
                <img src={journalIcon} alt="Projects" className="homepage-character-icon" />
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
                <img             src={`http://localhost:5001/${user.profileImage}`} // Display the user's profile image
 alt="Profile" className="homepage-profile-icon" />
                {user.fullname}
              </li>
            </ul>
          </nav>
        </header>
      </div>

      <div className="profile-dashboard">
        {/* Left side panel for works in progress */}
        <div className="profile-left-sidepanel">
          <div className="profile-left-sidepanel-heading">Works in Progress</div>
          <div className="profile-left-sidepanel-project-list">
            {worksInProgress.map((project, index) => (
              <div className="profile-left-sidepanel-project-container" key={index}>
                <div className="profile-left-sidepanel-project-text">{project.title}</div>
                <div className="profile-left-sidepanel-progress-bar-container">
                  <div
                    className="profile-left-sidepanel-progress-bar"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Background image */}
        <div className="profile-background-image">
          <img src={userbackground} alt="userback" className="user-background-image" />
        </div>

        {/* Profile image */}
        <div className="profile-user-image">
          <img
            src={`http://localhost:5001/${user.profileImage}`} // Display the user's profile image
            alt="user"
            className="user-image"
          />
        </div>

        {/* Biography */}
        <div className="profile-bio">
          <p className="profile-bio-description">{user.description}</p>
        </div>

        {/* Preferred genres */}
        <div className="profile-preferred-genres">
          <div className="profile-preferred-genres-container">
            <div className="genre-item">
              <div className="genre-text">Fantasy</div>
            </div>
            <div className="genre-item">
              <div className="genre-text">Mystery</div>
            </div>
            <div className="genre-item">
              <div className="genre-text">Romance</div>
            </div>
            <div className="genre-item">
              <div className="genre-text">Science Fiction</div>
            </div>
          </div>
        </div>

        {/* Social media links */}
        <div className="profile-social-container">
          <div className="profile-facebook"></div>
          <div className="profile-instagram"></div>
          <div className="profile-twitter"></div>
          <div className="profile-linkedin"></div>
        </div>

        {/* Contact methods */}
        <div className="profile-contact-container">
          <div className="profile-contact-phone">
            <div className="profile-contact-icon"></div>
            <span className="profile-contact-text">+92 456 7890</span>
          </div>
          <div className="profile-contact-email">
            <div className="profile-contact-icon"></div>
            <span className="profile-contact-text">{user.email}</span>
          </div>
        </div>

        {/* Published Works within Dashboard */}
        <div className="profile-published-works-container">
          <div className="profile-published-works-heading">Published Works</div>
          {publishedWorks.map((work, index) => (
            <div className="profile-published-work-items" key={index}>
              <div
                className="profile-published-work-image"
                style={{ backgroundImage: `url(${work.image})` }}
              ></div>
              <div className="profile-published-work-title">{work.title}</div>
              <div className="profile-published-work-summary">{work.summary}</div>
              <div className="profile-published-work-rating">Rating: {work.rating} ⭐</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



export default Profile;
