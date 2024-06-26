import React, { useState } from 'react';
import { Menu, UserInfo, ModalProps } from './types';
import { ChatProvider } from './contexts/chatContext';

import './App.css';
import Chat from './pages/chat';
import MyPage from './pages/mypage';
import Board from './pages/board';
import Navigation from './components/navigation';
import Modal from './components/modal';

const App: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<Menu>('mypage');

  const [userInfo, setUserInfo] = useState<UserInfo>({
    isLoggedIn:false,id:0,username:"",email:"",token:""
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
    <ChatProvider>
      <div id="App">
        {userInfo.isLoggedIn
          ?<Navigation selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} userInfo={userInfo} />
          :<></>
        }
        <Modal />
        {renderPage()}
      </div>
    </ChatProvider>
  );
};

export default App;
