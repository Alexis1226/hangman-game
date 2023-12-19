export interface WordState {
  word: string;
  forbiddenWord: string[];
  missedAlphabets: string[];
  updateWord: (word: string) => void;
  updateForbiddenWord: (word: string[]) => void;
  addMissedAlphabet: (missedAlphabet: string) => void;
  resetWordStore: () => void;
}
