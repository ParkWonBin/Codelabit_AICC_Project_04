import React, { useState } from 'react';
import './chatInput.css';

interface ChatInputProps {
  onSend: (input: string) => void;
  onReceive: () => void;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, onReceive, input, setInput }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="input-area">
      <input type="text" placeholder="메시지 입력" value={input} onChange={handleInputChange} />
      <button onClick={() => onSend(input)}>보내기</button>
      <button onClick={onReceive}>답변받기</button>
    </div>
  );
};

export default ChatInput;
