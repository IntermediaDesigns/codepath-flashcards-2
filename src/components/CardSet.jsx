// src/components/CardSet.jsx
import PropTypes from "prop-types";

const CardSet = ({ set, totalCards, currentCardNumber }) => {
  return (
    <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{set.title}</h2>
        <p className="text-gray-800 mb-2">{set.description}</p>
        <p className="text-sm text-gray-800">
          Total cards: {currentCardNumber} of {totalCards}
        </p>
        <div className="mt-2">
          <span className="text-sm font-semibold mr-2">Difficulty:</span>
          <span
            className={`px-2 py-1 rounded text-sm ${
              set.difficulty === "Beginner"
                ? "bg-green-300 text-green-800"
                : set.difficulty === "Intermediate"
                ? "bg-yellow-200 text-yellow-800"
                : "bg-red-500 text-white"
            }`}
          >
            {set.difficulty}
          </span>
        </div>
    </div>
  );
};

CardSet.propTypes = {
  set: PropTypes.object.isRequired,
  totalCards: PropTypes.number.isRequired,
  currentCardNumber: PropTypes.number.isRequired,
};

export default CardSet;
