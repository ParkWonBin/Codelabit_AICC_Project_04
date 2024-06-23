import React, {useEffect, useState} from 'react';
import { Message } from '../../types/chat';
import './chatMessages.css';

import { useChatContext } from '../../contexts/chatContext';


const ChatMessages: React.FC = () => {
    const { bots, thread, selectedRoom } = useChatContext();
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
        {selectedRoom && thread[selectedRoom.id].map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
            {msg.sender_id && <strong>{botsDictionary[msg.sender_id] || 'deleted bot'}</strong>}
            <div> {msg.content} </div>
        </div>
        ))}
    </div>
    )
};

export default ChatMessages;