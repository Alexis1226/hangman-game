import { create } from 'zustand';
import { WordState } from '../types';

const initialState = {
  word: '', // 사용자가 선택한 단어
  forbiddenWord: [], // 알파벳이 가려진 단어
  missedAlphabets: [], // 추측 실패한 알파펫
};

export const useWordStore = create<WordState>((set, get) => ({
  ...initialState,
  updateWord: (word) =>
    set({
      word: word,
    }),
  updateForbiddenWord: (forbiddenWord) => {
    set({
      forbiddenWord: forbiddenWord,
    });
  },
  addMissedAlphabet: (missedAlphabet) => {
    set((state) => ({
      missedAlphabets: [...state.missedAlphabets, missedAlphabet],
    }));
  },
  resetWordStore: () => {
    set(initialState);
  },
}));
