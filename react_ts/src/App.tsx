import React, { useState } from 'react';
import { Menu, UserInfo } from './types';

import Chat from './pages/chat';
import MyPage from './pages/mypage';
import Board from './pages/board';
import Navigation from './components/navigation';

const App: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<Menu>('chat');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: 'test',
    isLoggedIn: false,
  });

  const renderPage = () => {
    switch (selectedMenu) {
      case 'chat':
        return <Chat userInfo={userInfo} />;
      case 'mypage':
        return <MyPage userInfo={userInfo} setUserInfo={setUserInfo} />;
      case 'board':
        return <Board userInfo={userInfo} />;
      default:
        return <Chat userInfo={userInfo} />;
    }
  };

  return (
    <div>
      <Navigation selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} userInfo={userInfo} />
      <div>
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
