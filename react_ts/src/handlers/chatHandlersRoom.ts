import { Room } from '../types/chat';
import { UserInfo } from '../types';
import { useChatContext } from '../contexts/chatContext';

export const useChatHandlersRoom = () => {
  const { rooms, setRooms, setSelectedRoom } = useChatContext();

  const handleCreateRoom = (userInfo:UserInfo) => {
    const newRoom : Room = {
      id: 't3',
      name: 'Room 3'
    }
    setRooms([...rooms, newRoom ])

    alert(`${userInfo.id} - 채팅방 생성`);
  };

  const handleUpdateRoom = (room: Room, userInfo:UserInfo) => {
    alert(`${userInfo.id} - ${room.name} 수정`);
  };

  const handleDeleteRoom = (room: Room, userInfo:UserInfo) => {
    setRooms(rooms.filter(x => x.id !== room.id));

    alert(`${userInfo.id} - ${room.name} 삭제`);
    setSelectedRoom(null);
  };

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    alert(`${room.name} 선택`);
  };

  return {
    handleCreateRoom,
    handleUpdateRoom,
    handleDeleteRoom,
    handleRoomClick
  };
};
