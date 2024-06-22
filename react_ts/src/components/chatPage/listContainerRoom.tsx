import React from 'react';
import ListContainer from './listContainer';
import { Room, } from '../../types/chat';

interface ChatroomListProps {
    rooms: Room[];
    onRoomClick: (room: Room) => void;
    onRoomCreate: () => void;
}

const ChatroomList: React.FC<ChatroomListProps> = ({ rooms, onRoomClick, onRoomCreate }) => (
    <ListContainer 
        listName="채팅방 목록" 
        listItems={rooms} 
        onItemClick={onRoomClick} 
        onItemCreate={onRoomCreate}
    />
);

export default ChatroomList;
