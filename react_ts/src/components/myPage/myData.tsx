import React from 'react';
import { UserInfo } from '../../types';
import { handleAuthlogout } from '../../handlers/authHandlers';
import { useChatContext } from '../../contexts/chatContext';

import './myData.css';

interface MyPageFormProps {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const MyData: React.FC<MyPageFormProps> = ({ userInfo, setUserInfo }) => {
  const {
    setBots, setRooms, setThread, 
    setSelectedBot, setSelectedRoom
  } = useChatContext()

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    setBots([])
    setRooms([])
    setThread({})
    setSelectedBot(null)
    setSelectedRoom(null)
    setUserInfo(handleAuthlogout())
  };

  const renderMyPage = () => (
    <div id="myPage">
      <h1>마이 페이지</h1>
      <p>환영합니다, {userInfo.username}</p>
      <p>이메일: {userInfo.email}</p>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
  
  return (
    <>{renderMyPage()}</>
  );
};

export default MyData;
