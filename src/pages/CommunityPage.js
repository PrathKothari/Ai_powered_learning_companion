// src/pages/CommunityPage.js

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import DarkModeToggle from '../components/DarkModeToggle';

const CommunityPage = () => {
  const [messages, setMessages] = useState([
    { id: uuidv4(), text: 'Welcome to the ADHD Support Space! 💬', sender: 'system' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: uuidv4(), text: newMessage, sender: 'user' }]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-violet-200 text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-pink-700">Community Support 💬</h1>
        <DarkModeToggle />
      </header>

      {/* Chat Box */}
      <main className="px-6 py-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-4 space-y-4 overflow-y-auto h-[400px]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-lg text-sm shadow-sm w-fit max-w-[80%] ${
                msg.sender === 'user'
                  ? 'ml-auto bg-indigo-100 text-indigo-900'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a supportive message..."
            className="flex-1 p-3 border rounded-lg shadow"
          />
          <button
            onClick={handleSend}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Send
          </button>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="text-center py-6">
        <Link
          to="/dashboard"
          className="inline-block bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          Back to Dashboard
        </Link>
      </footer>
    </div>
  );
};

export default CommunityPage;
