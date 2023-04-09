import React from 'react';

import styles from './FoodList.module.scss';
import type { FoodListItemInstance } from './FoodListItem';
import FoodListItem from './FoodListItem';

const food: FoodListItemInstance[] = [
  { id: 1, title: 'test1', price: 1 },
  { id: 2, title: 'test2', price: 2 },
  { id: 2, title: 'test2', price: 2 },
  { id: 2, title: 'test2', price: 2 },
  { id: 2, title: 'test2', price: 2 },
  { id: 2, title: 'test2', price: 2 },
];

const FoodLIst = () => {
  const foodListItemElements = food.map(({ id, title, price }) => (
    <FoodListItem key={id} id={id} title={title} price={price} />
  ));

  return <ul className={styles.list}>{foodListItemElements}</ul>;
};

export default FoodLIst;
