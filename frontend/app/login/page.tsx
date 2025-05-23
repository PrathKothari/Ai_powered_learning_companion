'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/login', formData);

      if (response.status === 200 && response.data.authToken) {
        localStorage.setItem('authToken', response.data.authToken);
        router.push('/dashboard'); // redirect on success
      } else {
        setError('Invalid credentials');
      }
    } catch (err: any) {
      setError('Login failed. Please try again.');
      console.error("Login error:", err?.response?.data || err?.message); // Log the error for debugging
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6 flex flex-col items-stretch">
        <h2 className="text-2xl font-bold text-center text-indigo-700">Login</h2>

        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium mb-1 text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium mb-1 text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Login
        </button>

        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?
          </p>
          <Link href="/register">
            <button className="mt-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}