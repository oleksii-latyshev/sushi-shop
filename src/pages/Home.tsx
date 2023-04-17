import { useState } from 'react';

import Catalog from '../layouts/Catalog/Catalog';
import Options from '../layouts/Options/Options';
import type { ICategory, ISort, Sushi } from '../types';

const Home = () => {
  const [sushi, setSushi] = useState<Sushi[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
      <Options categories={categories} setCategories={setCategories} />
      <Catalog
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sushi={sushi}
        setSushi={setSushi}
      />
    </>
  );
};

export default Home;
