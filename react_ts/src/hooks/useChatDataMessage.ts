import { Message } from '../types/chat';

const REACT_APP_FLASK_URL = process.env.REACT_APP_FLASK_URL || 'http://localhost:5001';

export const GetMessages = async (thread_id: string): Promise<Message[]> => {
    let msglist: Message[] = [];
  
    try {
      const response = await fetch(`${process.env.REACT_APP_FLASK_URL}/api/thread/${thread_id}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      msglist = data.data.map((msg: any) => ({
          id: msg.id,
          thread_id: msg.thread_id,
          created_at: msg.created_at,
          
          role: msg.role,
          sender_id: msg.assistant_id || null,
          content: msg.content.map((c: any) => c.text?.value).join(' '),
      })).reverse();

    } catch (error) {
      console.error('Failed to fetch room messages:', error);
    }
  
    return msglist;
  }
  
export const sendMessage = async (thread_id: string, content: string): Promise<Message | null> => {
    try {
        const response = await fetch(`${REACT_APP_FLASK_URL}/api/message/${thread_id}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ role: 'user', content })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        const message: Message = {
            id: data.id,
            thread_id: data.thread_id,
            content: data.content.map((c: any) => c.text?.value).join(' '),
            created_at: data.created_at,
            role: data.role,
            sender_id: data.assistant_id
        };

        return message;
    } catch (error) {
        console.error('Failed to send message:', error);
        return null;
    }
}

export const receiveMessage = async (thread_id: string, assistant_id: string): Promise<Message | null> => {
    try {
      const response = await fetch(
        `${REACT_APP_FLASK_URL}/api/runs/${thread_id}/${assistant_id}`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
        }
      );
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      alert(JSON.stringify(data))
      console.log(JSON.stringify(data))
  
      const message: Message = {
        id: data.id,
        thread_id: data.thread_id,
        content: data.content.map((c: any) => c.text?.value).join(' '),
        created_at: data.created_at,
        role: data.role,
        sender_id: data.assistant_id
      };
  
      return message;
    } catch (error) {
      console.error('Failed to receive message:', error);
      return null;
    }
  };