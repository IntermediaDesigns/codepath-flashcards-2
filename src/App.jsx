// src/App.jsx
import React, { useState } from 'react';
import CardSet from './components/CardSet';
import Card from './components/Card';
import { cardSets } from './data/cardSets';

const categories = ['HTML', 'CSS', 'JavaScript', 'React'];
const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const resetSelection = () => {
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const filteredCardSet = cardSets.find(
    set => set.category === selectedCategory && set.difficulty === selectedDifficulty
  );

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prevIndex) =>
      (prevIndex + 1) % filteredCardSet.cards.length
    );
  };

  const renderCategoryButtons = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Select a Category:</h2>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );

  const renderDifficultyButtons = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Select Difficulty:</h2>
      <div className="grid grid-cols-3 gap-4">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty}
            onClick={() => setSelectedDifficulty(difficulty)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            {difficulty}
          </button>
        ))}
      </div>
    </div>
  );

  const renderFlashcards = () => (
    <div className="space-y-4">
      <CardSet
        set={filteredCardSet}
        totalCards={filteredCardSet.cards.length}
      />
      <Card
        card={filteredCardSet.cards[currentCardIndex]}
        isFlipped={isFlipped}
        onFlip={flipCard}
      />
      <div className="flex justify-between mt-4">
        <button
          onClick={nextCard}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Next Card
        </button>
        <button
          onClick={resetSelection}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Back to Categories
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Flashcard App</h1>
        
        {!selectedCategory && renderCategoryButtons()}
        {selectedCategory && !selectedDifficulty && renderDifficultyButtons()}
        {selectedCategory && selectedDifficulty && renderFlashcards()}
      </div>
    </div>
  );
};

export default App;