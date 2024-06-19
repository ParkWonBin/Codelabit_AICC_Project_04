import React from 'react';
import { UserInfo } from '../types';

interface BoardProps {
  userInfo: UserInfo;
}

const Board: React.FC<BoardProps> = ({ userInfo }) => {
  return (
    <div>
      <h1>Board Page</h1>
      <p>Welcome to the board page, {userInfo.username}.</p>
    </div>
  );
};

export default Board;
