import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './styles/ChatbotApp.css';  // Updated to use the renamed CSS file
import { useNavigate } from 'react-router-dom';
import menuIcon from '../Images/Logo-V.png';
import journalIcon from '../Images/journal.png';
import favIcon from '../Images/fav.png';
import notiIcon from '../Images/noti.png';
import setIcon from '../Images/set.png';
import profileIcon from '../Images/generic-user-profile-picture.png';
import botIcon from "../Images/Bot.png";
import logoIcon from '../Images/Logo-V.png';
import Header from '../Header/header';

function ChatbotApp() {
  const [currentPrompt, setCurrentPrompt] = useState(null);
  const [prompts, setPrompts] = useState([]);
  const [user, setUser] = useState(null);

  const handleNewPrompt = () => {
    const newPrompt = {
      id: Date.now(), // Unique ID for each prompt
      title: 'New Prompt',
      messages: []
    };
    setPrompts([...prompts, newPrompt]);
    setCurrentPrompt(newPrompt);
  };

  const selectPrompt = (selectedPromptId) => {
    const selectedPrompt = prompts.find(p => p.id === selectedPromptId);
    setCurrentPrompt(selectedPrompt);
  };

  const onUpdateCurrentPrompt = (updatedPrompt) => {
    setCurrentPrompt(updatedPrompt);
    setPrompts(prompts.map(p => (p.id === updatedPrompt.id ? updatedPrompt : p)));
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
    navigate('/Chatbot');
  };

  const handleFavoriteClick = () => {
    navigate('/Favorites');
  };

  return (
    <div className="chatbot-app">

    <Header/>

      <div className="chatbot-container">
        <Sidebar />
        <MainContent
          currentPrompt={currentPrompt}
          onNewPrompt={handleNewPrompt}
          selectPrompt={selectPrompt}
          prompts={prompts}
          onUpdateCurrentPrompt={onUpdateCurrentPrompt}
        />
      </div>
    </div>
  );
}

export default ChatbotApp;
