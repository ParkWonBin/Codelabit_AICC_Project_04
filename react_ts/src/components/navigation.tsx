import React from 'react';
import { Menu, UserInfo } from '../types';

import './navigation.css';

interface NavigationProps {
  selectedMenu: Menu;
  setSelectedMenu: React.Dispatch<React.SetStateAction<Menu>>;
  userInfo: UserInfo;
}

const Navigation: React.FC<NavigationProps> = ({ selectedMenu, setSelectedMenu, userInfo }) => {
  return (
    <nav id="mainNav">
      <button onClick={() => setSelectedMenu('chat')} className={selectedMenu === 'chat' ? 'active' : ''}>챗봇</button>
      <button onClick={() => setSelectedMenu('board')} className={selectedMenu === 'board' ? 'active' : ''}>게시판</button>
      <button onClick={() => setSelectedMenu('mypage')} className={selectedMenu === 'mypage' ? 'active' : ''}>
        {userInfo.isLoggedIn ? '내정보' : '로그인'}
      </button>
    </nav>
  );
};

export default Navigation;
