import React from 'react';
import ListItem from './listItem';

import {Bot} from '../../types/chat';

interface ChatbotListProps {
  bots: Bot[];
}

const ChatbotList: React.FC<ChatbotListProps> = ({ bots }) => (
  <div className="list-container">
    <div className="list-header">
      <h3>챗봇 목록</h3>
      <button>추가</button>
    </div>
    <div className="list-body">
      {bots.map(bot => (
        <ListItem id={bot.id} name={bot.name}  />
      ))}
    </div>
  </div>
);

export default ChatbotList;
