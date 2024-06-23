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

  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room);
    alert(`${room.name} 선택`);
  };

  const handleGetRoomList = async () => {
    if (rooms.length > 0) {return}
    
    alert("채팅방 목록 가져오기");
    const roomlist: Room[] = [
      { id: 'thread_rbxeQ7knR8dfgE3IhY90rHUC', name: '임대 사기 상담' },
      { id: 'thread_HuHmrKPXJ8HYOh8eraYs1iKr', name: '쇼핑몰 서비스' },
      { id: 'thread_DL1Dwph6ODDHHHhoRPRaJhGA', name: '게임 개발' }
    ];
  
    setRooms(roomlist);
};



  return {
    handleGetRoomList,
    handleCreateRoom,
    handleUpdateRoom,
    handleDeleteRoom,
    handleSelectRoom
  };
};
