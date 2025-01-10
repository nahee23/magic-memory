import React from "react";
import "./SingleCard.css";

// 원래는 props.card 해야하는데 바로 props 안에 있는 card를 가져옴
const SingleCard = ({ card, handleChoice, flipped, disable }) => {
  const handleClick = () => {
    if (!disable) {
      handleChoice(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card-front" />
        <img
          onClick={handleClick}
          className="back"
          src="/img/cover.png"
          alt="card-back"
        />
      </div>
    </div>
  );
};

export default SingleCard;
