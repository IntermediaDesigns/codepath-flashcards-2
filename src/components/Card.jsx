// src/components/Card.jsx
import React from 'react';

const Card = ({ card, isFlipped, onFlip }) => {
  return (
    <div
      className="bg-white border rounded-lg shadow-md p-6 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
      style={{ height: '200px', width: '300px' }}
      onClick={onFlip}
    >
      <div className="flex items-center justify-center h-full">
        {card.image && (
          <img
            src={card.image}
            alt={isFlipped ? card.answer : card.question}
            className="max-h-full max-w-full object-contain mb-2"
          />
        )}
        <p className="text-xl font-semibold text-center">
          {isFlipped ? card.answer : card.question}
        </p>
      </div>
    </div>
  );
};

export default Card;