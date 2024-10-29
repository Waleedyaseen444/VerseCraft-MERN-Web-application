import React, { useState, useEffect } from 'react';

function Chat({ currentPrompt, onUpdateChatMessages }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Update messages whenever currentPrompt changes
  useEffect(() => {
    if (currentPrompt) {
      setMessages(currentPrompt.messages);
    }
  }, [currentPrompt]);

  const sendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { role: 'user', content: input }]);
      setInput('');

      setTimeout(() => {
        const simulatedResponse = "This is a simulated LLM response.";
        setMessages(prevMessages => [...prevMessages, { role: 'llm', content: simulatedResponse }]);
        onUpdateChatMessages(messages);
      }, 500);
    }
  };

  return (
    <div className="chatbot-content-area">
      <div className="chatbot-output-area">
        {messages.map((msg, index) => (
          <div key={index} className={`chatbot-message chatbot-${msg.role}-message`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="chatbot-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Start Typing..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
