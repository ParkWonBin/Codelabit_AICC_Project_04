import { Message } from '../types/chat';

const REACT_APP_FLASK_URL = process.env.REACT_APP_FLASK_URL || 'http://localhost:5001';

export const GetRoomMessages = async (thread_id:string):Promise<Message[]> => {
    let msglist: Message[] = [];

    if (thread_id === 't1') {
      msglist = [
        { sender_id: 'a1', role: 'assistant', content: 'Hi there!' },
        { sender_id: null, role: 'user', content: 'Hello' }
      ];
    } else {
      msglist = [
        { sender_id: 'a2', role: 'assistant', content: 'test!' },
        { sender_id: null, role: 'user', content: '123' }
      ];
    }

    return msglist
}

