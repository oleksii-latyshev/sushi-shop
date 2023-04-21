import { Route, Routes } from 'react-router-dom';

import MainLayout from './layouts/MainLayout/MainLayout';
import { Cart, Home, NotFound, Sushi } from './pages';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='cart' element={<Cart />} />
        <Route path='sushi/:id' element={<Sushi />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
