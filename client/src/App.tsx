import '@/assets/styles/variables.css';

import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useInitialization } from '@/hooks/useInitialization';
import MainLayout from '@/layouts/MainLayout';

import { Home } from './pages';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ './pages/NotFound')
); // ? одновременно полезно и бесполезно
const Sushi = React.lazy(() => import(/* webpackChunkName: "Sushi" */ './pages/Sushi'));
const SignIn = React.lazy(() => import(/* webpackChunkName: "SignIn" */ './pages/SignIn'));

const App = () => {
  useInitialization();

  return (
    <Suspense fallback={<div>загрузка</div>}>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='cart' element={<Cart />} />
          <Route path='sushi/:id' element={<Sushi />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='/signIn' element={<SignIn />} />
      </Routes>
    </Suspense>
  );
};

export default App;
