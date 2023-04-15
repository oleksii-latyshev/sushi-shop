import { useState } from 'react';

import type { SortOption } from '../components/Sort/Sort';
import Catalog from '../layouts/Catalog/Catalog';
import Options from '../layouts/Options/Options';
import type { ICategory, Sushi } from '../types';

export interface HomeProps {
  searchValue: string;
}

const Home = ({ searchValue }: HomeProps) => {
  const [activeCategory, setActiveCategory] = useState<ICategory>({
    id: 0,
    name: 'все',
  });
  const [selectedSort, setSelectedSort] = useState<SortOption>({
    name: 'рейтингу',
    byProperty: 'rating',
  });
  const [sushi, setSushi] = useState<Sushi[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
      <Options
        categories={categories}
        setCategories={setCategories}
        selectedSort={selectedSort}
        onSelectSort={setSelectedSort}
        activeCategory={activeCategory}
        onClickCategory={setActiveCategory}
      />
      <Catalog
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchValue={searchValue}
        sushi={sushi}
        setSushi={setSushi}
        activeCategory={activeCategory}
        selectedSort={selectedSort}
      />
    </>
  );
};

export default Home;
