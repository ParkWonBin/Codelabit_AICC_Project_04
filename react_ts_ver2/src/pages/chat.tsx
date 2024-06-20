// Chat.tsx
import React, { useState } from 'react';
import { UserInfo } from '../types';
import './Chat.css';

interface ChatProps {
  userInfo: UserInfo;
}

const Chat: React.FC<ChatProps> = ({ userInfo }) => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      const userMessage = input;
      setInput('');

      // 간단한 챗봇 응답 추가
      setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        setMessages(prevMessages => [
          ...prevMessages,
          { sender: 'bot', text: botResponse }
        ]);
      }, 500);
    }
  };

  const getBotResponse = (message: string): string => {
    // 챗봇 로직 작성 (여기서는 단순 에코 챗봇)
    if (message.toLowerCase().includes('hello')) {
      return 'Hello! How can I help you today?';
    } else if (message.toLowerCase().includes('bye')) {
      return 'Goodbye! Have a nice day!';
    } else {
      return `You said: ${message}`;
    }
  };

  return (
    <div className="chat-container">
      <h1>Chat Page</h1>
      <p>Welcome to the chat page, {userInfo.username}.</p>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <strong>{message.sender === 'user' ? userInfo.username : 'Bot'}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
