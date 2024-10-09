import React, { useState } from 'react';
import './App.css'; 


const App: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [connectionCount, setConnectionCount] = useState<number | null>(null);

  const checkConnectionRequests = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'checkCount' }, (response) => {
          if (response) {
            setConnectionCount(response.count);
            alert(`Found ${response.count} connection requests available.`);
          }
        });
      }
    });
  };

  const startAutomation = () => {
    // Disable the button when starting the automation
    setIsRunning(true);
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'start' }, (response) => {
          console.log(response?.message);
        });
      }
    });
  };

  return (
    <div className="App">
      <h1>LinkedIn Connect Automation</h1>
      <button onClick={checkConnectionRequests} disabled={isRunning}>
        {isRunning ? 'Running...' : 'Check Connection Requests'}
      </button>
      <button onClick={startAutomation} disabled={isRunning || connectionCount === null || connectionCount === 0}>
        {isRunning ? 'Running...' : 'Start Connecting'}
      </button>
      {connectionCount !== null && !isRunning && (
        <p>
          Found {connectionCount} connection requests available.
        </p>
      )}
    </div>
  );
};

export default App;
