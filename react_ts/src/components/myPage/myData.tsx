import React from 'react';
import { UserInfo } from '../../types';

interface MyPageFormProps {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const MyData: React.FC<MyPageFormProps> = ({ userInfo, setUserInfo }) => {

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 로그아웃 처리
      setUserInfo({
        id: -1,
        username: "",
        email: "",
        token: "",
        isLoggedIn: false
      });
      alert('로그아웃 되었습니다.');
    } catch (error) {
      console.error('로그아웃 실패', error);
    }
  };

  return (
    <div>
      <h1>마이 페이지</h1>
      <p>환영합니다, {userInfo.username}</p>
      <p>이메일: {userInfo.email}</p>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default MyData;
