'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('/api/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        router.push('/login'); // Redirect to login on successful registration
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err: any) {
      setError('Error during registration. Please try again.');
      console.error("Registration error:", err?.response?.data || err?.message); // Log error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6 flex flex-col items-stretch"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700">Register</h2>

        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}

        <div className="flex flex-col">
          <label htmlFor="username" className="text-sm font-medium mb-1 text-gray-700">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium mb-1 text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
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
            id="password"
            name="password"
            type="password"
            required
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="text-sm font-medium mb-1 text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Register
        </button>

        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}