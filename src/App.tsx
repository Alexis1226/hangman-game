import styled from "@emotion/styled";
import { upper } from "./assets/alphabet";
import { SyntheticEvent, useEffect, useState } from "react";
import { generate } from "random-words";

function App() {
  const [word, setWord] = useState("");
  const [words, setWords] = useState<string[]>([]);
  const [forbiddenWord, setForbiddenWord] = useState<
    string[]
  >([]);
  const [missedAlphabets, setMissedAlphabets] = useState<
    string[]
  >([]);

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
          alert("실패!");
          window.location.reload();
        }, 500);

        break;
      default:
    }
  }, [missedAlphabets]);

  const resetGame = () => {
    setWords(() => []);
    setWord("");
    setMissedAlphabets([]);
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
    setForbiddenWord(
      (e.target as HTMLButtonElement).innerText
        .split("")
        .map(() => " _ ")
    );
    setWord((e.target as HTMLButtonElement).innerText);
  };

  const checkAlphabet = (e: SyntheticEvent) => {
    let clickedAlphabet: string | null = (
      e.target as HTMLButtonElement
    ).innerText;

    const checkedWord = word.split("").map((a, i) => {
      if (a.toUpperCase() === clickedAlphabet) {
        // 클릭한 단어가 맞을 경우
        return a;
      } else {
        // 클릭한 단어가 다를 경우
        return forbiddenWord[i] === " _ "
          ? " _ "
          : forbiddenWord[i];
      }
    });

    if (
      checkedWord
        .join("")
        .toUpperCase()
        .indexOf(clickedAlphabet) > -1
    )
      clickedAlphabet = null;

    setForbiddenWord(checkedWord);

    if (clickedAlphabet !== null)
      setMissedAlphabets((prev) => [
        ...new Set([...prev, clickedAlphabet as string]),
      ]);

    if (!!word && checkedWord.join("") === word)
      setTimeout(() => {
        alert("정답입니다");
      }, 500);
  };

  return (
    <FlexDiv>
      <GraphicPanel>
        <button onClick={generateWords}>
          {words.length > 0 || word ? "restart" : "start"}
        </button>

        <DrawingDiv>
          <svg
            height="250"
            width="200"
            className="figure-container"
          >
            {/* Gallow */}
            {!!gallow && (
              <>
                <line
                  x1="60"
                  y1="20"
                  x2="140"
                  y2="20"
                  className="show"
                />

                <line
                  x1="60"
                  y1="20"
                  x2="60"
                  y2="230"
                  className="show"
                />
                <line
                  x1="20"
                  y1="230"
                  x2="100"
                  y2="230"
                  className="show"
                />
              </>
            )}
            {/* Rod */}
            {!!rod && (
              <line
                x1="140"
                y1="20"
                x2="140"
                y2="50"
                className="show"
              />
            )}

            {/*  Head  */}
            {!!head && (
              <circle
                cx="140"
                cy="70"
                r="20"
                className="show"
              />
            )}
            {/*  Body  */}
            {!!body && (
              <line
                x1="140"
                y1="90"
                x2="140"
                y2="150"
                className="show"
              />
            )}
            {/*  Arms  */}
            {!!arms && (
              <>
                <line
                  x1="140"
                  y1="120"
                  x2="120"
                  y2="100"
                  className="show"
                />
                <line
                  x1="140"
                  y1="120"
                  x2="160"
                  y2="100"
                  className="show"
                />
              </>
            )}
            {/* hands */}
            {!!hands && (
              <>
                <line
                  x1="120"
                  y1="100"
                  x2="110"
                  y2="110"
                  className="show"
                />
                <line
                  x1="160"
                  y1="100"
                  x2="170"
                  y2="110"
                  className="show"
                />
              </>
            )}

            {/* Legs */}
            {!!legs && (
              <>
                <line
                  x1="140"
                  y1="150"
                  x2="120"
                  y2="180"
                  className="show"
                />
                <line
                  x1="140"
                  y1="150"
                  x2="160"
                  y2="180"
                  className="show"
                />
              </>
            )}
            {/* foot */}
            {!!foot && (
              <>
                <line
                  x1="120"
                  y1="180"
                  x2="110"
                  y2="170"
                  className="show"
                />
                <line
                  x1="160"
                  y1="180"
                  x2="170"
                  y2="170"
                  className="show"
                />
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
                    <button
                      key={index}
                      onClick={(e) => selectWord(e)}
                    >
                      {words}
                    </button>
                  ))}
                </SelectDiv>
              )}
          {word && (
            <p className="missNotice">
              miss : {missedAlphabets.length}
            </p>
          )}
        </BelowDiv>
      </GraphicPanel>
      <AlphabetPanel>
        {word &&
          upper.map((one, i) => (
            <AlphabetButton
              onClick={(e) => checkAlphabet(e)}
              disabled={
                missedAlphabets.filter((a) => a === one)
                  .length > 0
              }
              key={i}
            >
              {one}
            </AlphabetButton>
          ))}
      </AlphabetPanel>
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

const AlphabetPanel = styled.section`
  width: 40%;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(10, 1fr);
`;

const AlphabetButton = styled.button`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  font-size: 1.5rem;
  margin: 0;
  border-radius: 0;
  text-transform: none;

  &:disabled {
    cursor: default;
    color: red;
  }
`;

export default App;
