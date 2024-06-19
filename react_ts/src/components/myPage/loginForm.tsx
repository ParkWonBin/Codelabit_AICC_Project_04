import React, { useState } from 'react';
import { UserInfo } from '../../types';
import { login } from '../../hooks/useAuth';

interface LoginProps {
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const LoginForm: React.FC<LoginProps> = ({ setUserInfo }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userInfo = await login(username, password);
      setUserInfo(userInfo);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
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
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
