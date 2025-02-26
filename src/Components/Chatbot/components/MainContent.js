import React from 'react';
import Chat from './Chat';
import History from './History';

function MainContent({ currentPrompt, onNewPrompt, selectPrompt, prompts, onUpdateCurrentPrompt }) {
  return (
    <div className="chatbot-main">
      <Chat
        currentPrompt={currentPrompt}
        onUpdateCurrentPrompt={onUpdateCurrentPrompt}
      />
      <History
        onNewPrompt={onNewPrompt}
        selectPrompt={selectPrompt}
        prompts={prompts}
      />
    </div>
  );
}

export default MainContent;
