import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([
    {
      roomName: '대화방1',
      participants: ['친구1', '친구2'],
    },
    {
      roomName: '대화방2',
      participants: ['친구3', '친구4'],
    },
    {
      roomName: '대화방3',
      participants: ['친구5', '친구6'],
    },
    {
      roomName: '대화방4',
      participants: ['친구1', '친구3'],
    },
    {
      roomName: '대화방5',
      participants: ['친구2', '친구4'],
    },
  ]);

  const [messages, setMessages] = useState({
    대화방1: [
      { role: '상대방', text: '안녕하세요!' },
      { role: '나', text: '안녕하세요! 반가워요.' },
    ],
    대화방2: [
      { role: '상대방', text: '오늘 날씨 어때요?' },
      { role: '나', text: '더워요.' },
    ],
    대화방3: [
      { role: '상대방', text: '안녕하세요~~' },
      { role: '나', text: '네!.' },
    ],
    대화방4: [
      { role: '상대방', text: '안녕!' },
      { role: '나', text: '네~!' },
    ],
    대화방5: [
      { role: '상대방', text: '여기서 만나요!' },
      { role: '나', text: '네, 좋아요!' },
    ],
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [friends, setFriends] = useState([
    { id: 1, name: '친구1' },
    { id: 2, name: '친구2' },
    { id: 3, name: '친구3' },
    { id: 4, name: '친구4' },
    { id: 5, name: '친구5' },
    { id: 6, name: '친구6' },
  ]);
  const [newFriendName, setNewFriendName] = useState('');

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedRoom]);

  const handleSendMessage = (message) => {
    if (message.trim() !== '' && selectedRoom) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedRoom.roomName]: [
          ...(prevMessages[selectedRoom.roomName] || []),
          { role: '나', text: message },
        ],
      }));
    }
  };

  const handleAddFriend = () => {
    if (newFriendName.trim() !== '') {
      const newFriend = {
        id: friends.length + 1,
        name: newFriendName,
      };
      setFriends([...friends, newFriend]);
      setNewFriendName(''); // 입력 필드 초기화
    }
  };

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
  };

  const handleAddRoom = () => {
    const newRoomName = `대화방${rooms.length + 1}`;
    const newRoom = {
      roomName: newRoomName,
      participants: friends.map((friend) => friend.name),
    };
    setRooms([...rooms, newRoom]);
    setMessages((prevMessages) => ({
      ...prevMessages,
      [newRoomName]: [], // 새로운 대화방의 초기 메시지 설정
    }));
  };

  const filteredRooms = rooms.filter((room) =>
    room.roomName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredRooms.length - 1
      );
    } else if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredRooms.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === 'Enter') {
      if (filteredRooms.length > 0) {
        handleRoomSelection(filteredRooms[highlightedIndex]);
      }
    }
  };

  return (
    <div className="wrap">
      <div className="friend-list" tabIndex="0">
        <div className="search-bar">
          <input
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {/* <input
            type="text"
            placeholder="친구 추가"
            value={newFriendName}
            onChange={(e) => setNewFriendName(e.target.value)}
          /> */}
        </div>
        <div className="search-bar">
          <button onClick={handleAddFriend}>친구 추가</button>
          <button onClick={handleAddRoom}>대화방 추가</button>
        </div>
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room, index) => (
            <div
              key={index}
              className={`friend ${
                selectedRoom === room || highlightedIndex === index
                  ? 'selected'
                  : ''
              }`}
              onClick={() => handleRoomSelection(room)}
            >
              {room.roomName}
            </div>
          ))
        ) : (
          <div className="no-results">대화방이 없습니다.</div>
        )}
      </div>
      {selectedRoom && (
        <div className="chat-window">
          <div className="chat-header">{selectedRoom.roomName}</div>
          <div className="chat-messages">
            {(messages[selectedRoom.roomName] || []).map((message, index) => (
              <div key={index} className={`chat ${message.role === '나' ? 'ch1' : 'ch2'}`}>
                <div className="icon"><i className="fa-solid fa-user"></i></div>
                <div className={`textbox ${message.role === '나' ? 'ch1' : 'ch2'}`}>
                  <div className="message-sender">{message.role === '나' ? '나' : selectedRoom.participants.find(p => p !== '나')}</div>
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* 스크롤을 위한 빈 div */}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="메시지를 입력하세요..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage(e.target.value);
                  e.target.value = '';
                }
              }}
            />
            <button onClick={() => {
              const messageInput = document.querySelector('.chat-input input');
              handleSendMessage(messageInput.value);
              messageInput.value = '';
            }}>전송</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
