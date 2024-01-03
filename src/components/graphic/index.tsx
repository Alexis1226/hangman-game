import styled from '@emotion/styled';
import { useEffect, useReducer } from 'react';
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
import { ApiRes, WordObj } from '../../types';
import gsap from 'gsap';

const initialState = {
  gallow: false,
  rod: false,
  head: false,
  body: false,
  arms: false,
  hands: false,
  legs: false,
  foot: false,
};

const reducer = (state: { [key: string]: boolean }, action: { numberOfMiss: number }) => {
  switch (action.numberOfMiss) {
    case 0:
      return initialState;
    case 1:
      return { ...state, gallow: true };
      break;
    case 2:
      return { ...state, rod: true };
      break;
    case 3:
      return { ...state, head: true };
      break;
    case 4:
      return { ...state, arms: true };
      break;
    case 5:
      return { ...state, hands: true };
      break;
    case 6:
      return { ...state, body: true };
      break;
    case 7:
      return { ...state, legs: true };
      break;
    case 8:
      return { ...state, foot: true };
    default:
      return state;
  }
};

const GraphicSection = ({
  word,
  words,
  setWords,
}: {
  word: string;
  words: string[];
  setWords: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { gallow, rod, head, body, arms, hands, legs, foot } = state;

  // Zustand
  const forbiddenWord = useWordStore((state) => state.forbiddenWord);
  const missedAlphabets = useWordStore((state) => state.missedAlphabets);
  const resetWordStore = useWordStore((state) => state.resetWordStore);

  /**
   * game 초기화하는 함수
   */
  const resetGame = () => {
    resetWordStore();
    setWords([]);
    dispatch({ numberOfMiss: 0 });
  };

  /**
   * 단어 생성하는 API 호출
   * @returns WordObj[]
   */
  const generateWords = async (): Promise<WordObj[]> => {
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
    const words = (await generateWords()).map((item: WordObj) => item.vocabulary);
    setWords(words);
  };

  useEffect(() => {
    getWords();
  }, []);

  useEffect(() => {
    dispatch({ numberOfMiss: missedAlphabets.length });
    if (missedAlphabets.length === 8) {
      setTimeout(() => {
        gsap.to('.rod', { attr: { y2: '+=70' }, duration: 1.5, ease: 'bounce.out' });
        gsap.to('.man', { y: 70, duration: 1.5, ease: 'bounce.out' });
      }, 100);
      setTimeout(() => {
        alert('실패!');
        window.location.reload();
      }, 1800);
    }
  }, [missedAlphabets]);

  return (
    <GraphicPanel>
      <StartButton onClick={getWords}>{words.length > 0 || word ? 'restart' : 'start'}</StartButton>
      <DrawingDiv>
        <svg height="260" width="200" className="figure-container">
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
        {forbiddenWord && forbiddenWord}
        {word && <p className="missNotice">miss : {missedAlphabets.length}</p>}
      </BelowDiv>
    </GraphicPanel>
  );
};

export default GraphicSection;

const GraphicPanel = styled.section`
  width: 100%;
  height: 60%;

  @media screen and (orientation: landscape) {
    width: 60%;
    height: 100%;
  }
`;

const DrawingDiv = styled.div`
  padding: 20px 30px;
  margin: auto 0;
  height: fit-content;
  width: 100%;
  height: 60%;
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

const StartButton = styled.button`
  font-size: 24px;
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
