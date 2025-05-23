'use client';

import { useEffect, useState } from 'react';
import Flashcard from '../../components/Flashcard';
import DarkModeToggle from '../../components/DarkModeToggle';
import { useRouter } from 'next/navigation';

const sampleFlashcards = [
  { front: 'What is ADHD?', back: 'A condition affecting focus and behavior.' },
  { front: 'Pomodoro Technique?', back: '25 min focus + 5 min break cycles.' },
  { front: 'One benefit of flashcards?', back: 'Enhance memory through repetition.' }
];

export default function FlashcardPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [flipAll, setFlipAll] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.replace('/login');
    }
  }, [router]);

  if (!isClient) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* Header */}
      
        <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Flashcards</h1>
        <DarkModeToggle />
        </header>

      {/* Flip All */}
      <div className="text-center mt-6">
        <button
          onClick={() => setFlipAll(prev => !prev)}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {flipAll ? 'Unflip All' : 'Flip All'}
        </button>
      </div>

      {/* Cards */}
      <main className="px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {sampleFlashcards.map((card, i) => (
          <Flashcard key={i} front={card.front} back={card.back} flip={flipAll} />
        ))}
      </main>

      {/* Footer */}
      <footer className="text-center py-6">
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          Back to Dashboard
        </button>
      </footer>
    </div>
  );
}
