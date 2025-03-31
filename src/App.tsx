import React, { useState } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import ProtectedHello from './ProtectedHello';
import Login from './Login'
import './App.css'

function App() {
  const [username, setUsername] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = (username: string) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
  }

  return (
    <BrowserRouter>
      <div className="App">

        <Routes>
          <Route 
            path="/login"
            element={isLoggedIn ? <Navigate to="/protected-hello" /> : <Login onLogin={handleLogin}/>}
          />

          <Route
            path="/protected-hello"
            element={isLoggedIn ? <ProtectedHello /> : <Navigate to="/login" />}
          />
          <Route
            path="/" 
            element={<Navigate to={isLoggedIn ? "/protected-hello" : "/login"} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
