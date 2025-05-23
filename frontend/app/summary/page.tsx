'use client';

import React, { useState } from 'react';

export default function SummaryPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [interest, setInterest] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setError('');
    } else {
      setPdfFile(null);
      setError('Please upload a valid PDF file.');
    }
  };

  const handleInterestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInterest(event.target.value);
  };

  const handleSubmit = async () => {
    if (!pdfFile) {
      setError('Please upload a PDF file.');
      return;
    }
    if (!interest.trim()) {
      setError('Please enter your interest.');
      return;
    }

    setIsLoading(true);
    setSummary('');
    setError('');

    try {
      const formData = new FormData();
      formData.append('pdf', pdfFile);
      formData.append('interest', interest);

      const response = await fetch('/api/summarize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Summarization failed: ${errorMessage}`);
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (err: any) {
      setError(err.message || 'An error occurred during summarization.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-md p-8 text-white">
        <h1 className="text-2xl font-bold mb-6 text-indigo-400">Personalized PDF Summary</h1>

        <div className="mb-4">
          <label htmlFor="pdfUpload" className="block text-gray-300 text-sm font-bold mb-2">
            Upload PDF:
          </label>
          <input
            id="pdfUpload"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
          />
          {error && <p className="text-red-400 text-xs italic">{error}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="interest" className="block text-gray-300 text-sm font-bold mb-2">
            Your Interest:
          </label>
          <input
            type="text"
            id="interest"
            value={interest}
            onChange={handleInterestChange}
            placeholder="e.g., Space Exploration, Cooking, Music"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          disabled={isLoading || !pdfFile || !interest.trim()}
        >
          {isLoading ? 'Summarizing...' : 'Get Personalized Summary'}
        </button>

        {summary && (
          <div className="mt-6 p-4 border rounded-md bg-gray-700 text-white">
            <h2 className="text-xl font-semibold mb-2 text-indigo-400">Personalized Summary:</h2>
            <p className="text-gray-300">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}