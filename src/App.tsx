import React, { useState } from 'react'
import Login from './Login'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username: string) => {
    setUsername(username);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUsername('');
    setIsAuthenticated(false);
  }

  return (
    <div style={{ padding: '2rem' }}> 
      {isAuthenticated ? (
        <div>
          <h1>Welcome, {username}!</h1>
          <p>You are now logged in</p>
          {/* logout button */}
          <button onClick={(handleLogout)}>Logout</button>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App
