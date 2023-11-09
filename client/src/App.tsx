import '@/assets/styles/variables.css';

import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import LoadingBlock from '@/components/Loading/LoadingBlock';
import { useInitialization } from '@/hooks/useInitialization';
import MainLayout from '@/layouts/MainLayout';
import { Home } from '@/pages';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ '@/pages/Cart'));
const Wishlist = React.lazy(
  () => import(/* webpackChunkName: "Wishlist" */ '@/pages/Wishlist')
);
const Profile = React.lazy(() => import(/* webpackChunkName: "Profile" */ '@/pages/Profile'));
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ '@/pages/NotFound')
);
const Sushi = React.lazy(() => import(/* webpackChunkName: "Sushi" */ '@/pages/Sushi'));
const SignIn = React.lazy(() => import(/* webpackChunkName: "SignIn" */ '@/pages/SignIn'));
const SignUp = React.lazy(() => import(/* webpackChunkName: "SignUp" */ '@/pages/SignUp'));

const App = () => {
  useInitialization();

  return (
    <Suspense fallback={<LoadingBlock />}>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='cart' element={<Cart />} />
          <Route path='wishlist' element={<Wishlist />} />
          <Route path='profile' element={<Profile />} />
          <Route path='sushi/:id' element={<Sushi />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />
      </Routes>
    </Suspense>
  );
};

export default App;
