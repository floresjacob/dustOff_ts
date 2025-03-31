import React, { useState, FormEvent } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

interface LoginProps {
    onLogin: (username: string) => void;
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                // Use server error message if available
                throw new Error(data.message || 'Login failed');
            }
            
            // Store JWT token and user info
            localStorage.setItem('token', data.access_token);
            
            // Notify parent component about successful login
            onLogin(username);
            
            // Redirect to protected hello page
            navigate('/protected-hello');
        } catch (err) {
            console.error('Login error:', err);
            setError(typeof err === 'object' && err !== null && 'message' in err 
                ? (err as Error).message 
                : 'Login failed. Please check your credentials.');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: '2rem auto' }}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div style={{ marginBottom: '1rem' }}>
                <label>Username
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <label>Password
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </label>
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;