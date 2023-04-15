import React from 'react';

import type { SortOption } from '../../components/Sort/Sort';
import SushiList from '../../components/SushiList/SushiList';
import type { ICategory, Sushi } from '../../types';

interface CatalogProps {
  sushi: Sushi[];
  setSushi: React.Dispatch<React.SetStateAction<Sushi[]>>;
  activeCategory: ICategory;
  selectedSort: SortOption;
}

const Catalog = ({ sushi, setSushi, activeCategory, selectedSort }: CatalogProps) => {
  return (
    <div>
      <SushiList
        sushi={sushi}
        setSushi={setSushi}
        activeCategory={activeCategory}
        selectedSort={selectedSort}
      />
    </div>
  );
};

export default Catalog;
