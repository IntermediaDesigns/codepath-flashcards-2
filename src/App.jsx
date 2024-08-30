// src/App.jsx
import { useState } from "react";
import CardSet from "./components/CardSet";
import Card from "./components/Card";
import { cardSets } from "./data/cardSets";

const categories = ["HTML", "CSS", "JavaScript", "React"];
const difficulties = ["Beginner", "Intermediate", "Advanced"];

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
    (set) =>
      set.category === selectedCategory && set.difficulty === selectedDifficulty
  );

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    if (filteredCardSet && filteredCardSet.cards.length > 0) {
      setIsFlipped(false);
      setCurrentCardIndex(
        (prevIndex) => (prevIndex + 1) % filteredCardSet.cards.length
      );
    }
  };

  const renderCategoryButtons = () => (
    <div className="space-y-6 flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800">Select a Category:</h2>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className="px-6 py-3 bg-purple-900 text-white font-semibold rounded-lg shadow-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );

  const renderDifficultyButtons = () => (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Select Difficulty:</h2>
        <div className="grid grid-cols-3 gap-4">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(difficulty)}
              className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-colors duration-200 hover:scale-105"
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={resetSelection}
          className="px-6 py-3 bg-purple-900 text-white font-semibold rounded-lg shadow-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
        >
          Back to Categories
        </button>
      </div>
    </div>
  );

  const renderFlashcards = () => {
    if (!filteredCardSet || filteredCardSet.cards.length === 0) {
      return (
        <div className="text-center space-y-4">
          <p className="text-xl font-semibold text-gray-700">
            No flashcards available for this category and difficulty.
          </p>
          <button
            onClick={resetSelection}
            className="px-6 py-3 bg-purple-900 text-white font-semibold rounded-lg shadow-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
          >
            Back to Categories
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <CardSet
          set={filteredCardSet}
          totalCards={filteredCardSet.cards.length}
        />
        <Card
          card={filteredCardSet.cards[currentCardIndex]}
          isFlipped={isFlipped}
          onFlip={flipCard}
        />
        <div className="flex justify-between mt-6">
          <button
            onClick={nextCard}
            className="px-6 py-3 bg-purple-900 text-white font-semibold rounded-lg shadow-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
          >
            Next Card
          </button>
          <button
            onClick={resetSelection}
            className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors duration-200"
          >
            Back to Categories
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-8">
        <h1 className="text-5xl font-bold mb-8 text-center text-black">
          Flash Tutor
        </h1>
        {!selectedCategory && renderCategoryButtons()}
        {selectedCategory && !selectedDifficulty && renderDifficultyButtons()}
        {selectedCategory && selectedDifficulty && renderFlashcards()}
      </div>
    </div>
  );
};

export default App;
