import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import ChatRoom from './Chatview';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navb from './Navbar';

function App() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  return (
    <Router>
      <div className="App">
        <Navb />
        <Routes>
          <Route path="/" element={!username ? <Login setUsername={setUsername} setError={setError} /> : <ChatRoom username={username} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
