import React from 'react';
import ListContainer from './listContainer';

import { UserInfo } from '../../types';
import { Room, } from '../../types/chat';

interface ChatroomListProps {
    rooms: Room[];
    userInfo:UserInfo;
    onRoomClick: (room: Room) => void;
    onRoomCreate: (userInfo:UserInfo) => void;
}

const ChatroomList: React.FC<ChatroomListProps> = ({ userInfo, rooms, onRoomClick, onRoomCreate }) => (
    <ListContainer 
        listName="채팅방 목록" 
        listItems={rooms} 
        onItemClick={onRoomClick} 
        onItemCreate={()=>{onRoomCreate(userInfo)}}
    />
);

export default ChatroomList;
