import { createContext } from 'react';

const initialValue = {
  sushi: [],
  currentCategory: 0,
  currentSort: 0,
};

export const context = createContext(initialValue);
