// src/App.jsx
import { useState } from "react";
import CardSet from "./components/CardSet";
import Card from "./components/Card";
import { cardSets } from "./data/cardSets";
import "./index.css";


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
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );

  const renderDifficultyButtons = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Select Difficulty:</h2>
      <div className="grid grid-cols-3 gap-4">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty}
            onClick={() => setSelectedDifficulty(difficulty)}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors duration-200"
          >
            {difficulty}
          </button>
        ))}
      </div>
      <button
            onClick={resetSelection}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
          >
            Back to Categories
          </button>
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
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
          >
            Back to Categories
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
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
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
          >
            Next Card
          </button>
          <button
            onClick={resetSelection}
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors duration-200"
          >
            Back to Categories
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Flashcard App</h1>
        {!selectedCategory && renderCategoryButtons()}
        {selectedCategory && !selectedDifficulty && renderDifficultyButtons()}
        {selectedCategory && selectedDifficulty && renderFlashcards()}
      </div>
    </div>
  );
};

export default App;