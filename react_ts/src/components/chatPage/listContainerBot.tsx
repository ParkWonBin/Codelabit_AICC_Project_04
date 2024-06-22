import React from 'react';
import ListContainer from './listContainer';
import { Bot, Chatcontext } from '../../types/chat';

interface ChatbotListProps {
    bots: Bot[];
    onBotClick: (bot: Bot) => void;
    onBotCreate: () => void;
}

const ChatbotList: React.FC<ChatbotListProps> = ({ bots, onBotClick, onBotCreate }) => (
    <ListContainer 
        listName="챗봇 목록" 
        listItems={bots} 
        onItemClick={onBotClick} 
        onItemCreate={onBotCreate}
    />
);

export default ChatbotList;


