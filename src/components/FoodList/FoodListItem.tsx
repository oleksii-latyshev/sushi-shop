import React, { useState } from 'react';
import type { Food } from 'src/types/types';

import styles from './FoodList.module.scss';

type FoodListItemProps = Food;

const FoodListItem = ({
  id,
  name,
  img,
  price,
  category,
  counts,
  rating,
  weight,
}: FoodListItemProps) => {
  const [cartCount, setCartCount] = useState(0);
  const [selectSize, setSelectSize] = useState(counts[0]); // TODO проверить на ререндер массив, мб useMemo нужно будет заюзать

  const choicesElements = counts.map((countFood) => (
    <li key={countFood} className={selectSize === countFood ? styles.active : ''}>
      <button onClick={() => setSelectSize(countFood)}>{countFood} шт</button>
    </li>
  ));

  return (
    <li className={styles.item}>
      <img src={img} alt={name} />
      <h3>{name}</h3>
      <ul className={styles.choices}>{choicesElements}</ul>
      <div className={styles.footer}>
        <p>{price} грн</p>
        <button onClick={() => setCartCount((prev) => prev + 1)}>
          Добавить {cartCount > 0 ? <span>{cartCount}</span> : null}
        </button>
      </div>
    </li>
  );
};

export default FoodListItem;
