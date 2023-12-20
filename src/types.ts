export interface WordState {
  word: string;
  forbiddenWord: string[];
  missedAlphabets: string[];
  updateWord: (word: string) => void;
  updateForbiddenWord: (word: string[]) => void;
  addMissedAlphabet: (missedAlphabet: string) => void;
  resetWordStore: () => void;
}

export type wordObj = {
  vocabulary: string;
  mean: string;
  level: string;
  lastUpdateDatetime: string;
  lastUpdateUserNickName: string;
};

export type ApiRes = {
  words: wordObj[];
};
