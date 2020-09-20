import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav class="navbar">
        <div class="navbar-fixed">
          <ul class="navbar-nav ml-auto">
            <li>Map</li>
            <li onClick={() => document.getElementsByClassName("App-header")[0].innerHTML += "<iframe src='https://compostsearchbar.netlify.app/' frameBorder='0' style='width: 100%; height: 100%;'></iframe>"}>Identify Items</li>
            <li>Log</li>
            <li>Announcements</li>
          </ul>
        </div>
      </nav>
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
