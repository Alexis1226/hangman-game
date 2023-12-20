import styled from '@emotion/styled';
import { useWordStore } from './zustand/word';
import GraphicSection from './components/graphic';
import AlphabetSection from './components/Alphabet';

function App() {
  const word = useWordStore((state) => state.word);

  return (
    <FlexDiv>
      <GraphicSection word={word} />
      <AlphabetSection word={word} />
    </FlexDiv>
  );
}

const FlexDiv = styled.div`
  display: flex;
  color: black;
  box-sizing: border-box;
`;

export default App;
