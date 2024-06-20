export type Menu = 'chat' | 'mypage' | 'board';

export interface UserInfo {
  id:number;
  username: string;
  email:string;
  token:string;
  isLoggedIn: boolean;
}
