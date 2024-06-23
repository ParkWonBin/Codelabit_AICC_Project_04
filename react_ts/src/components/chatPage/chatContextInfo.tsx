import React from 'react';
import { UserInfo } from '../../types';
import { Bot,Room } from '../../types/chat';
import { useChatContext } from '../../contexts/chatContext';
import './chatContextInfo.css';

interface ChatContextInfoProps {
  userInfo:UserInfo;
  onBotUpdate: (bot: Bot) => void;
  onBotDelete: (bot: Bot) => void;
  onRoomUpdate: (room: Room, userInfo:UserInfo) => void;
  onRoomDelete: (room: Room, userInfo:UserInfo) => void;
}

const handelBotNotSelected = ()=>{
    alert("채팅방 선택 X")
}

const handelRoomNotSelected = ()=>{
    alert("챗봇 선택 X")
}

const ChatContextInfo: React.FC<ChatContextInfoProps> = ({ onBotDelete, onRoomDelete, onBotUpdate, onRoomUpdate, userInfo }) => {
  const { selectedBot, selectedRoom } = useChatContext();
  
  return (
  <div id="chatContextInfo">
    <div className="chat-header">
      <span>채팅방 : {selectedRoom ? selectedRoom.name : '선택 안됨'}</span>
        {selectedRoom && <>
            <button onClick={() => selectedRoom ? onRoomUpdate(selectedRoom, userInfo) : handelRoomNotSelected() }>수정</button>
            <button onClick={() => selectedRoom ? onRoomDelete(selectedRoom, userInfo) : handelRoomNotSelected() }>삭제</button>
        </>}
    </div>
    <div className="chat-header">
      <span>챗봇 : {selectedBot ? selectedBot.name : '선택 안됨'}</span>
        {selectedBot && <>
            <button onClick={() => selectedBot ? onBotUpdate(selectedBot) : handelBotNotSelected() }>수정</button>
            <button onClick={() => selectedBot ? onBotDelete(selectedBot) : handelBotNotSelected() }>삭제</button>
        </>}
    </div>
  </div>
)};

export default ChatContextInfo;
