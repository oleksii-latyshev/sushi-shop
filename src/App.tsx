import { useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import styles from './App.module.scss';
import Header from './layouts/Header/Header';
import { Cart, Home, NotFound, Sushi } from './pages';
import { SearchContext } from './store/context';

const App = () => {
  const [searchValue, setSearchValue] = useState('');

  const contextValue = useMemo(() => ({ searchValue, setSearchValue }), [searchValue]);

  return (
    <div className={styles.wrapper}>
      <SearchContext.Provider value={contextValue}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='cart' element={<Cart />} />
          <Route path='sushi/:id' element={<Sushi />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </SearchContext.Provider>
    </div>
  );
};

export default App;
