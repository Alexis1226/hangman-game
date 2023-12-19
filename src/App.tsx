import styled from '@emotion/styled';
import { SyntheticEvent, useEffect, useState } from 'react';
import { generate } from 'random-words';
import AlphabetComponents from './components/Alphabet';
import { useWordStore } from './zustand/word';

function App() {
  const [words, setWords] = useState<string[]>([]); // 초기에 선택할 수 있는 단어들
  const word = useWordStore((state) => state.word);
  const forbiddenWord = useWordStore((state) => state.forbiddenWord);
  const missedAlphabets = useWordStore((state) => state.missedAlphabets);
  const updateWord = useWordStore((state) => state.updateWord);
  const updateForbiddenWord = useWordStore((state) => state.updateForbiddenWord);
  const resetWordStore = useWordStore((state) => state.resetWordStore);

  const [gallow, setGallow] = useState(false);
  const [rod, setRod] = useState(false);
  const [head, setHead] = useState(false);
  const [body, setBody] = useState(false);
  const [arms, setArms] = useState(false);
  const [hands, setHands] = useState(false);
  const [legs, setLegs] = useState(false);
  const [foot, setFoot] = useState(false);

  useEffect(() => {
    switch (missedAlphabets.length) {
      case 1:
        setGallow(true);
        break;
      case 2:
        setRod(true);
        break;
      case 3:
        setHead(true);
        break;
      case 4:
        setArms(true);
        break;
      case 5:
        setHands(true);
        break;
      case 6:
        setBody(true);
        break;
      case 7:
        setLegs(true);
        break;
      case 8:
        setFoot(true);
        setTimeout(() => {
          alert('실패!');
          window.location.reload();
        }, 500);

        break;
      default:
    }
  }, [missedAlphabets]);

  const resetGame = () => {
    resetWordStore();
    setWords([]);
    setGallow(false);
    setRod(false);
    setHead(false);
    setBody(false);
    setArms(false);
    setHands(false);
    setLegs(false);
    setFoot(false);
  };

  const generateWords = () => {
    resetGame();
    const generated = generate({
      exactly: 3,
      minLength: 3,
      maxLength: 10,
    });
    setWords(generated);
  };

  const selectWord = (e: SyntheticEvent) => {
    updateForbiddenWord((e.target as HTMLButtonElement).innerText.split('').map(() => ' _ '));
    updateWord((e.target as HTMLButtonElement).innerText);
    console.log('forbiddenWord', forbiddenWord);
  };

  return (
    <FlexDiv>
      <GraphicPanel>
        <button onClick={generateWords}>{words.length > 0 || word ? 'restart' : 'start'}</button>

        <DrawingDiv>
          <svg height="250" width="200" className="figure-container">
            {/* Gallow */}
            {!!gallow && (
              <>
                <line x1="60" y1="20" x2="140" y2="20" className="show" />

                <line x1="60" y1="20" x2="60" y2="230" className="show" />
                <line x1="20" y1="230" x2="100" y2="230" className="show" />
              </>
            )}
            {/* Rod */}
            {!!rod && <line x1="140" y1="20" x2="140" y2="50" className="show" />}

            {/*  Head  */}
            {!!head && <circle cx="140" cy="70" r="20" className="show" />}
            {/*  Body  */}
            {!!body && <line x1="140" y1="90" x2="140" y2="150" className="show" />}
            {/*  Arms  */}
            {!!arms && (
              <>
                <line x1="140" y1="120" x2="120" y2="100" className="show" />
                <line x1="140" y1="120" x2="160" y2="100" className="show" />
              </>
            )}
            {/* hands */}
            {!!hands && (
              <>
                <line x1="120" y1="100" x2="110" y2="110" className="show" />
                <line x1="160" y1="100" x2="170" y2="110" className="show" />
              </>
            )}

            {/* Legs */}
            {!!legs && (
              <>
                <line x1="140" y1="150" x2="120" y2="180" className="show" />
                <line x1="140" y1="150" x2="160" y2="180" className="show" />
              </>
            )}
            {/* foot */}
            {!!foot && (
              <>
                <line x1="120" y1="180" x2="110" y2="170" className="show" />
                <line x1="160" y1="180" x2="170" y2="170" className="show" />
              </>
            )}
          </svg>
        </DrawingDiv>
        <BelowDiv>
          {word
            ? forbiddenWord
            : words.length > 0 && (
                <SelectDiv>
                  Pick one!
                  {words?.map((words, index) => (
                    <button key={index} onClick={(e) => selectWord(e)}>
                      {words}
                    </button>
                  ))}
                </SelectDiv>
              )}
          {word && <p className="missNotice">miss : {missedAlphabets.length}</p>}
        </BelowDiv>
      </GraphicPanel>
      <AlphabetComponents word={word} />
    </FlexDiv>
  );
}

const FlexDiv = styled.div`
  display: flex;
  color: black;
  box-sizing: border-box;
`;

const GraphicPanel = styled.section`
  width: 60%;
`;

const DrawingDiv = styled.div`
  padding: 20px 30px;
  margin: auto 0;
  height: fit-content;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .figure-container {
    fill: transparent;
    stroke: black;
    stroke-width: 4px;
    stroke-linecap: round;
  }

  .gallow,
  .rod,
  .head,
  .body,
  .arms,
  .hands,
  .legs,
  .foot {
    display: none;
  }

  .show {
    display: block;
  }
`;

const BelowDiv = styled.div`
  display: flex;
  font-size: 2rem;
  justify-content: center;
  align-items: center;

  .missNotice {
    margin-left: 20%;
    margin-right: 10%;
  }
`;

const SelectDiv = styled.div`
  display: flex;
  flex-direction: column;

  button {
    margin: 16px 0;
  }
`;

export default App;
