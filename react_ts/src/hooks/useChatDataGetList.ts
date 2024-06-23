import { Bot, Room, Message } from '../types/chat';

const REACT_APP_FLASK_URL = process.env.REACT_APP_FLASK_URL || 'http://localhost:5001';

export const fetchChatDataBotList = async (bots:Bot[], setBots: React.Dispatch<React.SetStateAction<Bot[]>>) => {
  if (bots.length > 0) {return}

  alert("챗봇 목록 가져오기");
  try {
    const response = await fetch(`${REACT_APP_FLASK_URL}/api/assistant/`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    });    

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    
    const botlist: Bot[] = data.map((item: any) => ({
      id: item.id,
      name: item.name,
      model: item.model,
      description: item.description,
      instructions: item.instructions,
      temperature: item.temperature
    }));

    setBots(botlist);
  } catch (error) {
    console.error('Failed to fetch bot list:', error);
  }
  // const botlist: Bot[] = [
  //   { id: 'a1', name: 'Bot 1', description: 'Desc 1', instructions: 'Instr 1', temperature: 0.5 },
  //   { id: 'a2', name: 'Bot 2', description: 'Desc 2', instructions: 'Instr 2', temperature: 0.6 }
  // ];

  // setBots(botlist);
}

export const fetchChatDataRoomList = async (rooms: Room[], setRooms: React.Dispatch<React.SetStateAction<Room[]>> ) => {
  if (rooms.length > 0) {return}
  
  alert("채팅방 목록 가져오기");
  const roomlist: Room[] = [
    { id: 't1', name: 'Room 1' },
    { id: 't2', name: 'Room 2' }
  ];

  setRooms(roomlist);
};

export const fetchThreadMessages = async (thread: { [key: string]: Message[] }, setThread: React.Dispatch<React.SetStateAction<{ [key: string]: Message[] }>>, selectedRoom: Room | null) => {
  if (!selectedRoom || thread[selectedRoom.id]) {return}

  
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
};
