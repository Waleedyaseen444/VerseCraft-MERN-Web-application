import React, { useEffect, useState } from "react";
import './settings.css';
import menuIcon from '../Images/Logo-V.png';
import profileIcon from '../Images/generic-user-profile-picture.png';
import favIcon from '../Images/fav.png';
import notiIcon from '../Images/noti.png';
import setIcon from '../Images/set.png';
import journalIcon from '../Images/journal.png';
import AccountInfo from './account-info';
import {useNavigate } from 'react-router-dom';
import botIcon from "../Images/Bot.png";

function Settings(){

    const navigate = useNavigate();

  
    const handleHomepageClick = () => {
      navigate('/Homepage'); // Assuming your profile page route is '/profile'
    };
  
    const handleProjectsClick = () => {
      navigate('/Saved'); // Assuming your profile page route is '/profile'
    };
  
    const handleFavoriteClick = () => {
      navigate('/Favorite'); 
    };
  
    const handleNotificationClick = () => {
      navigate('/Notification'); // Assuming your profile page route is '/profile'
    };
  
    const handleSettingClick = () => {
      navigate('/Setting'); // Assuming your profile page route is '/profile'
    };
  
    const handleProfileClick = () => {
      navigate('/Profile'); // Assuming your profile page route is '/profile'
    };

    const handleLogoutClick = () => {
      navigate('/Login'); // Assuming your profile page route is '/profile'
    };

    const handleChatbotClick = () => {
      navigate('/Chatbot'); // Assuming your profile page route is '/profile'
    };

  


    return(
        <div className="setting-container">
           <div className="homepage-header">
        <header className="homepage-header-item">
          <img src={menuIcon} alt="Menu" className="homepage-menu-icon"  />
          <div className="homepage-app-title" onClick={handleHomepageClick} >VerseCraft</div>
          <nav>
            <ul>
            <li className="homepage-Plot" onClick={handleProjectsClick}>
                <img src={journalIcon} alt="Character" className="homepage-character-icon" />
                My Projects
              </li>
              <li className="homepage-Character" onClick={handleFavoriteClick}>
                <img src={favIcon} alt="Character" className="homepage-character-icon" />
                Favorites
              </li>

              <li className="homepage-Chatbot" onClick={handleChatbotClick}>
                <img src={botIcon} alt="homepage-chatbot" className="homepage-chatbot-icon" />
                InspireBot
              </li>
              
              <li className="homepage-Published" onClick={handleNotificationClick} >
                <img src={notiIcon} alt="Published Works" className="homepage-publish-icon" />
                Notifications
              </li>
              <li className="homepage-inspire-bot" onClick={handleSettingClick} >
                <img src={setIcon} alt="InspireBot" className="homepage-bot-icon" />
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



      

            <div className="setting-sidepanel">
                <h1>Settings</h1>
                <button class="setting-account">Profile Information</button>
                <button class="setting-privacy">Privacy Information</button>
                <button class="setting-analytics">Account Analytcs</button>
                <button class="setting-setting">Account Settings</button>
                <button class="setting-logout" onClick={handleLogoutClick}>Logout</button>
            </div>

            <div className="setting-dashboard">
                <AccountInfo/>

            </div>
        </div>
    );

}

export default Settings;
