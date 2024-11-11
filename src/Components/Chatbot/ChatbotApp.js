import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './styles/ChatbotApp.css';  // Updated to use the renamed CSS file
import { Link, useNavigate } from 'react-router-dom';
import menuIcon from '../Images/Logo-V.png';
import plotIcon from '../Images/Plot.png';
import characterIcon from '../Images/Character.png';
import publishIcon from '../Images/Published.png';
import profileIcon from '../Images/generic-user-profile-picture.png';
import goalIcon from '../Images/goal.png';
import favIcon from '../Images/fav.png';
import notiIcon from '../Images/noti.png';
import setIcon from '../Images/set.png';
import journalIcon from '../Images/journal.png';
import commIcon from '../Images/comm.png';
import comIcon from "../Images/comm.png"
import plusIcon from '../Images/Plus.png';
import botIcon from "../Images/Bot.png";


function ChatbotApp() {
  const [currentPrompt, setCurrentPrompt] = useState(null);
  const [prompts, setPrompts] = useState([]); 

  const handleNewPrompt = () => {
    const newPrompt = {
      title: 'New Prompt',
      messages: []
    };
    setPrompts([...prompts, newPrompt]);
    setCurrentPrompt(newPrompt); 
  };

  const selectPrompt = (selectedPromptIndex) => { 
    setCurrentPrompt(prompts[selectedPromptIndex]); 

    
  };

  const navigate = useNavigate();

  const handleHomepageClick = () => {
    navigate('/Homepage');
  };

 
  const handleProfileClick = () => {
    navigate('/Profile');
  };

  const handleProjectsClick = () => {
    navigate('/Saved');
  };

  const handleNotificationClick = () => {
    navigate('/Notification');
  };



  const handleSettingClick = () => {
    navigate('/Setting');
  };

  const handleChatbotClick = () => {
    navigate('/Chatbot'); // Assuming your profile page route is '/profile'
  };

  const handleFavoriteClick = () => {
    navigate('/Favorites');
  };

  return (
    <div className="chatbot-app">

<div className="chatbot-header">
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

      <div className="chatbot-container">

     


        <Sidebar />
        <MainContent 
          currentPrompt={currentPrompt} 
          onNewPrompt={handleNewPrompt}
          selectPrompt={selectPrompt}
          prompts={prompts} 
        /> 
      </div>
    </div>
  );
}

export default ChatbotApp;
