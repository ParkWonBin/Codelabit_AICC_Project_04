import { Bot } from '../types/chat';
import { useChatContext } from '../contexts/chatContext';

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

  return {
    handleBotClick,
    handleCreateBot,
    handleUpdateBot,
    handleDeleteBot
  };
};
