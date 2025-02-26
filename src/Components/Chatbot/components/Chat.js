import React, { useState, useEffect } from 'react';
import { HfInference } from '@huggingface/inference'; // Importing the Hugging Face inference client

// Initialize the Hugging Face client with your API key
const client = new HfInference(''); // Replace with your actual API key

function Chat({ currentPrompt, onUpdateCurrentPrompt }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Update messages whenever currentPrompt changes
  useEffect(() => {
    if (currentPrompt) {
      setMessages(currentPrompt.messages || []);
    } else {
      setMessages([]);
    }
  }, [currentPrompt]);

  const sendMessage = async () => {
    if (!currentPrompt) {
      alert('Please create or select a prompt first.');
      return;
    }

    if (input.trim() !== '') {
      const userMessage = { role: 'user', content: input };

      // Update messages locally
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);

      // Update currentPrompt
      const updatedPrompt = {
        ...currentPrompt,
        messages: newMessages,
      };
      onUpdateCurrentPrompt(updatedPrompt);

      setInput('');

      setIsLoading(true); // Set loading state to true

      // Call Hugging Face's chatCompletion method with retry logic
      const modelResponse = await queryHuggingFaceModelWithRetry(newMessages);

      const llmMessage = { role: 'llm', content: modelResponse };

      // Update messages with LLM response
      const updatedMessages = [...newMessages, llmMessage];
      setMessages(updatedMessages);

      // Update currentPrompt
      const updatedPromptWithLLM = {
        ...currentPrompt,
        messages: updatedMessages,
      };
      onUpdateCurrentPrompt(updatedPromptWithLLM);

      setIsLoading(false); // Set loading state to false
    }
  };

  const queryHuggingFaceModelWithRetry = async (conversation, retries = 3, delay = 2000) => {
    const messagesForAPI = conversation.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'bot',
      content: msg.content,
    }));

    let attempt = 0;
    while (attempt < retries) {
      try {
        // Call Hugging Face's chatCompletion API
        const chatCompletion = await client.chatCompletion({
          model: "meta-llama/Llama-3.2-1B-Instruct", // Your model ID
          messages: messagesForAPI,
          max_tokens: 500, // Adjust max tokens if needed
        });

        console.log('API Response:', chatCompletion);

        // Return the response message from the model
        return chatCompletion.choices[0].message.content;
      } catch (error) {
        if (error.response && error.response.status === 503) {
          // Handle 503 error (server unavailable) with retries
          console.error(`Attempt ${attempt + 1}: 503 Service Unavailable. Retrying...`);
          attempt++;
          if (attempt < retries) {
            await new Promise((resolve) => setTimeout(resolve, delay)); // Delay between retries
          } else {
            return 'Error: Model is temporarily unavailable. Please try again later.';
          }
        } else {
          // Handle other errors
          console.error('Error during Hugging Face API call:', error);
          return 'Error: Unable to get a response from the model.';
        }
      }
    }
  };

  return (
    <div className="chatbot-content-area">
      <div className="chatbot-output-area">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chatbot-message chatbot-${msg.role}-message`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="chatbot-message chatbot-llm-message">Loading...</div>
        )}
      </div>
      <div className="chatbot-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Start Typing..."
          disabled={!currentPrompt || isLoading}
        />
        <button onClick={sendMessage} disabled={!currentPrompt || isLoading}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
