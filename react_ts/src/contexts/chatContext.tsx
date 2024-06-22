import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Bot, Room, Message } from '../types/chat';

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
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bots, setBots] = useState<Bot[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [thread, setThread] = useState<{ [key: string]: Message[] }>({});
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [input,setInput] = useState<string>("");

  return (
    <ChatContext.Provider value={{ 
      bots, setBots, rooms, setRooms, thread, setThread, input, setInput,
      selectedBot, setSelectedBot, selectedRoom, setSelectedRoom 
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
