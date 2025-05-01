import React from 'react';
import { motion } from 'framer-motion';

const PB = ({ percentage }) => {
  return (
    <div style={{ width: '100%', backgroundColor: '#e0e0e0' }}>
      <motion.div
        style={{
          height: '20px',
          backgroundColor: '#76c7c0',
        }}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1 }}
      ></motion.div>
    </div>
  );
};

export default PB;