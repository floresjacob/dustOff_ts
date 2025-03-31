// ProtectedHello.tsx
import React, { useState, useEffect } from 'react';

const ProtectedHello: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        // Get the token from localStorage (assuming that's where it's stored after login)
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:5001/protected_hello', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch protected data');
        }

        const data = await response.json();
        setMessage(data.message);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <div>
      <h1>Protected Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default ProtectedHello;