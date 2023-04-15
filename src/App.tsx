import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import styles from './App.module.scss';
import Header from './layouts/Header/Header';
import { Cart, Home, NotFound, Sushi } from './pages';

const App = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className={styles.wrapper}>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <Routes>
        <Route path='/' element={<Home searchValue={searchValue} />} />
        <Route path='cart' element={<Cart />} />
        <Route path='sushi/:id' element={<Sushi />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
