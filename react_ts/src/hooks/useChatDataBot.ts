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
    
    botlist = data.map((bot: any) => ({
      id: bot.id,
      name: bot.name,
      description: bot.description,
      instructions: bot.instructions
    }));

  } catch (error) {
    console.error('Failed to fetch bot list:', error);
  }

  return botlist;
}

export const CreateBot = async (body:Bot): Promise<Bot|undefined> => {
  try {
    const response = await fetch(`${REACT_APP_FLASK_URL}/api/assistant/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    });    

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    const newBot:Bot ={
      id: data.id,
      name: data.name,
      description: data.description,
      instructions: data.instructions
    };

    return newBot;
  } catch (error) {
    console.error('Failed to fetch bot list:', error);
  }
}


export const UpdateBot = async (body:Bot): Promise<Bot|undefined> => {
  try {
    const response = await fetch(`${REACT_APP_FLASK_URL}/api/assistant/${body.id}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    });    

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    const newBot:Bot ={
      id: data.id,
      name: data.name,
      description: data.description,
      instructions: data.instructions
    };

    return newBot;
  } catch (error) {
    console.error('Failed to fetch bot list:', error);
  }
}

export const DeleteBot = async (bot:Bot): Promise<boolean> => {
  const response = await fetch(`${REACT_APP_FLASK_URL}/api/assistant/delete/${bot.id}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
  });    

  if(response.ok){
    alert("삭제 완료")
    return true
  }else{
    alert("삭제 실패")
    return false
  }
}