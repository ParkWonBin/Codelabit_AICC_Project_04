import React from 'react';
import { Menu, UserInfo } from '../types';

interface NavigationProps {
  selectedMenu: Menu;
  setSelectedMenu: React.Dispatch<React.SetStateAction<Menu>>;
  userInfo: UserInfo;
}

const Navigation: React.FC<NavigationProps> = ({ selectedMenu, setSelectedMenu, userInfo }) => {
  return (
    <nav>
      <button onClick={() => setSelectedMenu('chat')} className={selectedMenu === 'chat' ? 'active' : ''}>Chat</button>
      <button onClick={() => setSelectedMenu('board')} className={selectedMenu === 'board' ? 'active' : ''}>Board</button>
      <button onClick={() => setSelectedMenu('mypage')} className={selectedMenu === 'mypage' ? 'active' : ''}>
        {userInfo.isLoggedIn ? 'My Page' : 'Login'}
      </button>
    </nav>
  );
};

export default Navigation;
