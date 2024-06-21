import React, { useState } from 'react';
import ChatroomList from '../components/chatPage/chatroomList';
import ChatbotList from '../components/chatPage/chatbotList';
import ChatWindow from '../components/chatPage/chatWindow';

import './chat.css';
import { UserInfo } from '../types';
import {Bot, Room, Message} from '../types/chat';

interface ChatProps {
  userInfo: UserInfo;
}

const Chat: React.FC<ChatProps> = ({ userInfo }) => {
  const [bots, setBots] = useState<Bot[]>([
    { id: 1, name: 'Bot 1', description: 'Description 1', instructions: 'Instructions 1', temperature: 0.5 },
    { id: 2, name: 'Bot 2', description: 'Description 2', instructions: 'Instructions 2', temperature: 0.7 }
  ]);
  const [rooms, setRooms] = useState<Room[]>([{ id: 1, name: 'Room 1' }, { id: 2, name: 'Room 2' }]);
  const [messages, setMessages] = useState<Message[]>([
    { sender_id: 'user1', role: 'user', content: 'Hello' },
    { sender_id: 'bot1', role: 'assistant', content: 'Hi there!' }
  ]);

  const handleEditBot = (id: number) => {
    // handle edit bot logic
  };

  const handleDeleteBot = (id: number) => {
    setBots(bots.filter(bot => bot.id !== id));
  };

  const handleEditRoom = (id: number) => {
    // handle edit room logic
  };

  const handleDeleteRoom = (id: number) => {
    setRooms(rooms.filter(room => room.id !== id));
  };

  const handleSend = () => {
    // handle send message logic
  };

  const handleReceive = () => {
    // handle receive message logic
  };

  return (
    <div className="chat-page">
      <div className="left-panel">
        <ChatbotList bots={bots} />
        <ChatroomList rooms={rooms} />
      </div>
      <ChatWindow messages={messages} onSend={handleSend} onReceive={handleReceive} />
    </div>
  );
};

export default Chat;
