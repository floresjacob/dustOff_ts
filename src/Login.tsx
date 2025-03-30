import React, { useState, FormEvent } from 'react';

interface LoginProps {
    onLogin: (username: string) => void;
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
            onLogin(username);
        } else {
            setError(data.error);
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