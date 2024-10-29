import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './styles/ChatbotApp.css';  // Updated to use the renamed CSS file

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

  return (
    <div className="chatbot-app">
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
