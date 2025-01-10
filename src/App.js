import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  //카드 이미지 (public 폴더에 있음)
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

//리액트 컴포넌트
function App() {
  //useState를 사용하여 카드 상태를 관리
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0); //턴 수
  const [choiceOne, setChoiceOne] = useState(null); //첫 번째 선택한 카드
  const [choiceTwo, setChoiceTwo] = useState(null); //두 번째 선택한 카드
  const [disable, setDisable] = useState(false); //카드 선택 비활성화
  //새 게임 시작(카드 섞기)
  const shuffleCards = () => {
    // ... 은 카드 배열의 모든 요소를 새 배열에 복사 (총 2번 12개 카드)
    const shuffleCards = [...cardImages, ...cardImages]
      // 배열의 순서를 무작위로 바꿈
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffleCards);
    setTurns(0);
  };
  //console.log(cards, turns); //카드 섞기 확인

  function handleChoice(card) {
    //카드 선택 (이미 첫번째 선택했으면 두번째에 저장)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  //카드 선택 후 비교하기 (두 카드가 같은지 확인), [카드선택이 변경시]
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisable(true);
      if (choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
        //값을 바로 넣거나 화살표 함수 사용
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }; //새로운 배열 생성하고 matched 속성을 true로 변경 (업데이트)
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  //처음 시작시 한번 실행
  useEffect(() => shuffleCards(), []); //처음 렌더링 될 때 카드 섞기
  //선택한 카드들 리셋
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(turns + 1); //턴 수 증가
    setDisable(false);
  };

  // 모든 카드가 matched 상태인지 확인하여 완료 알림 띄우기 및 게임 리셋
  useEffect(() => {
    if (cards.every((card) => card.matched)) {
      alert("게임 클리어! 턴수: " + turns);
      shuffleCards(); // 알림 후 새 게임 시작
    }
  }, [cards]);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            handleChoice={handleChoice}
            key={card.id}
            card={card}
            disable={disable}
          />
        ))}
      </div>
      <p>턴수: {turns}</p>
    </div>
  );
}

export default App;
