import styled from '@emotion/styled';
import { SyntheticEvent } from 'react';
import { upper } from '../assets/alphabet';
import { useWordStore } from '../zustand/word';

function AlphabetComponents({ word }: { word: string }) {
  const forbiddenWord = useWordStore((state) => state.forbiddenWord);
  const updateForbiddenWord = useWordStore((state) => state.updateForbiddenWord);
  const missedAlphabets = useWordStore((state) => state.missedAlphabets);
  const addMissedAlphabet = useWordStore((state) => state.addMissedAlphabet);

  const checkAlphabet = (e: SyntheticEvent) => {
    let clickedAlphabet: string | null = (e.target as HTMLButtonElement).innerText;

    const checkedWord = word.split('').map((a, i) => {
      if (a.toUpperCase() === clickedAlphabet) {
        // 클릭한 단어가 맞을 경우
        return a;
      } else {
        // 클릭한 단어가 다를 경우
        return forbiddenWord[i] === ' _ ' ? ' _ ' : forbiddenWord[i];
      }
    });

    if (checkedWord.join('').toUpperCase().indexOf(clickedAlphabet) > -1) clickedAlphabet = null;

    updateForbiddenWord(checkedWord);

    if (clickedAlphabet !== null) addMissedAlphabet(clickedAlphabet);

    if (!!word && checkedWord.join('') === word)
      setTimeout(() => {
        alert('정답입니다');
      }, 500);
  };

  return (
    <AlphabetPanel>
      {word &&
        upper.map((one, i) => (
          <AlphabetButton
            onClick={(e) => checkAlphabet(e)}
            disabled={missedAlphabets.filter((a) => a === one).length > 0}
            key={i}
          >
            {one}
          </AlphabetButton>
        ))}
    </AlphabetPanel>
  );
}

export default AlphabetComponents;

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
