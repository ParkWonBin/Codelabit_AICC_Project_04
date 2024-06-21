import React from 'react';
import {Message} from '../../types/chat';

import './chatWindow.css';

interface ChatWindowProps {
  messages: Message[];
  onSend: () => void;
  onReceive: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSend, onReceive }) => (
  <div className="chat-window">
    <div className="chat-header">
      <span>채팅방 :</span>
      <button>수정</button>
      <button>삭제</button>
    </div>
    <div className="chat-header">
      <span>챗봇 :</span>
      <button>수정</button>
      <button>삭제</button>
    </div>
    <div className="messages">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.role}`}>
          <strong>{msg.sender_id}</strong>
          <div> {msg.content} </div>
        </div>
      ))}
    </div>
    <div className="input-area">
      <input type="text" placeholder="메시지 입력" />
      <button onClick={onSend}>보내기</button>
      <button onClick={onReceive}>답변받기</button>
    </div>
  </div>
);

export default ChatWindow;
