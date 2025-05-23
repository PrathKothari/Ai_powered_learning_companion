'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FlashcardProps {
  front: string;
  back: string;
  flip?: boolean;
}

const Flashcard: React.FC<FlashcardProps> = ({ front, back, flip = false }) => {
  const [flipped, setFlipped] = useState(flip);

  useEffect(() => {
    setFlipped(flip);
  }, [flip]);

  const handleClick = () => setFlipped((prev) => !prev);

  return (
    <motion.div
      onClick={handleClick}
      className="w-64 h-40 bg-white dark:bg-gray-700 rounded-lg shadow-lg cursor-pointer flex items-center justify-center text-center p-4 select-none"
      animate={{ rotateY: flipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
      style={{ perspective: 1000 }}
    >
      <div
        className="w-full h-full flex items-center justify-center text-lg font-semibold text-indigo-700 dark:text-yellow-300"
        style={{
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          backfaceVisibility: 'hidden'
        }}
      >
        {flipped ? back : front}
      </div>
    </motion.div>
  );
};

export default Flashcard;
