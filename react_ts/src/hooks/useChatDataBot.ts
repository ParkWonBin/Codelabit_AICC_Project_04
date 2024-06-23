import { Bot } from '../types/chat';

const REACT_APP_FLASK_URL = process.env.REACT_APP_FLASK_URL || 'http://localhost:5001';

export const getBotList = async (): Promise<Bot[]> => {
  let botlist: Bot[] = [];

  try {
    const response = await fetch(`${REACT_APP_FLASK_URL}/api/assistant/`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    });    

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    
    botlist = data.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      instructions: item.instructions,
      temperature: item.temperature
    }));

  } catch (error) {
    console.error('Failed to fetch bot list:', error);
  }

  return botlist;
}
