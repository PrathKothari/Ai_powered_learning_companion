import React, { useEffect } from 'react';
import './DarkMode.css'; // make sure this file exists and has your styles

const DarkModeToggle = () => {
  useEffect(() => {
    const toggle = document.getElementById('toggleDark');
    const body = document.querySelector('body');

    toggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
    });

    return () => {
      toggle.removeEventListener('click', () => {});
    };
  }, []);

  return (
    <button id="toggleDark" style={{ margin: '10px', padding: '10px' }}>
      Toggle Dark/Light Mode
    </button>
  );
};

export default DarkModeToggle;