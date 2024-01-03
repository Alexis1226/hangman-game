import styled from '@emotion/styled';
import { SyntheticEvent } from 'react';
import { upper } from '../assets/alphabet';
import { useWordStore } from '../zustand/word';

function AlphabetSection({ word }: { word: string }) {
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

export default AlphabetSection;

const AlphabetPanel = styled.section`
  width: 100%;
  height: 40%;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(20px, 40px));
  place-content: center;
  padding: 24px;

  @media screen and (orientation: landscape) {
    width: 30%;
    height: 100%;
  }
`;

const AlphabetButton = styled.button`
  width: 100%;
  aspect-ratio: 1;
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
