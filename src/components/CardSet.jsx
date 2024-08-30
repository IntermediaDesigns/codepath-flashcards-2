// src/components/CardSet.jsx
import React from 'react';

const CardSet = ({ set, totalCards, onChangeSet }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">{set.title}</h2>
      <p className="text-gray-600 mb-2">{set.description}</p>
      <p className="text-sm text-gray-500">Total cards: {totalCards}</p>
      <div className="mt-2">
        <span className="text-sm font-semibold mr-2">Difficulty:</span>
        <span className={`px-2 py-1 rounded text-sm ${
          set.difficulty === 'Beginner' ? 'bg-green-200 text-green-800' :
          set.difficulty === 'Intermediate' ? 'bg-yellow-200 text-yellow-800' :
          'bg-red-200 text-red-800'
        }`}>
          {set.difficulty}
        </span>
      </div>
    </div>
  );
};

export default CardSet;