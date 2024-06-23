import { Message } from '../types/chat';
import { useChatContext } from '../contexts/chatContext';
import { GetRoomMessages } from '../hooks/useChatDataMessage'

export const useChatHandlersMessage = () => {
  const { thread, setThread, selectedBot, selectedRoom,input,setInput } = useChatContext();

  const handleSendMessage = () => {
    if (!input || !selectedRoom) { 
      alert('메시지가 입력되지 않았습니다.');
      return 
    }

    alert(`${selectedRoom.id} 보내기: ${input}`);
    const newMessage: Message = {
      sender_id: null,
      role: 'user',
      content: input
    };
    
    setInput("")
    setThread({...thread,
      [selectedRoom.id]: [...(thread[selectedRoom.id] || []), newMessage]
    });
  };

  const handleReceiveMessage = () => {
    if (!selectedBot || !selectedRoom) {
      alert('Bot 또는 Room이 선택되지 않았습니다.');
      return
    }
    
    const alertMessage = `bot id: ${selectedBot.id}, room id: ${selectedRoom.id}`;
    const newMessage: Message = {
      sender_id: selectedBot.id,
      role: 'assistant',
      content: alertMessage
    };
    
    alert(alertMessage);
    setThread({...thread,
      [selectedRoom.id]: [...(thread[selectedRoom.id] || []), newMessage]
    });    
  };


  return {
    handleSendMessage,
    handleReceiveMessage
  };
};
