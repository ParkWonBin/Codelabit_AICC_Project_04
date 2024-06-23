export type Menu = 'chat' | 'mypage' | 'board';

export interface UserInfo {
  id:number;
  username: string;
  email:string;
  token:string;
  isLoggedIn: boolean;
}

export interface ModalProps {
  visible: boolean;
  title: string;
  onSubmit?: (formData: Record<string, string>) => Promise<void> | void;
  onClose?: (formData: Record<string, string>) => Promise<void> | void;
  data?: {
    label: string;
    key: string;
    value: string;
    type: "input" | "select" | "textarea";
    options?: string[]; 
    rows?:number;
  }[];
}