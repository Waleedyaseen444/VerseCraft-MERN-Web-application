import React from 'react';

function History({ onNewPrompt, currentChatMessages, selectPrompt, prompts }) {
  const createNewPrompt = () => {
    onNewPrompt();
  };

  return (
    <div className="chatbot-history">
      <div className="chatbot-history-header">
        <h3>History</h3>
        <button className="chatbot-new-prompt-button" onClick={createNewPrompt}>New Prompt</button>
      </div>
      <div className="chatbot-history-items">
        {prompts.map((prompt, index) => (
          <div
            key={index}
            className="chatbot-history-item"
            onClick={() => selectPrompt(index)} // Pass index to selectPrompt
          >
            {prompt.title}
          </div>
        ))}
      </div>

    </div>
  );
}

export default History;
//      <button onClick={() => setPrompts([])}>Clear History</button>
