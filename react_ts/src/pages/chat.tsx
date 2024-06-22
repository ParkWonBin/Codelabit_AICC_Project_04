import React, { useEffect, useState } from 'react';
import ChatroomList from '../components/chatPage/listContainerRoom';
import ChatbotList from '../components/chatPage/listContainerBot';
import ChatContextInfo from '../components/chatPage/chatContextInfo';
import ChatMessages from '../components/chatPage/chatMessages';
import ChatInput from '../components/chatPage/chatInput';

import './chat.css';
import { UserInfo } from '../types';
import { Bot, Room, Message, Chatcontext } from '../types/chat';
import { useChatContext } from '../contexts/chatContext';

interface ChatProps {
    userInfo: UserInfo;
}

const Chat: React.FC<ChatProps> = ({ userInfo }) => {
  const { 
    bots, setBots, 
    rooms, setRooms, 
    thread, setThread, 
    selectedBot, setSelectedBot, 
    selectedRoom, setSelectedRoom 
  } = useChatContext();

  const [input, setInput] = useState<string>('');   

  const fetchChatData = async () => {
    // 채팅방 목록 가져오기 코드 (예: API 호출)
    if (rooms.length === 0) {
      alert("채팅방 목록 가져오기");
      const roomlist: Room[] = [
        { id: 't1', name: 'Room 1' },
        { id: 't2', name: 'Room 2' }
      ];
      setRooms(roomlist);
    }

    // 챗봇 목록 가져오기 코드 (예: API 호출)
    if (bots.length === 0) {
      alert("챗봇 목록 가져오기");
      const botlist: Bot[] = [
        { id: 'a1', name: 'Bot 1', description: 'Desc 1', instructions: 'Instr 1', temperature: 0.5 },
        { id: 'a2', name: 'Bot 2', description: 'Desc 2', instructions: 'Instr 2', temperature: 0.6 }
      ];
      setBots(botlist);
    }

  }

  useEffect(() => {
    fetchChatData();
  }, []);

  useEffect(() => {
    const fetchThreadMessages = async () => {
      if (selectedRoom && !thread[selectedRoom.id]) {
        alert(`${selectedRoom.name} 챗팅방의 대화목록 가져오기`);
        let msglist: Message[] = [];
        if (selectedRoom.id === 't1') {
          msglist = [
            { sender_id: 'a1', role: 'assistant', content: 'Hi there!' },
            { sender_id: null, role: 'user', content: 'Hello' }
          ];
        } else {
          msglist = [
            { sender_id: 'a2', role: 'assistant', content: 'test!' },
            { sender_id: null, role: 'user', content: '123' }
          ];
        }
        setThread(prevThread => ({ ...prevThread, [selectedRoom.id]: msglist }));
      }
    };

    fetchThreadMessages();
  }, [selectedRoom, thread, setThread]);

  const handleCreateBot = () => {
    alert(`챗봇 생성`);
  };

  const handleCreateRoom = () => {
    alert(`채팅방 생성`);
    
  };

  const handleUpdateRoom = (room: Room) => {
    alert(`${room.name} 수정`);
  };

  const handleUpdateBot = (bot: Bot) => {
    alert(`${bot.name} 수정`);
  };

  const handleDeleteRoom = (room: Room) => {
    setRooms(rooms.filter(x => x.id !== room.id));
    alert(`${room.name} 삭제`);
    setSelectedRoom(null)
  };

  const handleDeleteBot = (bot: Bot) => {
    setBots(bots.filter(x => x.id !== bot.id));
    alert(`${bot.name} 삭제`);
    setSelectedBot(null)
  };

  const handleBotClick = (bot: Bot) => {
    setSelectedBot(bot);
    alert(`${bot.name} 선택`);
  };

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    alert(`${room.name} 선택`);
  };

  const handleSend = (input: string) => {
    if (!input) { return }

    alert(`보내기: ${input}`);
    const newMessage: Message = {
      sender_id: null,
      role: 'user',
      content: input
    };

    if (selectedRoom) {
      setThread({
        ...thread,
        [selectedRoom.id]: [...(thread[selectedRoom.id] || []), newMessage]
      });
    }
    setInput('');
  };

  const handleReceive = () => {
    if (selectedBot && selectedRoom) {
      const alertMessage = `bot id: ${selectedBot.id}, room id: ${selectedRoom.id}`;
      alert(alertMessage);

      const newMessage: Message = {
        sender_id: selectedBot.id,
        role: 'assistant',
        content: alertMessage
      };
      setThread({
        ...thread,
        [selectedRoom.id]: [...(thread[selectedRoom.id] || []), newMessage]
      });
    } else {
      alert('Bot 또는 Room이 선택되지 않았습니다.');
    }
  };

  return (
    <div className="chat-page">
      <div className="left-panel">
        <ChatbotList bots={bots} onBotClick={handleBotClick} onBotCreate={handleCreateBot} />
        <ChatroomList rooms={rooms} onRoomClick={handleRoomClick} onRoomCreate={handleCreateRoom} />
      </div>
      <div className='chat-window'>
        <ChatContextInfo 
          chatContext={{ bot: selectedBot ?? undefined, room: selectedRoom ?? undefined }} 
          onBotUpdate={handleUpdateBot} 
          onRoomUpdate={handleUpdateRoom} 
          onBotDelete={handleDeleteBot} 
          onRoomDelete={handleDeleteRoom} 
        />
        {selectedRoom?.id
          ? <ChatMessages messages={thread[selectedRoom.id] ?? []} />
          : <ChatMessages messages={[]} />
        }
        <ChatInput 
          onSend={handleSend} 
          onReceive={handleReceive} 
          input={input} 
          setInput={setInput} 
        />
      </div>
    </div>
  );
};

export default Chat;
