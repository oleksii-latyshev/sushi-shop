import { createContext } from 'react';

const initialValue = {
  sushi: [],
  currentCategory: 0,
  currentSort: 0,
};

export const context = createContext(initialValue);

interface SearchContextInstance {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextInstance>({
  searchValue: '',
  setSearchValue: () => {},
});
