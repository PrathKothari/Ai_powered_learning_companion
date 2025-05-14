import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Flashcard = ({ front, back }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="w-64 h-40 bg-white rounded-lg shadow-lg cursor-pointer flex items-center justify-center text-center p-4 select-none"
      onClick={() => setFlipped(!flipped)}
      animate={{ rotateY: flipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
    >
      <div
        className="absolute w-full h-full flex items-center justify-center backface-hidden"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        <p className="text-lg font-semibold text-indigo-700">{flipped ? back : front}</p>
      </div>
    </motion.div>
  );
};

export default Flashcard;

