import { Bot } from '../types/chat';
import { useChatContext } from '../contexts/chatContext';
import { getBotList, CreateBot } from '../hooks/useChatDataBot'

export const useChatHandlersBot = () => {
  const { bots, setBots, setSelectedBot, setModalProps} = useChatContext();

  const handleCreateBot = () => {

    const onSubmit = async  (formData: Record<string, string>)=>{

      alert(JSON.stringify(formData, null, 2));

      const newBot: Bot | undefined = await CreateBot({
        id: formData.id,
        name: formData.name,
        description: formData.description,
        instructions: formData.instructions,
      });

      if (newBot){
        setBots([newBot, ...bots ])
      }
    }
    // alert(`챗봇 생성`);

    
    // 채팅방 생성
    setModalProps({
      visible: true,
      title: "챗봇 생성",
      onSubmit: onSubmit,
      data: [
        { label: '챗봇이름', key: 'name', type: 'input', value: 'Math Tutor' },
        { label: '지시사항', key: 'instructions', type: 'textarea', value: 'You are a personal math tutor. When asked a question, write and run Python code to answer the question', rows: 5 },
        { label: 'Model', key: 'model', type: 'select', 
          value: 'gpt-3.5-turbo', 
          options: [
            'gpt-4.0', 
            'gpt-4-turbo', 
            'gpt-3.5-turbo-16k', 
            'gpt-3.5-turbo-0125', 
            'gpt-3.5-turbo'
          ] 
        }
      ]
    });
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
