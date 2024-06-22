import React from 'react';
import { Message } from '../../types/chat';
import './chatMessages.css';

interface ChatMessagesProps {
messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => (
    <div id="chatMessages" className="messages">
        {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.role}`}>
            {msg.sender_id && <strong>{msg.sender_id}</strong>}
            <div> {msg.content} </div>
        </div>
        ))}
    </div>
);

export default ChatMessages;