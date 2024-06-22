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
import { fetchChatDataBotList, fetchChatDataRoomList, fetchThreadMessages } from '../hooks/useChatDataGetList';

interface ChatProps {
  userInfo: UserInfo;
}

const Chat: React.FC<ChatProps> = ({ userInfo }) => {
  const { bots, setBots, 
    rooms, setRooms, thread, setThread,
    selectedBot, selectedRoom, 
    input, setInput 
  } = useChatContext();
    
  const {
    handleBotClick,
    handleCreateBot,
    handleUpdateBot,
    handleDeleteBot
  } = useChatHandlersBot();
  
  const {
    handleRoomClick,
    handleCreateRoom,
    handleUpdateRoom,
    handleDeleteRoom
  } = useChatHandlersRoom();
  
  const {
    handleSend,
    handleReceive
  } = useChatHandlersMessage();

  // 처음 들어왔을 때 목록 가져오기
  useEffect(()=>{
    fetchChatDataBotList(bots, setBots)
    fetchChatDataRoomList(rooms, setRooms)
  },[]);
  
  // 처음 클릭된 대화방 대화 가져오기
  useEffect(()=>{
    fetchThreadMessages(thread, setThread, selectedRoom);
  },[]);

  return (
    <div className="chat-page">
      <div className="left-panel">
        <ChatbotList bots={bots} onBotClick={handleBotClick} onBotCreate={handleCreateBot} />
        <ChatroomList rooms={rooms} onRoomClick={handleRoomClick} onRoomCreate={handleCreateRoom} userInfo={userInfo}/>
      </div>
      <div className='chat-window'>
        <ChatContextInfo 
          chatContext={{ bot: selectedBot ?? undefined, room: selectedRoom ?? undefined }} 
          onBotUpdate={handleUpdateBot} 
          onBotDelete={handleDeleteBot} 
          onRoomUpdate={handleUpdateRoom} 
          onRoomDelete={handleDeleteRoom} 
          userInfo={userInfo}
        />
        {selectedRoom?.id
          ? <ChatMessages messages={thread[selectedRoom.id] ?? []} />
          : <ChatMessages messages={[]} />
        }
        <ChatInput 
          onSend={handleSend} 
          onReceive={handleReceive} 
          input={input} 
          setInput={setInput} 
        />
      </div>
    </div>
  );
};

export default Chat;
