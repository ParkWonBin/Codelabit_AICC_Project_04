import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Bot, Room, Message } from '../types/chat';
import { ModalProps } from '../types';

interface ChatContextType {
  bots: Bot[];
  setBots: React.Dispatch<React.SetStateAction<Bot[]>>;
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  thread: { [key: string]: Message[] };
  setThread: React.Dispatch<React.SetStateAction<{ [key: string]: Message[] }>>;
  selectedBot: Bot | null;
  setSelectedBot: React.Dispatch<React.SetStateAction<Bot | null>>;
  selectedRoom: Room | null;
  setSelectedRoom: React.Dispatch<React.SetStateAction<Room | null>>;
  input:string;
  setInput:React.Dispatch<React.SetStateAction<string>>;
  modalProps:ModalProps;
  setModalProps:React.Dispatch<React.SetStateAction<ModalProps>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bots, setBots] = useState<Bot[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [thread, setThread] = useState<{ [key: string]: Message[] }>({});
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [input,setInput] = useState<string>("");
  const [modalProps, setModalProps] = useState<ModalProps>({
    visible: false,
    title: "title",
    onSubmit(formData) {alert(JSON.stringify(formData,null,2))},
    data: [
      { label: 'test1', key:'key1',type: 'input', value:'test1'},
      { label: 'test2', key:'key2',type: 'textarea', value:'test2', rows: 5 },
      { label: 'test3', key:'key3',type: 'select', value:'c', options: ['a', 'b', 'c', 'd'] }
    ]
  });

  return (
    <ChatContext.Provider value={{ 
      bots, setBots, rooms, setRooms, thread, setThread, input, setInput,
      selectedBot, setSelectedBot, selectedRoom, setSelectedRoom, modalProps, setModalProps
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
