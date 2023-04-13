import React, { useEffect, useState } from 'react';

// import { FoodService } from '../../services/food.service';
import type { Food } from '../../types';
import { isArrayFoods } from '../../types';
import styles from './FoodList.module.scss';
import FoodListItem from './FoodListItem';
import FoodListItemSkeleton from './FoodListItemSkeleton';

const FoodList = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5173/sushi.json')
      .then((response) => response.json())
      .then((json) => {
        if (isArrayFoods(json)) setFoods(json);
      })
      .catch((error: string) => {
        throw new Error(error);
      })
      .finally(() => setIsLoading(false));
    window.scrollTo(0, 0);
  }, []);

  const foodListItemElements = isLoading
    ? [...new Array(6)].map((_, i) => <FoodListItemSkeleton key={i} />)
    : foods.map((food) => <FoodListItem key={food.id} {...food} />);

  return <ul className={styles.list}>{foodListItemElements}</ul>;
};

export default FoodList;
