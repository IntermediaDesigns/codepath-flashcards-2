// src/App.jsx
import React, { useState } from 'react';
import SelectionForm from './components/SelectionForm';
import CardSet from './components/CardSet';
import Card from './components/Card';
import { cardSets } from './data/cardSets';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userPerformance, setUserPerformance] = useState({});

  const filteredCardSets = cardSets.filter(
    set => set.category === selectedCategory && set.difficulty === selectedDifficulty
  );

  const currentSet = filteredCardSets[currentSetIndex];

  const handleSelection = (category, difficulty) => {
    setSelectedCategory(category);
    setSelectedDifficulty(difficulty);
    setCurrentSetIndex(0);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setUserPerformance({});
    setAiSuggestion('');
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prevIndex) =>
      (prevIndex + 1) % currentSet.cards.length
    );
  };

  const recordPerformance = (correct) => {
    setUserPerformance(prev => ({
      ...prev,
      [currentSet.title]: {
        ...prev[currentSet.title],
        [currentSet.cards[currentCardIndex].question]: correct
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Flashcard App</h1>
        
        {!selectedCategory || !selectedDifficulty ? (
          <SelectionForm onSubmit={handleSelection} />
        ) : currentSet ? (
          <>
            <CardSet
              set={currentSet}
              totalCards={currentSet.cards.length}
            />
            <Card
              card={currentSet.cards[currentCardIndex]}
              isFlipped={isFlipped}
              onFlip={flipCard}
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => {
                  recordPerformance(false);
                  nextCard();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Incorrect
              </button>
              <button
                onClick={() => {
                  recordPerformance(true);
                  nextCard();
                }}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Correct
              </button>
            </div>
            
          </>
        ) : (
          <p className="text-center">No flashcards available for the selected category and difficulty.</p>
        )}
      </div>
    </div>
  );
};

export default App;