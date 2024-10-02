import { useState, useEffect } from "react";
import Card from "./components/Card";
import { cardSets } from "./data/cardSets";

const categories = ["HTML", "CSS", "JavaScript", "React"];

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const difficultyColors = {
    Beginner: "bg-green-500 p-2 rounded-md text-white",
    Intermediate: "bg-yellow-500 p-2 rounded-md text-white",
    Advanced: "bg-red-500 p-2 rounded-md text-white",
  };

  const resetSelection = () => {
    setSelectedCategory(null);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setUserAnswer("");
    setIsCorrect(null);
    setShuffledCards([]);
    setStreak(0);
  };

  useEffect(() => {
    if (selectedCategory) {
      const allCardsInCategory = cardSets
        .filter((set) => set.category === selectedCategory)
        .flatMap((set) => set.cards);
      setShuffledCards(shuffleArray([...allCardsInCategory]));
    }
  }, [selectedCategory]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffleCards = () => {
    setShuffledCards(shuffleArray([...shuffledCards]));
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setUserAnswer("");
    setIsCorrect(null);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    if (shuffledCards.length > 0) {
      setIsFlipped(false);
      setCurrentCardIndex(
        (prevIndex) => (prevIndex + 1) % shuffledCards.length
      );
      setUserAnswer("");
      setIsCorrect(null);
    }
  };

  const previousCard = () => {
    if (shuffledCards.length > 0) {
      setIsFlipped(false);
      setCurrentCardIndex(
        (prevIndex) =>
          (prevIndex - 1 + shuffledCards.length) % shuffledCards.length
      );
      setUserAnswer("");
      setIsCorrect(null);
    }
  };

  const handleSubmit = () => {
    if (shuffledCards.length > 0) {
      const currentCard = shuffledCards[currentCardIndex];
      const isAnswerCorrect =
        userAnswer.toLowerCase().trim() ===
        currentCard.answer.toLowerCase().trim();
      setIsCorrect(isAnswerCorrect);
      setIsFlipped(true);

      if (isAnswerCorrect) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        setLongestStreak(Math.max(longestStreak, newStreak));
      } else {
        setStreak(0);
      }
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

  const renderFlashcards = () => {
    if (!shuffledCards || shuffledCards.length === 0) {
      return (
        <div className="text-center space-y-4">
          <p className="text-xl font-semibold text-gray-700">
            No flashcards available for this category.
          </p>
        </div>
      );
    }

    const currentCard = shuffledCards[currentCardIndex];

    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">
            Category:{" "}
            <span className="text-purple-900">{selectedCategory}</span>
          </div>
          <div className="text-lg font-semibold">
            Difficulty:{" "}
            <span
              className={`font-normal ${
                difficultyColors[currentCard.difficulty]
              }`}
            >
              {currentCard.difficulty}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">
            Streak: <span className="text-purple-900">{streak}</span>
          </div>
          <div className="text-lg font-semibold">
            Longest Streak:{" "}
            <span className="text-pink-500">{longestStreak}</span>
          </div>
        </div>
        <Card card={currentCard} isFlipped={isFlipped} onFlip={flipCard} />
        <div className="space-y-4">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSubmit}
            className="w-full px-6 py-3 bg-purple-900 text-white font-semibold rounded-lg shadow-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-colors duration-200"
          >
            Submit Answer
          </button>
          {isCorrect !== null && (
            <div
              className={`text-center font-semibold ${
                isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {isCorrect ? "Correct!" : "Incorrect. Try again!"}
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={previousCard}
            className="px-6 py-3 bg-purple-900 text-white font-semibold rounded-lg shadow-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
          >
            Previous Card
          </button>
          <button
            onClick={shuffleCards}
            className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
          >
            Shuffle Cards
          </button>
          <button
            onClick={nextCard}
            className="px-6 py-3 bg-purple-900 text-white font-semibold rounded-lg shadow-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
          >
            Next Card
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-8">
        <h1 className="text-5xl font-bold mb-4 text-center text-black">
          Flash Tech Tutor
        </h1>
        {selectedCategory && (
          <div className="mb-8 flex justify-center">
            <button
              onClick={resetSelection}
              className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors duration-200"
            >
              Back to Categories
            </button>
          </div>
        )}
        {!selectedCategory && renderCategoryButtons()}
        {selectedCategory && renderFlashcards()}
      </div>
    </div>
  );
};

export default App;
