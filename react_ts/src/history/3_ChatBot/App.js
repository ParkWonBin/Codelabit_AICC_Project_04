import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [question, setQuestion] = useState('');
    const [chatHistory, setChatHistory] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [dots, setDots] = useState('');

    useEffect(() => {
        if (isFetching) {
            const interval = setInterval(() => {
                setDots(dots => dots.length < 10 ? dots + '.' : '');
            }, 500);
            return () => clearInterval(interval);
        }
    }, [isFetching]);

    const handleInputChange = (event) => {
        setQuestion(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (question.trim()) {
            setIsFetching(true);
            setChatHistory(prev => `${prev}\n상담자: ${question}`);
            try {
                const response = await axios.post('http://localhost:5000/ere', { content: question });
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
            setQuestion('');
        }
    };

    return (
        <div className="App">
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
                <br />
                <button type="submit">보내기</button>
            </form>
        </div>
    );
}

export default App;
