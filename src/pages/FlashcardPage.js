// src/pages/FlashcardPage.js

import React from 'react';
import Flashcard from '../components/Flashcard';
import { Link } from 'react-router-dom';
import DarkModeToggle from '../components/DarkModeToggle';

const sampleFlashcards = [
  { front: 'What is ADHD?', back: 'A condition affecting focus and behavior.' },
  { front: 'Pomodoro Technique?', back: '25 min focus + 5 min break cycles.' },
  { front: 'One benefit of flashcards?', back: 'Enhance memory through repetition.' }
];

const FlashcardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-yellow-700">Flashcards</h1>
        <DarkModeToggle />
      </header>

      {/* Flashcard Grid */}
      <main className="px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {sampleFlashcards.map((card, index) => (
          <Flashcard key={index} front={card.front} back={card.back} />
        ))}
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

export default FlashcardPage;
