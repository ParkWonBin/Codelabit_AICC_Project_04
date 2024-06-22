import React from 'react';
import { UserInfo } from '../../types';
import { Chatcontext, Bot,Room } from '../../types/chat';
import './chatContextInfo.css';

interface ChatContextInfoProps {
  userInfo:UserInfo;
  chatContext: Chatcontext;
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


const ChatContextInfo: React.FC<ChatContextInfoProps> = ({ chatContext, onBotDelete, onRoomDelete, onBotUpdate, onRoomUpdate, userInfo }) => (
  <div id="chatContextInfo">
    <div className="chat-header">
      <span>채팅방 : {chatContext.room ? chatContext.room.name : '선택 안됨'}</span>
        {chatContext.room && <>
            <button onClick={() => chatContext.room ? onRoomUpdate(chatContext.room, userInfo) : handelRoomNotSelected() }>수정</button>
            <button onClick={() => chatContext.room ? onRoomDelete(chatContext.room, userInfo) : handelRoomNotSelected() }>삭제</button>
        </>}
    </div>
    <div className="chat-header">
      <span>챗봇 : {chatContext.bot ? chatContext.bot.name : '선택 안됨'}</span>
        {chatContext.bot && <>
            <button onClick={() => chatContext.bot ? onBotUpdate(chatContext.bot) : handelBotNotSelected() }>수정</button>
            <button onClick={() => chatContext.bot ? onBotDelete(chatContext.bot) : handelBotNotSelected() }>삭제</button>
        </>}
    </div>
  </div>
);

export default ChatContextInfo;
