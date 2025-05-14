// CommunityPage.js — basic anonymous chat + support thread page

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
    <div className="min-h-screen bg-purple-50 text-gray-900 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">Community Support 💬</h2>

      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-4 space-y-4 overflow-y-auto h-[400px]">
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

      <div className="mt-4 w-full max-w-2xl flex gap-2">
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
    </div>
  );
};

export default CommunityPage;
