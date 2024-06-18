import React from 'react';
import './App.css';

const App: React.FC = () => {
  const apiUrl: string = process.env.REACT_APP_API_URL as string;
  const apiKey: string = process.env.REACT_APP_API_KEY as string;
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Environment Variables in React</h1>
        <p>API URL: {apiUrl}</p>
        <p>API Key: {apiKey}</p>
      </header>
    </div>
  );
};

export default App;