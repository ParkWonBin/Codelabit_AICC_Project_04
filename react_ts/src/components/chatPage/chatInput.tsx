import React from 'react';
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSend(input)
      onReceive();
    }
  };

  return (
  <div className="input-area">
      <input
        placeholder="메시지 입력"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={() => onSend(input)}>보내기</button>
      <button onClick={onReceive}>답변받기</button>
    </div>
  );
};

export default ChatInput;
