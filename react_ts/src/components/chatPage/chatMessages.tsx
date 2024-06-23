import React, { useEffect, useState, useRef } from 'react';
import { Message } from '../../types/chat';
import ReactMarkdown from 'react-markdown';
import './chatMessages.css';
import Modal from './chatMessageModal'; // 모달 컴포넌트 import

import { useChatContext } from '../../contexts/chatContext';

const ChatMessages: React.FC = () => {
    const { bots, thread, selectedRoom } = useChatContext();
    const [botsDictionary, setBotsDictionary] = useState<{ [key: string]: string }>({});
    const [modalContent, setModalContent] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const dictionary = bots.reduce((acc, bot) => {
            acc[bot.id] = bot.name;
            return acc;
        }, {} as { [key: string]: string });
        setBotsDictionary(dictionary);
    }, [bots]);

    useEffect(() => {
        // 스크롤을 맨 아래로 내리는 함수
        const scrollToBottom = () => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        };

        scrollToBottom();
    }, [thread, selectedRoom]);

    const formatDate = (timestamp: string) => {
        const date = new Date(Number(timestamp + "000"));

        const yyyy = date.getFullYear();
        const MM = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const HH = String(date.getHours()).padStart(2, '0');
        const mm = String(date.getMinutes()).padStart(2, '0');

        return `${yyyy}.${MM}.${dd}. ${HH}:${mm}`;
    };

    const handleDoubleClick = (content: string) => {
        setModalContent(content);
    };

    const closeModal = () => {
        setModalContent(null);
    };

    return (
        <>
            <div id="chatMessages" className="messages">
                {selectedRoom && thread[selectedRoom.id].map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`} onDoubleClick={() => handleDoubleClick(msg.content)}>
                        {msg.sender_id && <strong>{botsDictionary[msg.sender_id] || 'deleted bot'}</strong>}
                        <div>
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                        <small>{formatDate(msg.created_at)}</small>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            {modalContent && <Modal content={modalContent} onClose={closeModal} />}
        </>
    );
};

export default ChatMessages;
