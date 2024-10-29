import React, { useState } from 'react';
import Chat from './Chat';
import History from './History';

function MainContent({ currentPrompt, onNewPrompt, selectPrompt, prompts }) {
  const [currentChatMessages, setCurrentChatMessages] = useState([]);

  const updateChatMessages = (newMessages) => {
    setCurrentChatMessages(newMessages);
  };

  return (
    <div className="chatbot-main">
      <Chat currentPrompt={currentPrompt} onUpdateChatMessages={updateChatMessages} />
      <History
        onNewPrompt={onNewPrompt}
        currentChatMessages={currentChatMessages}
        selectPrompt={selectPrompt}
        prompts={prompts}
      />
    </div>
  );
}

export default MainContent;
