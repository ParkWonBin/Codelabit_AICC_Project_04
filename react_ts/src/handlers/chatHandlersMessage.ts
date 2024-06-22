import { Bot, Room, Message } from '../types/chat';
import { useChatContext } from '../contexts/chatContext';

export const useChatHandlersMessage = () => {
  const { thread, setThread, selectedBot, selectedRoom,input,setInput } = useChatContext();

  const handleSend = () => {
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

    if (selectedRoom) {
      setThread({...thread,
        [selectedRoom.id]: [...(thread[selectedRoom.id] || []), newMessage]
      });
    }

    setInput("")
  };

  const handleReceive = () => {
    if (!selectedBot || !selectedRoom) {
      alert('Bot 또는 Room이 선택되지 않았습니다.');
      return
    }
    
    const alertMessage = `bot id: ${selectedBot.id}, room id: ${selectedRoom.id}`;
    alert(alertMessage);

    const newMessage: Message = {
      sender_id: selectedBot.id,
      role: 'assistant',
      content: alertMessage
    };
    if (selectedRoom) {
      setThread({...thread,
        [selectedRoom.id]: [...(thread[selectedRoom.id] || []), newMessage]
      });
    }
    
  };

  return {
    handleSend,
    handleReceive
  };
};
