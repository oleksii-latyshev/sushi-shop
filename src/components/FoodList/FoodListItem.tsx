import React, { useState } from 'react';

import styles from './FoodList.module.scss';

export interface FoodListItemInstance {
  id: number;
  title: string;
  price: number;
  counts: number[];
}

const food = {
  name: 'Love ua',
  price: 649,
  count: 44,
  weight: 1115,
  img: 'https://mafia.ua/storage/editor/fotos/450x450/love-ua.jpeg',
};

const FoodListItem = ({ id, title, price, counts }: FoodListItemInstance) => {
  const [cartCount, setCartCount] = useState(0);
  const [selectSize, setSelectSize] = useState(counts[0]);

  const choicesElements = counts.map((countFood) => (
    <li key={countFood} className={selectSize === countFood ? styles.active : ''}>
      <button onClick={() => setSelectSize(countFood)}>{countFood} шт</button>
    </li>
  ));

  return (
    <li className={styles.item}>
      <img src={food.img} alt={food.name} />
      <h3>{title}</h3>
      <ul className={styles.choices}>{choicesElements}</ul>
      <div className={styles.footer}>
        <p>{price} грн</p>
        <button onClick={() => setCartCount((prev) => prev + 1)}>
          Добавить <span>{cartCount}</span>
        </button>
      </div>
    </li>
  );
};

export default FoodListItem;
