// import { Room } from '../types/chat';

const REACT_APP_FLASK_URL = process.env.REACT_APP_FLASK_URL || 'http://localhost:5001';

export const CreateRoom = async ():Promise<{ thread_id: string|null }> => {
  const url = `${REACT_APP_FLASK_URL}/api/thread/`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};

