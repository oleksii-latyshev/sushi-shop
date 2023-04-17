import { useState } from 'react';

import Catalog from '../layouts/Catalog/Catalog';
import Options from '../layouts/Options/Options';
import type { ICategory, Sushi } from '../types';

const Home = () => {
  const [sushi, setSushi] = useState<Sushi[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  return (
    <>
      <Options categories={categories} setCategories={setCategories} />
      <Catalog sushi={sushi} setSushi={setSushi} />
    </>
  );
};

export default Home;
