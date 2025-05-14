import React from 'react';

const Card = ({ title, children }) => (
  <div className="bg-indigo-50 rounded-xl shadow-md p-6">
    <h3 className="text-xl font-semibold mb-3 text-indigo-700">{title}</h3>
    {children}
  </div>
);

export default Card;
