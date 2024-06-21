import React from 'react';
import ListItem from './listItem';

import {Room} from '../../types/chat';

interface ChatroomListProps {
  rooms: Room[];
}

const ChatroomList: React.FC<ChatroomListProps> = ({ rooms }) => (
  <div className="list-container">
    <div className="list-header">
      <h3>채팅방 목록</h3>
      <button>추가</button>
    </div>
    <div className="list-body">
      {rooms.map(room => (
        <ListItem id={room.id} name={room.name} />
      ))}
    </div>
  </div>
);

export default ChatroomList;
