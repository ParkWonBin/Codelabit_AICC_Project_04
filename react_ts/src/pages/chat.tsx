import React, {useEffect} from 'react';
import ChatContextInfo from '../components/chatPage/chatContextInfo';
import ChatroomList from '../components/chatPage/listContainerRoom';
import ChatbotList from '../components/chatPage/listContainerBot';
import ChatMessages from '../components/chatPage/chatMessages';
import ChatInput from '../components/chatPage/chatInput';

import './chat.css';
import { UserInfo } from '../types';
import { useChatContext } from '../contexts/chatContext';
import { useChatHandlersBot } from '../handlers/chatHandlersBot';
import { useChatHandlersRoom } from '../handlers/chatHandlersRoom';
import { useChatHandlersMessage } from '../handlers/chatHandlersMessage';

interface ChatProps {
  userInfo: UserInfo;
}

const Chat: React.FC<ChatProps> = ({ userInfo }) => {
  const { bots, rooms, input, setInput } = useChatContext();
    
  const {
    handleGetBotList,
    handleBotClick,
    handleCreateBot,
    handleUpdateBot,
    handleDeleteBot
  } = useChatHandlersBot();
  
  const {
    handleGetRoomList,
    handleSelectRoom,
    handleCreateRoom,
    handleUpdateRoom,
    handleDeleteRoom
  } = useChatHandlersRoom();
  
  const {
    handleSendMessage,
    handleReceiveMessage
  } = useChatHandlersMessage();

  // 처음 들어왔을 때 목록 가져오기
  useEffect(()=>{
    handleGetRoomList()
    handleGetBotList()
  },[]);
  
  return (
    <div className="chat-page">
      <div className="left-panel">
        <ChatbotList bots={bots} 
          onBotClick={handleBotClick}
          onBotCreate={handleCreateBot} 
        />
        <ChatroomList rooms={rooms} 
          onRoomClick={handleSelectRoom}
          onRoomCreate={handleCreateRoom}
          userInfo={userInfo}
        />
      </div>
      <div className='chat-window'>
        <ChatContextInfo 
          onBotUpdate={handleUpdateBot} 
          onBotDelete={handleDeleteBot} 
          onRoomUpdate={handleUpdateRoom} 
          onRoomDelete={handleDeleteRoom} 
          userInfo={userInfo}
        />
        <ChatMessages/>
        <ChatInput 
          onSend={handleSendMessage} 
          onReceive={handleReceiveMessage} 
          input={input} 
          setInput={setInput} 
        />
      </div>
    </div>
  );
};

export default Chat;
