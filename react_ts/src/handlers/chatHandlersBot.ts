import { Bot } from '../types/chat';
import { useChatContext } from '../contexts/chatContext';
import { getBotList, CreateBot, UpdateBot, DeleteBot } from '../hooks/useChatDataBot'

export const useChatHandlersBot = () => {
  const { bots, setBots, setSelectedBot, setModalProps} = useChatContext();

  const handleCreateBot = () => {

    const submit = async  (formData: Record<string, string>)=>{
      // alert(JSON.stringify(formData, null, 2));
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

    setModalProps({
      visible: true,
      title: "챗봇 생성",
      onSubmit: submit,
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
    // alert(`${bot.name} 수정`);
    const submit = async  (formData: Record<string, string>)=>{
      // alert(JSON.stringify(formData, null, 2));
      const updatedBot: Bot | undefined = await UpdateBot({
        id: bot.id,
        name: formData.name,
        description: formData.description,
        instructions: formData.instructions,
      });
      // alert(JSON.stringify(updatedBot, null, 2));
      if (updatedBot) {
        setBots(bots.map(x => (x.id === bot.id ? updatedBot : x)));
      }
    }

    // 채팅방 생성
    setModalProps({
      visible: true,
      title: "챗봇 정보 수정",
      onSubmit: submit,
      data: [
        { label: '챗봇이름', key: 'name', type: 'input', value: bot.name },
        { label: '지시사항', key: 'instructions', type: 'textarea', 
          value: bot.instructions ?bot.instructions :"", rows: 5 },
        { label: 'Model', key: 'model', type: 'select', 
          value: bot.model ? bot.model :'gpt-3.5-turbo', 
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

  const handleDeleteBot = async (bot: Bot) => {
    const shouldDelete = window.confirm(
      `${bot.name}(${bot.id})를 정말 삭제할까요?`
    )

    if(!shouldDelete){return}
    
    alert(`${bot.name} 삭제`);
    const isDeleteComplete = await DeleteBot(bot)
    if(!isDeleteComplete){return}

    setBots(bots.filter(x => x.id !== bot.id));
    setSelectedBot(null);
  };

  const handleBotClick = (bot: Bot) => {
    setSelectedBot(bot);
    // alert(`${bot.name} 선택`);
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
