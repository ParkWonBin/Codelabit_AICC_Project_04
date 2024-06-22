import React, {useEffect, useState} from 'react';
import { Message } from '../../types/chat';
import './chatMessages.css';

import { useChatContext } from '../../contexts/chatContext';

interface ChatMessagesProps {
messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
    const { bots } = useChatContext();
    const [botsDictionary, setBotsDictionary] = useState<{ [key: string]: string }>({});
  
    useEffect(() => {
      const dictionary = bots.reduce((acc, bot) => {
        acc[bot.id] = bot.name; 
        return acc;
      }, {} as { [key: string]: string });
      setBotsDictionary(dictionary);
    }, [bots]);

    return(
        <div id="chatMessages" className="messages">
        {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
            {msg.sender_id && <strong>{botsDictionary[msg.sender_id] || 'deleted bot'}</strong>}
            <div> {msg.content} </div>
        </div>
        ))}
    </div>
    )
};

export default ChatMessages;