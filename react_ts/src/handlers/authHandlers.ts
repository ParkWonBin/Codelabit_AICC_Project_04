import { UserInfo } from '../types';
import { login, register } from '../hooks/useAuth';

const defaultInfo: UserInfo = {
  id:-1,
  username:"",
  email:"",
  token:"",
  isLoggedIn:false
}

export const handleAuthLogin = async (username:string, password:string):Promise<UserInfo> =>{
  let userInfo:UserInfo = defaultInfo

  if (!username || !password) {
    alert('이름과 비밀번호를 모두 입력하세요.');
    return userInfo;
  }

  try {
    userInfo = await login(username, password);
    alert(JSON.stringify(userInfo,null,2))
  } catch (error) {
    console.error('로그인 실패', error);
  }

  return userInfo
}

export const handleAuthRegister =  async (username:string, email:string, password:string)=>{  
  if (!username || !email || !password) {
    alert('이름, 이메일, 비밀번호를 모두 입력하세요.');
    return;
  }

  try {
    alert(`${username}, ${email}, ${password}`)
    register(username, email, password);
    alert('회원가입 성공!!');
    
  } catch (error : any) {
    alert('회원가입 실패!!');
    alert(JSON.stringify(error,null,2));
  }
}

export const handleAuthlogout = ():UserInfo=>{
  alert('로그아웃 되었습니다.');
  return defaultInfo
}