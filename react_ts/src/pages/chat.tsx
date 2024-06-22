// chat.tsx
import React, { useState } from 'react';
import ChatroomList from '../components/chatPage/listContainerRoom';
import ChatbotList from '../components/chatPage/listContainerBot';
import ChatContextInfo from '../components/chatPage/chatContextInfo';
import ChatMessages from '../components/chatPage/chatMessages';
import ChatInput from '../components/chatPage/chatInput';

import './chat.css';
import { UserInfo } from '../types';
import { Bot, Room, Message, Chatcontext } from '../types/chat';

interface ChatProps {
    userInfo: UserInfo;
    context: Chatcontext;
    setContext: React.Dispatch<React.SetStateAction<Chatcontext>>;
}

const Chat: React.FC<ChatProps> = ({ userInfo, context, setContext }) => {
    const [bots, setBots] = useState<Bot[]>([
        { id: 'a1', name: 'Bot 1', description: 'Desc 1', instructions: 'Instr 1', temperature: 0.5 },
        { id: 'a2', name: 'Bot 2', description: 'Desc 2', instructions: 'Instr 2', temperature: 0.6 }
    ]);
    const [rooms, setRooms] = useState<Room[]>([
        { id: 't1', name: 'Room 1' },
        { id: 't2', name: 'Room 2' }
    ]);

    const [input, setInput] = useState<string>('');

    const [messages, setMessages] = useState<Message[]>([
        { sender_id: null, role: 'user', content: 'Hello' },
        { sender_id: 'bot1', role: 'assistant', content: 'Hi there!' }
    ]);

    const handleCreateBot = () => {
      alert(`챗봇 생성`)
    };

    const handleCreateRoom = () => {
      alert(`채팅방 생성`)
    };
    
    const handleUpdateRoom = (room:Room) => {
      setRooms(rooms.filter(x => x.id !== room.id));
      alert(`${room.name} 수정`)
    };

    const handleUpdateBot = (bot:Bot) => {
      setBots(bots.filter(x => x.id !== bot.id));
      alert(`${bot.name} 수정`)
    };

    const handleDeleteRoom = (room:Room) => {
        setRooms(rooms.filter(x => x.id !== room.id));
        alert(`${room.name} 삭제`)
    };

    const handleDeleteBot = (bot:Bot) => {
      setBots(bots.filter(x => x.id !== bot.id));
      alert(`${bot.name} 삭제`)
    };

    const handleBotClick = (bot: Bot) => {
      setContext({ ...context, bot });
      alert(`${bot.name} 선택`)


    };
    
    const handleRoomClick = (room: Room) => {
      setContext({ ...context, room });
      alert(`${room.name} 선택`)
    };
    
    const handleSend = (input: string) => {
      alert(`보내기: ${input}`);
      const newMessage: Message = {
          sender_id: null,
          role: 'user',
          content: input
      };
      setMessages([...messages, newMessage]);
      setInput(''); // input 초기화
  };

  const handleReceive = () => {
      if (context.bot && context.room) {
          const alertMessage = `bot id: ${context.bot.id}, room id: ${context.room.id}`;
          alert(alertMessage);

          const newMessage: Message = {
              sender_id: context.bot.id,
              role: 'assistant',
              content: alertMessage
          };
          setMessages([...messages, newMessage]);
      } else {
          alert('Bot 또는 Room이 선택되지 않았습니다.');
      }
  };

  return (
    <div className="chat-page">
      <div className="left-panel">
        <ChatbotList bots={bots} onBotClick={handleBotClick} onBotCreate={handleCreateBot}  />
        <ChatroomList rooms={rooms} onRoomClick={handleRoomClick} onRoomCreate={handleCreateRoom} />
      </div>
      <div className='cht-waindow'>
        <ChatContextInfo 
          chatContext={context} 
          onBotUpdate={handleUpdateBot} 
          onRoomUpdate={handleUpdateRoom} 
          onBotDelete={handleDeleteBot} 
          onRoomDelete={handleDeleteRoom} 
          />
        <ChatMessages messages={messages} />
        <ChatInput 
          onSend={handleSend} 
          onReceive={handleReceive} 
          input={input} 
          setInput={setInput} />
      </div>
    </div>
  );
};

export default Chat;
