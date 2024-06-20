import React, { useState, useEffect } from 'react';
// import  Thread_Message  from './model/thread_message';
import axios from 'axios';


function App() {
    const [question, setQuestion] = useState('');
    const [chatHistory, setChatHistory] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [dots, setDots] = useState('');
    const [threads, setThreads] = useState([]);
    const [userMessage, setUserMessage] =  useState('');
    const [sendAssistantData, setSendAssistantData] =  useState(null);
    const [selectedThreadMessages, setSelectedThreadMessages] = useState([ ]);


    useEffect(() => {
        if (isFetching) {
            const interval = setInterval(() => {
                setDots(dots => dots.length < 10 ? dots + '.' : '');
            }, 500);
            return () => clearInterval(interval);
        }
    }, [isFetching]);

    let apiKey = '';

    const setApiButton = () => {
        apiKey = document.getElementById('api-key').value.trim();
        alert('API Key set!' + apiKey);
    };

    const setAssistantButton  = async (event)  =>{
        event.preventDefault();
        event.stopPropagation();
        const assistant_id = document.getElementById('assistant-id').value.trim();
        console.log(" ChatBot Asisstant_ID 발송 : "+ assistant_id );
        const responseElement = document.getElementById('response');


        try {
            const response = await axios.post(
                `https://api.openai.com/v1/assistants/${assistant_id}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                        'OpenAI-Beta': 'assistants=v2'
                    }
                }
            );

            setSendAssistantData(response.data);

            if (response.data.status === 'error') {
                throw new Error(`Error setting assistant! status: ${response.status}, details: ${JSON.stringify(response.data)}`);
            } else {
                console.log('Assistant set successfully:', response.data);

                // 여기에 추가적인 처리나 상태 업데이트를 할 수 있습니다.
                responseElement.textContent = JSON.stringify(response.data, null, 4);
            }

        } catch (error) {
            responseElement.textContent = `Error: ${error.message}`;
        }

    };

    // const sendMessageButton = async (event) => {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     const threadId = document.getElementById('thread-id').value.trim();
    //     const userMessage = document.getElementById('user-message').value.trim();
    //     console.log(" 메세지 전송 이벤트 발생, thread_id:"+ threadId + ", 전송된 메세지 내용:" + userMessage);
    //     const responseElement = document.getElementById('response');
    //
    //     try {
    //         const response = await axios.post(`https://api.openai.com/v1/threads/${threadId}/messages`, {
    //             headers: {
    //                 'Authorization': `Bearer ${apiKey}`,
    //                 'Content-Type': 'application/json',
    //                 'OpenAI-Beta': 'assistants=v2'
    //             },
    //             body: JSON.stringify({
    //                 role: "user",
    //                 content: userMessage
    //             })
    //         });
    //
    //         if(response.status === 404){
    //             const errorDetails = await response.text();
    //             throw new Error(`Error sending message! status: ${response.status}, details: ${errorDetails}`);
    //         }else{
    //             const data = await response.data;
    //             responseElement.textContent = JSON.stringify(data, null, 4);
    //         }
    //     }catch(error){
    //         responseElement.textContent = `Error: ${error.message}`;
    //     }
    // };


    const sendMessageButton = async (event) => {
        event.preventDefault(); // 기본 동작을 막음
        event.stopPropagation(); // 이벤트 전파를 막음

        const threadId = document.getElementById('thread-id').value.trim();
        const userMessage = document.getElementById('user-message').value.trim();
        console.log("메세지 전송 이벤트 발생, thread_id:" + threadId + ", 전송된 메세지 내용:" + userMessage);
        const responseElement = document.getElementById('response');

        try {
            const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'OpenAI-Beta': 'assistants=v2'
                },
                body: JSON.stringify({
                    role: "user",
                    content: userMessage
                })
            });

            if (response.status === 404) {
                const errorDetails = await response.text();
                throw new Error(`Error sending message! status: ${response.status}, details: ${errorDetails}`);
            }

            const data = await response.text(); // JSON 데이터를 문자열로 변환
            responseElement.textContent = data; // JSON 형식의 문자열 출력
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const setThreadButton = async (event)  => {
        event.preventDefault(); // 기본 동작을 막음
        event.stopPropagation(); // 이벤트 전파를 막음
        const threadId = document.getElementById('thread-id').value.trim();
        console.log("새롭게 생성된 thread_id:"+ threadId);
        const responseElement = document.getElementById('response');
        try{

            let response = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'OpenAI-Beta': 'assistants=v2'
                }
            });
          if(response.status === 404){

              response = await fetch('https://api.openai.com/v1/threads', {
                  method: 'POST',
                  headers: {
                      'Authorization': `Bearer ${apiKey}`,
                      'Content-Type': 'application/json',
                      'OpenAI-Beta': 'assistants=v2'
                  }
              });

              // const data = await response.json();
              const textData = await response.text();
              const data =  JSON.parse(textData);
              document.getElementById("thread-id").value = data.id;
              responseElement.textContent =  "새롭게 생성된 id ;" + data.id;

          }else{
              const data = await response.json();
              responseElement.textContent = JSON.stringify(data, null, 4);
          }
        }catch(error){
            responseElement.textContent = `Error: ${error.message}`;
        }

    };

    const handleInputChange = async (event) => {
        setQuestion(event.target.value);

        // 사용자가 엔터 키를 눌렀을 때 데이터를 전송합니다.
        if (event.key === 'Enter') {
            event.preventDefault(); // 기본 동작을 막음
            event.stopPropagation(); // 이벤트 전파를 막음

            if (!question.trim()) return; // 빈 값일 때는 요청을 보내지 않음

            setIsFetching(true);

            try {
                const response = await axios.post('http://localhost:5000/add_client_thread', { content: question });

                if (response.data.status === 'success') {
                    // 상담자가 입력한 질문과 챗봇의 응답을 채팅 기록에 추가
                    setChatHistory(prev => `${prev}\n상담자: ${question}\n쳇봇: ${response.data.answer}`);
                } else {
                    alert('Error: ' + response.data.message);
                }
            } catch (error) {
                alert('Error: ' + error.message);
            } finally {
                setIsFetching(false);
                setQuestion('');
            }
        }


        /* event.preventDefault();
         if (question.trim()) {
             setIsFetching(true);
             setChatHistory(prev => `${prev}\n상담자: ${question}`);
             try {
                 const response = await axios.post('http://localhost:5000/add_client_thread', { content: question });
                 if (response.data.status === 'success') {
                     setChatHistory(prev => `${prev}\n쳇봇: ${response.data.answer}`);
                 } else {
                     alert('Error: ' + response.data.message);
                 }
             } catch (error) {
                 alert('Error: ' + error.message);
             } finally {
                 setIsFetching(false);
             }
             setQuestion(event.target.value);
         }*/

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (question.trim()) {
            setIsFetching(true);
            setChatHistory(prev => `${prev}\n상담자: ${question}`);
            try {
                const [response1, response2, response3 ] = await Promise.all([
                    axios.post('http://localhost:4000/ere', { content: question }),
                    axios.post('http://localhost:5000/add_client_thread', { content: question }),
                    axios.post('http://localhost:4000/fraud_words', { content: question })
                ]);

                if (response1.data.status === 'success') {
                    setChatHistory(prev => `${prev}\n쳇봇: ${response1.data.answer}`);
                } else {
                    alert('Error: ' + response1.data.message);
                }

                if (response2.data.status === 'success') {
                    setChatHistory(prev => `${prev}\n쳇봇: ${response2.data.answer}`);
                } else {
                    alert('Error: ' + response2.data.message);
                }
                if (response3.data.status === 'success') {
                    setChatHistory(prev => `${prev}\n쳇봇: ${response3.data.answer}`);
                } else {
                    alert('Error: ' + response3.data.message);
                }
            } catch (error) {
                alert('Error: ' + error.message);
            } finally {
                setIsFetching(false);
                setQuestion('');
            }
        }



        // event.preventDefault();
        // console.log(question)
        // if (question.trim()) {
        //     setIsFetching(true);
        //     setChatHistory(prev => `${prev}\n상담자: ${question}`);
        //     try {
        //         const response = await axios.post('http://localhost:4000/ere', { content: question });
        //         // const response = await axios.post('http://localhost:5000/add_client_thread', { content: question });
        //         if (response.data.status === 'success') {
        //             setChatHistory(prev => `${prev}\n쳇봇: ${response.data.answer}`);
        //         } else {
        //             alert('Error: ' + response.data.message);
        //         }
        //     } catch (error) {
        //         alert('Error: ' + error.message);
        //     } finally {
        //         setIsFetching(false);
        //     }
        //     setQuestion('');
        // }
    };

    const fetchThreads = async () => {
        try {
            const response = await axios.get('http://localhost:5000/get_client_threads');
            setThreads(response.data);
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    useEffect(() => {
        fetchThreads();
    }, []);

    const handleThreadClick = async () => {
        // event.preventDefault();
        const thread_id = 'thread_id1234567_test';
        try {
            const response = await axios.get(`http://localhost:5000/get_thread_messages/${thread_id}`);
            setSelectedThreadMessages(response.data);
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (

        <div className="App">
            {/*API 키 입력*/}
            <h2> 1.계정(API KEY) 연동</h2>
            <label htmlFor="api-key">API Key:</label>
            <input type="text" id="api-key" name="api-key"/>
            <button onClick={() => setApiButton()}>(유사 로그인) KEY 설정</button>
            <pre>
            OpenAI-API KEY를 입력하고 버튼을 누르면 해당 KEY로 요청 해더가 설정됩니다. <br/>
            API KEY를 입력한다는 건 해당 ID로 로그인 하는 것이라고 생각해도 무방하겠습니다. <br/>

                {/* Thread 등록*/}
                <label htmlFor="thread-id">Thread ID:</label>
            <input type="text" id="thread-id" name="thread-id"/>
            <button onClick={(event) => setThreadButton(event)}>(유사 체팅방) 생성/설정</button>
            (1) 설정 :
            - openAI 계정에 결제 카드가 연결되어 있지 않으면 메시지가 생성 불가.
            </pre>

            {/*Assistant 등록*/}
            <h2> 3. 챗봇(Assistant) 설정</h2>
            <label htmlFor="assistant-id">Assistant ID:</label>
            <input type="text" id="assistant-id" name="assistant-id"/>
            <button onClick={(event) => setAssistantButton(event)}>(유사 챗봇) 설정</button>
            <pre/>

            <h2> 4. 채팅 주고 받기</h2>
            <pre>
            위에서 설정한 채팅방(Thread)에서 설정된 챗봇(Assistant)와 대화를 합니다.
            물어보고 싶은 내용을 아래의 입력창에 입력하고 [메시지 전송] 버튼을 클릭합니다.
            * 챗봇은 바로 응답하는 않고 [챗봇 응답 생성]버튼을 눌러야 응답이 생성됩니다.
            * 주고받은 메시지를 확인하고 싶은 경우 [채팅내역 확인]버튼을 누릅니다.
            </pre>
            <label htmlFor="user-message">Ask to GPT:</label><br/>
            <textarea id="user-message" name="user-message" rows="4" cols="50"></textarea><br/>
            <button onClick={(event) => sendMessageButton(event)}>메시지 전송</button>
            <button id="run-assistant-button">챗봇 응답 생성</button>
            <button id="show-message-list-button">채팅내역 확인</button>
            <hr/>


            {/* 메시지 표시*/}
            <pre id="response"></pre>

            <hr/>

            <h1>부동산 전세사기 예방봇을 제공하는 상담 창구</h1>
            <textarea
                value={isFetching ? `응답중${dots}` : chatHistory}
                rows="10"
                cols="50"
                readOnly
            />
            <form onSubmit={handleSubmit}>
                <textarea
                    value={question}
                    onChange={handleInputChange}
                    placeholder="상담 내용을 여기에 입력하세요."
                    rows="4"
                    cols="50"
                />
                <br/>
                <button type="submit">보내기</button>
            </form>
          {/*  <textarea
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={handleInputChange}
                placeholder="상담 내용을 여기에 입력하세요."
                rows="4"
                cols="50"
                disabled={isFetching}
            />
            <br/>
            <pre>{chatHistory}</pre>*/}
            <div>
                <h2>Thread [채팅창] 리스트</h2>

                {/* <button onClick={() => handleThreadClick()}>검색
                    </button>*/}

                <ul>
                    {threads.map(thread => (
                        <li key={thread.id}>
                    <li>
                            <button onClick={() => handleThreadClick(thread.thread_id)}>
                                쓰레드 아이디:{thread.thread_id}
                            </button>
                        </li>
                    </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Selected Thread 메시지 Message_ID로 조회 </h2>
                <ul>
                    {selectedThreadMessages.map(message => (
                        <li key={message.id}>
                            {message.assistant_id} <br/>
                            {message.message_content} <br/>
                            {message.thread_id} </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
