import React, { useState } from 'react';
import { UserInfo } from '../types';
import './Chat.css';

interface ChatProps {
  userInfo: UserInfo;
}

interface Message {
  text: string;
  isUser: boolean;
}

const Chat: React.FC<ChatProps> = ({ userInfo }) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: '안녕하세요!', isUser: false },
    { text: '안녕하세요!', isUser: true },
    { text: '오늘 뭐하세요~~!!!??', isUser: false },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, isUser: true };
      setMessages([...messages, userMessage]);
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <h1>CHATTING</h1>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.isUser ? 'user' : 'other'}`}>
            <div className={`icon ${message.isUser ? 'user-icon' : 'other-icon'}`}>
              {message.isUser ? '나' : '상대방'}
            </div>
            <span className="message-text">{message.text}</span>
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
        <button onClick={handleSend}>전송</button>
      </div>
    </div>
  );
};

export default Chat;
