import React from 'react';

import styles from './FoodList.module.scss';

export interface FoodListItemInstance {
  id: number;
  title: string;
  price: number;
}

const food = {
  name: 'Love ua',
  price: 649,
  count: 44,
  weight: 1115,
  img: 'https://mafia.ua/storage/editor/fotos/450x450/love-ua.jpeg',
};

const FoodListItem = ({ id, title, price }: FoodListItemInstance) => {
  return (
    <li className={styles.item}>
      <img src={food.img} alt={food.name} />
      <h3>{title}</h3>
      <div className={styles.choice}>
        <button>{food.weight}</button>
        <button>{food.weight}</button>
        <button>{food.weight}</button>
      </div>
      <p>{price} грн</p>
    </li>
  );
};

export default FoodListItem;
