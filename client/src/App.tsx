import '@/assets/styles/variables.css';

import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout';

import { Home } from './pages';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ './pages/NotFound')
); // ? одновременно полезно и бесполезно
const Sushi = React.lazy(() => import(/* webpackChunkName: "Sushi" */ './pages/Sushi'));

const App = () => {
  return (
    <Suspense fallback={<div>загрузка</div>}>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='cart' element={<Cart />} />
          <Route path='sushi/:id' element={<Sushi />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
