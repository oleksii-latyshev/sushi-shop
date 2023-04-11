import React from 'react';

import styles from './FoodList.module.scss';
import type { FoodListItemInstance } from './FoodListItem';
import FoodListItem from './FoodListItem';

const foods: FoodListItemInstance[] = [
  { id: 1, title: 'test1', price: 1, counts: [15, 20, 50] },
  { id: 2, title: 'test2', price: 2, counts: [15, 20] },
  { id: 2, title: 'test2', price: 2, counts: [15, 20] },
  { id: 2, title: 'test2', price: 2, counts: [15, 20, 50] },
  { id: 2, title: 'test2', price: 2, counts: [15, 20, 50] },
  { id: 2, title: 'test2', price: 2, counts: [15, 20, 50] },
];

const FoodList = () => {
  const foodListItemElements = foods.map((food) => <FoodListItem key={food.id} {...food} />);

  return <ul className={styles.list}>{foodListItemElements}</ul>;
};

export default FoodList;
