import React from 'react';

function History({ onNewPrompt, selectPrompt, prompts }) {
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
        {prompts.map((prompt) => (
          <div
            key={prompt.id}
            className="chatbot-history-item"
            onClick={() => selectPrompt(prompt.id)}
          >
            {prompt.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
