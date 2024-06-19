import React from 'react';
import { UserInfo } from '../types';
import LoginForm from '../components/myPage/loginForm';
import MyData from '../components/myPage/myData';

interface PageProps {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const MyPage: React.FC<PageProps> = ({ userInfo, setUserInfo }) => {
  return userInfo.isLoggedIn 
    ? <MyData userInfo={userInfo} /> 
    : <LoginForm setUserInfo={setUserInfo} />;
};

export default MyPage;
