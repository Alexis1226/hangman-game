import styled from '@emotion/styled';
import { useWordStore } from './zustand/word';
import GraphicSection from './components/graphic';
import AlphabetSection from './components/Alphabet';
import { SyntheticEvent, useState } from 'react';

function App() {
  const word = useWordStore((state) => state.word);
  const [words, setWords] = useState<string[]>([]); // 초기에 선택할 수 있는 단어들

  //zustand
  const updateWord = useWordStore((state) => state.updateWord);
  const updateForbiddenWord = useWordStore((state) => state.updateForbiddenWord);

  const selectWord = (e: SyntheticEvent) => {
    updateForbiddenWord((e.target as HTMLButtonElement).innerText.split('').map(() => ' _ '));
    updateWord((e.target as HTMLButtonElement).innerText);
  };

  return (
    <FlexDiv>
      <GraphicSection word={word} words={words} setWords={setWords} />
      {word ? null : (
        <SelectDiv>
          Pick one!
          {words?.map((words, index) => (
            <button key={index} onClick={(e) => selectWord(e)}>
              {words}
            </button>
          ))}
        </SelectDiv>
      )}
      <AlphabetSection word={word} />
    </FlexDiv>
  );
}

const FlexDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  color: black;
  box-sizing: border-box;
  padding: 8px;

  @media screen and (orientation: landscape) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  @media screen and (orientation: portrait) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const SelectDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  position: absolute;

  button {
    margin: 16px 0;
  }
`;

export default App;
