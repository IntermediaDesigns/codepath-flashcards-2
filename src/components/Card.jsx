// src/components/Card.jsx
import PropTypes from "prop-types";

const Card = ({ card, isFlipped, onFlip }) => {
  return (
    <div
      className="bg-white border rounded-lg shadow-lg p-6 h-64 w-11/12 mx-auto cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
      onClick={onFlip}
    >
      <div className="flex flex-col items-center justify-start h-full">
        {card.image && (
          <img
            src={card.image}
            alt={isFlipped ? card.answer : card.question}
            className="w-20 h-auto object-contain mb-7" // Updated classes for 50px size
          />
        )}
        <p className="text-3xl font-semibold text-center">
          {isFlipped ? card.answer : card.question}
        </p>
      </div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  isFlipped: PropTypes.bool.isRequired,
  onFlip: PropTypes.func.isRequired,
};

export default Card;