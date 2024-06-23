import { Message } from '../types/chat';
import { useChatContext } from '../contexts/chatContext';
import { sendMessage, receiveMessage } from '../hooks/useChatDataMessage'

export const useChatHandlersMessage = () => {
  const { setThread, selectedBot, selectedRoom,input,setInput } = useChatContext();

  const handleSendMessage = async () => {
    if (!input || !selectedRoom) { 
      alert('메시지가 입력되지 않았습니다.');
      return 
    }

    const now = new Date();
    const tmpid = 'tmp'+now.toString()
    const content = input
    const tempMessage: Message = {
      sender_id: null,
      role: 'user',
      content: content,
      created_at: '',
      id: tmpid, 
      thread_id: selectedRoom.id
    };
    
    // 화면에 미리 표시
    setInput("")
    setThread(prevThread => ({
      ...prevThread,
      [selectedRoom.id]: [...(prevThread[selectedRoom.id] || []), tempMessage]
    }));
    
    // 서버로 메시지 보내기
    alert(`${selectedRoom.id} 보내기: ${content}`);
    const newMessage: Message | null = await sendMessage(selectedRoom.id, content);
    
    // 메시지 돌아오면 업데이트
    if (newMessage) {
      setThread(prevThread => ({...prevThread,[selectedRoom.id]: prevThread[selectedRoom.id].map(msg =>
          msg.id === tmpid && msg.content === content ? newMessage : msg
      )}));
    } else {
      console.error('Failed to send message');
    }
  };

  const handleReceiveMessage = async () => {
    if (!selectedBot || !selectedRoom) {
      alert('Bot 또는 Room이 선택되지 않았습니다.');
      return;
    }

    const now = new Date();
    const tmpid = 'tmp'+now.toString()
    const content = '답변 생성중....'
    const tempMessage: Message = {
      sender_id: selectedBot.id,
      role: 'assistant',
      content: content,
      created_at: '',
      id: tmpid, 
      thread_id: selectedRoom.id
    };
    
    // 화면에 미리 표시
    setInput("")
    setThread(prevThread => ({
      ...prevThread,
      [selectedRoom.id]: [...(prevThread[selectedRoom.id] || []), tempMessage]
    }));
    

    // 서버로부터 메시지 받기
    const receivedData = await receiveMessage(selectedRoom.id, selectedBot.id);

    if (receivedData) {
      const newMessage: Message = {
        id: receivedData.id,
        thread_id: receivedData.thread_id,
        created_at: receivedData.created_at,
        sender_id: receivedData.sender_id || null,
        role: receivedData.role || 'assistant',
        content: receivedData.content
      };

      setThread(prevThread => ({
        ...prevThread,
        [selectedRoom.id]: prevThread[selectedRoom.id].map(msg =>
          msg.id === tmpid && msg.content === '답변 생성중....' ? newMessage : msg
        )
      }));
    } else {
      console.error('Failed to receive message');
    }
  };

  return {
    handleSendMessage,
    handleReceiveMessage
  };
};
