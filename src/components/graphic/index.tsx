import styled from '@emotion/styled';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useWordStore } from '../../zustand/word';
import Gallow from './gallow';
import Rod from './rod';
import Head from './head';
import Body from './body';
import Arms from './arms';
import Hands from './hands';
import Legs from './legs';
import Foot from './foot';
import axios from 'axios';
import { ApiRes, wordObj } from '../../types';

const GraphicSection = ({ word }: { word: string }) => {
  const [words, setWords] = useState<string[]>([]); // 초기에 선택할 수 있는 단어들

  const [gallow, setGallow] = useState(false);
  const [rod, setRod] = useState(false);
  const [head, setHead] = useState(false);
  const [body, setBody] = useState(false);
  const [arms, setArms] = useState(false);
  const [hands, setHands] = useState(false);
  const [legs, setLegs] = useState(false);
  const [foot, setFoot] = useState(false);

  // Zustand
  const forbiddenWord = useWordStore((state) => state.forbiddenWord);
  const missedAlphabets = useWordStore((state) => state.missedAlphabets);
  const updateWord = useWordStore((state) => state.updateWord);
  const updateForbiddenWord = useWordStore((state) => state.updateForbiddenWord);
  const resetWordStore = useWordStore((state) => state.resetWordStore);

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

  /**
   * 단어 생성하는 API 호출
   * @returns wordObj[]
   */
  const generateWords = async (): Promise<wordObj[]> => {
    const { data } = await axios.get<ApiRes>(
      'http://openapi.webservicetoday.com/api/open-api/random/word/eng',
      {
        params: { count: 3 },
      }
    );
    return data.words;
  };

  /**
   * API에서 불러온 단어들 저장
   */
  const getWords = async () => {
    resetGame();
    const words = (await generateWords()).map((item: wordObj) => item.vocabulary);
    setWords(words);
  };

  const selectWord = (e: SyntheticEvent) => {
    updateForbiddenWord((e.target as HTMLButtonElement).innerText.split('').map(() => ' _ '));
    updateWord((e.target as HTMLButtonElement).innerText);
  };

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

  return (
    <GraphicPanel>
      <button onClick={getWords}>{words.length > 0 || word ? 'restart' : 'start'}</button>
      <DrawingDiv>
        <svg height="250" width="200" className="figure-container">
          {!!gallow && <Gallow />}
          {!!rod && <Rod />}
          {!!head && <Head />}
          {!!body && <Body />}
          {!!arms && <Arms />}
          {!!hands && <Hands />}
          {!!legs && <Legs />}
          {!!foot && <Foot />}
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
  );
};

export default GraphicSection;

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
