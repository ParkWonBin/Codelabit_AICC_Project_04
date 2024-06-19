import React from 'react';
import { UserInfo } from '../../types';

interface MyPageFormProps {
  userInfo: UserInfo;
}

const MyData: React.FC<MyPageFormProps> = ({ userInfo }) => {
  return (
    <div>
      <h1>My Page</h1>
      <p>Welcome, {userInfo.username}</p>
    </div>
  );
};

export default MyData;
