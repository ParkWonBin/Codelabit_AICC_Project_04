import { Room, Message } from '../types/chat';
import { UserInfo, ModalProps } from '../types';
import { useChatContext } from '../contexts/chatContext';

import { GetMessages } from '../hooks/useChatDataMessage'
import { CreateRoom } from '../hooks/useChatDataRoom'


export const useChatHandlersRoom = () => {
  const { rooms, setRooms, setThread, setSelectedRoom, thread, setModalProps } = useChatContext();

  const handleCreateRoom = (userInfo:UserInfo) => {
    // 모달 띄우고 모달에 넣을 함수 등록
    const submit = async (formData: Record<string, string>)=>{
      if(formData.name.trim().length == 0 ){ return }

      const res = await CreateRoom()
      if(res && res.thread_id){
        const newRoom:Room = {
          id: res.thread_id,
          name:formData.name
        }
        
        setRooms([newRoom, ...rooms])
      }
    }

    // 채팅방 생성
    setModalProps({
      visible:true,
      title: "채팅방 생성",
      onSubmit: submit,
      onClose: () => {},
      data: [
        { label: '이름',key:'name', type: 'input', value:''}
      ]
    });
  };

  const handleDeleteRoom = (room: Room, userInfo:UserInfo) => {
    setRooms(rooms.filter(x => x.id !== room.id));
    
    alert(`${userInfo.id} - ${room.name} 삭제`);
    setSelectedRoom(null);
  };
  
  const handleUpdateRoom = (room: Room, userInfo:UserInfo) => {
    alert(`${userInfo.id} - ${room.name} 수정`);


    setModalProps({
      visible:true,
      title: "채팅방명 수정",
      onSubmit: () => {},
      onClose: () => {},
      data: [
        { label: '이름',key:'name', type: 'input', value:''}
      ]
    });
  };

  const handleSelectRoom = async (room: Room) => {
    // alert(`${room.name} 선택`);
    
    if (!thread[room.id] || thread[room.id].length === 0) {
      alert(`${room.name} 챗팅방의 대화목록 가져오기`);
      const msglist: Message[] = await GetMessages(room.id);
      setThread(prevThread => ({ ...prevThread, [room.id]: msglist }));
    }
    
    setSelectedRoom(room);
  };

  const handleGetRoomList = async () => {
    if (rooms.length > 0) {return}
    
    alert("채팅방 목록 가져오기");
    const roomlist: Room[] = [
      { id: 'thread_RC4QHo9c5kd5P3vYTudUCgFt', name: '테스트용' },
      { id: 'thread_ElCxy8ubjerOWDWZfRVH3Fj0', name: '연결완료' },
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
