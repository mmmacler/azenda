// app/page.js
/*
import TaskCalendar from '../components/Calendar';

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Azenda</h1>
      <TaskCalendar />
    </main>
  );
}
*/
'use client';

import { useState } from 'react';
import Link from 'next/link'
// Regular expression to allow only letters and numbers for username
const usernameRegex = /^[a-zA-Z0-9]+$/;

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Validate username format before submitting
        if (!usernameRegex.test(username)) {
            setError('Username can only contain letters and numbers.');
            return;
        }

        const response = await fetch('http://localhost:8000/api/login/', {  // Add the trailing slash
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Login successful:', result);
            window.location.href = `/useraccount/${username}`;  // Redirect to calendar page on success
        } else {
            setError('Login failed. Please try again.');
        }
    };
//big block containing the input fields, where the user enters strings
    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#9ab18c' }}>
            <div className="p-8 rounded shadow-md max-w-md w-full" style={{ backgroundColor: '#778e65' }}>
                <h2 style={{color: '#c2c2e6'}} className="text-2xl font-bold mb-6 text-center">
                    Login to Your Account
                </h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-black-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-black-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            backgroundColor: loading ? '#cccccc' : '#b5b5ec', // Custom color for loading and normal states
                            color: '#ffffff', // Text color
                        }}
                        className="w-full py-2 px-4 font-semibold rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-opacity-75"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <Link href = "/addaccount" style={{color: '#c2c2e6'}}><br />Create an Account</Link>
            </div>
        </div>
    );
};

export default LoginPage;
