import React from 'react';
import { UserInfo } from '../types';

interface ChatProps {
  userInfo: UserInfo;
}

const Chat: React.FC<ChatProps> = ({ userInfo }) => {
  return (
    <div>
      <h1>Chat Page</h1>
      <p>Welcome to the chat page, {userInfo.username}.</p>
    </div>
  );
};

export default Chat;
