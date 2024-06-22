import React, { useState } from 'react';
import { Menu, UserInfo } from './types';
import { ChatProvider } from './contexts/chatContext';

import './App.css';
import Chat from './pages/chat';
import MyPage from './pages/mypage';
import Board from './pages/board';
import Navigation from './components/navigation';

const App: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<Menu>('mypage');

  const [userInfo, setUserInfo] = useState<UserInfo>({
    id:1,
    username:"a",
    email:"a@a",
    token:"",
    isLoggedIn:true
  });

  const renderPage = () => {
    switch (selectedMenu) {
      case 'chat':
        return <Chat userInfo={userInfo} />;
      case 'board':
        return <Board userInfo={userInfo} />;
      default:
        // mypage'
        return <MyPage userInfo={userInfo} setUserInfo={setUserInfo} />;
    }
  };

  return (
    <div id="App">
      {userInfo.isLoggedIn
        ?<Navigation selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} userInfo={userInfo} />
        :<></>
      }
      <ChatProvider>
        {renderPage()}
      </ChatProvider>
    </div>
  );
};

export default App;
