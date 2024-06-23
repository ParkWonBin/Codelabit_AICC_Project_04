import { Bot } from '../types/chat';
import { useChatContext } from '../contexts/chatContext';
import { getBotList } from '../hooks/useChatDataBot'

export const useChatHandlersBot = () => {
  const { bots, setBots, setSelectedBot } = useChatContext();

  const handleCreateBot = () => {
    const newBot : Bot = {
      id: 'a3',
      name: 'Bot 3'
    }
    setBots([...bots, newBot ])

    alert(`챗봇 생성`);
  };

  const handleUpdateBot = (bot: Bot) => {
    alert(`${bot.name} 수정`);
  };

  const handleDeleteBot = (bot: Bot) => {
    setBots(bots.filter(x => x.id !== bot.id));
    alert(`${bot.name} 삭제`);
    setSelectedBot(null);
  };

  const handleBotClick = (bot: Bot) => {
    setSelectedBot(bot);
    alert(`${bot.name} 선택`);
  };

  const handleGetBotList = async() =>{
    if (bots.length === 0) { 
      alert("챗봇 목록 가져오기");
      try {
        const botlist: Bot[] = await getBotList();
        setBots(botlist);
      } catch (error) {
        console.error('Failed to set bot list:', error);
      }
    }
  }

  return {
    handleGetBotList,
    handleBotClick,
    handleCreateBot,
    handleUpdateBot,
    handleDeleteBot
  };
};
