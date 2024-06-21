import React, { useState } from 'react';
import { Menu, UserInfo } from './types';

import './App.css';
import Chat from './pages/chat';
import MyPage from './pages/mypage';
import Board from './pages/board';
import Navigation from './components/navigation';

const App: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<Menu>('mypage');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id:-1,
    username:"",
    email:"",
    token:"",
    isLoggedIn:true
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
    <div id="App">
      {userInfo.isLoggedIn
        ?<Navigation selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} userInfo={userInfo} />
        :<></>
      }
      {renderPage()}
    </div>
  );
};

export default App;
