import React, { useState } from 'react';
import { UserInfo } from '../../types';
import { login, register } from '../../hooks/useAuth';

import './loginForm.css';

interface LoginProps {
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const LoginForm: React.FC<LoginProps> = ({ setUserInfo }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      alert('이름과 비밀번호를 모두 입력하세요.');
      return;
    }

    try {
      const userInfo:UserInfo = await login(username, password);
      alert(JSON.stringify(userInfo,null,2))
      setUserInfo(userInfo);
    } catch (error) {
      console.error('로그인 실패', error);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !email || !password) {
      alert('이름, 이메일, 비밀번호를 모두 입력하세요.');
      return;
    }

    try {
      await register(username, email, password);
      alert('회원가입 성공!!');
      setIsRegistering(false);
    } catch (error : any) {
      alert(JSON.stringify(error,null,2));
    }
  };

  const renderLoginForm = () => (
    <div id="loginForm">
      <h1>로그인</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <button type="submit">로그인</button>
      </form>
      <button type="button" onClick={() => setIsRegistering(true)}>회원가입</button>
    </div>
  );
  
  

  const renderRegisterForm = () => (
    <div id="registerForm">
      <h1>회원가입</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <button type="submit">등록</button>
      </form>
      <button type="button" onClick={() => setIsRegistering(false)}>취소</button>
    </div>
  );
  

  return (
    <>
      {isRegistering ? renderRegisterForm() : renderLoginForm()}
    </>
  );
};

export default LoginForm;
